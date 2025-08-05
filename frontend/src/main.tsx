import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './hooks/useTheme';
import { PortfolioProvider } from './context/PortfolioContext';
import './index.css'

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <PortfolioProvider>
      <App />
    </PortfolioProvider>
  </ThemeProvider>
);
