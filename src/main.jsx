import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async';

// Disable aggressive native scroll restoration to fix iOS jump-to-bottom issues
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const rootElement = document.getElementById('root');
const app = (
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
