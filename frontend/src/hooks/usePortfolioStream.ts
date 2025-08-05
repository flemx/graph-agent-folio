import { useCallback, useRef, useState, useEffect } from 'react';

/**
 * Shape of the final payload returned by the backend (values event).
 */
export interface PortfolioState {
  linkedin_id?: string;
  about_data?: unknown;
  projects_data?: unknown;
  experience_data?: unknown;
  linkedin_status?: 'found' | 'not_found';
}

export type SectionKey = 'about' | 'projects' | 'experience';

interface UsePortfolioStreamReturn {
  /* Live partial / final data */
  state: PortfolioState;
  /* Currently processing section, undefined when idle or finished */
  loadingSection?: SectionKey;
  /* True while streaming in progress */
  streaming: boolean;
  /* True after `values` event arrived */
  finished: boolean;
  /* Kick-off SSE */
  startStreaming: (linkedinId: string) => Promise<void>;
  /* Abort current stream */
  abort: () => void;
}

/**
 * Lightweight SSE line parser (supports default event name & custom events).
 */
function createSSEParser(onEvent: (ev: { event?: string; data: string }) => void) {
  let buffer = '';
  return (chunk: string) => {
    buffer += chunk;
    const parts = buffer.split(/\n\n+/);
    // Keep last partial (if any) in buffer
    buffer = parts.pop() || '';
    for (const part of parts) {
      const lines = part.split(/\n/);
      let event: string | undefined;
      let data = '';
      for (const line of lines) {
        if (line.startsWith('event:')) {
          event = line.replace(/^event:\s*/, '').trim();
        } else if (line.startsWith('data:')) {
          data += line.replace(/^data:\s*/, '').trim();
        }
      }
      if (data) onEvent({ event, data });
    }
  };
}

export function usePortfolioStream(): UsePortfolioStreamReturn {
  const STORAGE_KEY = 'portfolioState';
  const [state, setState] = useState<PortfolioState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as PortfolioState) : {};
    } catch {
      return {};
    }
  });
  const [loadingSection, setLoadingSection] = useState<SectionKey | undefined>();
  const [streaming, setStreaming] = useState(false);
  const [finished, setFinished] = useState(() => !!localStorage.getItem(STORAGE_KEY));
  const abortRef = useRef<AbortController | null>(null);

  const abort = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStreaming(false);
    setLoadingSection(undefined);
  }, []);

  const startStreaming = useCallback(async (linkedinId: string) => {
    // Abort any existing stream first
    abort();

    // Clear previous cached state
    localStorage.removeItem(STORAGE_KEY);

    const controller = new AbortController();
    abortRef.current = controller;
    setStreaming(true);
    setFinished(false);
    setState({ linkedin_id: linkedinId });

    const resp = await fetch('/api/portfolio/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
      },
      body: JSON.stringify({ linkedin_id: linkedinId }),
      signal: controller.signal,
    });

    if (!resp.ok || !resp.body) {
      console.error('Streaming API error', resp.statusText);
      setStreaming(false);
      return;
    }

    const reader = resp.body.getReader();
    const utf8Decoder = new TextDecoder('utf-8');
    const parse = createSSEParser(({ event, data }) => { /* handle one SSE message */
      try {
        const parsed = JSON.parse(data);
        // If backend embeds its own "event" field inside the JSON (as per examples)
        const evtType = event || parsed.event || parsed.chunk_type;
        switch (evtType) {
          case 'node_update': {
            const { current_node, data: nodeData } = parsed;
            if (nodeData?.status === 'started') {
              // current_node like "about_node" → strip suffix
              const section = current_node.replace(/_node$/, '') as SectionKey;
              setLoadingSection(section);
            }
            if (nodeData?.status === 'completed') {
              setLoadingSection(undefined);
            }
            break;
          }
          case 'custom': {
            const inner = parsed.data ?? parsed;
            if (inner.chunk_type === 'node_update') {
              const { current_node, data: nodeData } = inner;
              if (nodeData?.status === 'started') {
                const section = current_node.replace(/_node$/, '') as SectionKey;
                setLoadingSection(section);
              }
              if (nodeData?.status === 'completed') {
                setLoadingSection(undefined);
              }
              break;
            }
            // structured chunk
            const { current_node } = inner;
            const sectionData = inner.data ?? inner;
            if (current_node && sectionData) {
              const section = current_node.replace(/_node$/, '') as SectionKey;
              setState((prev) => ({ ...prev, [`${section}_data`]: sectionData } as PortfolioState));
            }
            break;
          }
          case 'values': {
            setState(parsed.data ?? parsed);
            // Do NOT mark finished here; the backend may emit intermediate values.
            break;
          }
          default:
            break;
        }
      } catch (err) {
        console.error('SSE parse error', err);
      }
    });

    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      parse(utf8Decoder.decode(value, { stream: true }));
    }
    setStreaming(false);
    setFinished(true);
    setLoadingSection(undefined);
  }, [abort]);

  // Persist final state to localStorage when streaming finishes
  useEffect(() => {
    if (finished) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // ignoring quota or serialization errors
      }
    }
  }, [finished, state]);

  return {
    state,
    loadingSection,
    streaming,
    finished,
    startStreaming,
    abort,
  };
}
