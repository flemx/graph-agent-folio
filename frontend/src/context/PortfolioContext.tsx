import React, { createContext, useContext } from 'react';
import { usePortfolioStream, SectionKey, PortfolioState } from '@/hooks/usePortfolioStream';

interface PortfolioContextValue {
  state: PortfolioState;
  loadingSection?: SectionKey;
  streaming: boolean;
  finished: boolean;
  startStreaming: (linkedinId: string) => Promise<void>;
  abort: () => void;
}

const PortfolioContext = createContext<PortfolioContextValue | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const stream = usePortfolioStream();
  return <PortfolioContext.Provider value={stream}>{children}</PortfolioContext.Provider>;
};

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
};
