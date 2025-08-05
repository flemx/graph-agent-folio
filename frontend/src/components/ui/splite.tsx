'use client'

/* eslint-disable @typescript-eslint/no-namespace */

import { useEffect } from 'react'

// Declare the custom element type for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          url: string
          'events-target'?: string
        },
        HTMLElement
      >
    }
  }
}

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  useEffect(() => {
    // Add the Spline viewer script if it hasn't been added yet
    if (!document.querySelector('script[src*="splinetool/viewer"]')) {
      const script = document.createElement('script')
      script.type = 'module'
      script.src = 'https://unpkg.com/@splinetool/viewer/build/spline-viewer.js'
      document.head.appendChild(script)
    }

    // Remove Spline watermark
    const interval = setInterval(() => {
      const viewer = document.querySelector('spline-viewer')
      if (viewer && viewer.shadowRoot) {
        const logo = viewer.shadowRoot.querySelector('#logo')
        if (logo) {
          logo.remove()
          clearInterval(interval)
        }
      }
    }, 500)

    // Cleanup interval on component unmount
    return () => clearInterval(interval)
  }, [])

  return (
    <spline-viewer
      url={scene}
      events-target="global"
      className={className}
    />
  )
} 