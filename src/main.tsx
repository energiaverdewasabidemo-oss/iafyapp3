import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Optimización crítica de renderizado
const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Optimizaciones críticas de performance
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration failed
    });
  });
}

// Preload crítico de recursos
const preloadCriticalResources = () => {
  // Preload de fuentes críticas
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap';
  fontLink.as = 'style';
  document.head.appendChild(fontLink);

  // Preconnect a dominios críticos
  const preconnectCalendly = document.createElement('link');
  preconnectCalendly.rel = 'preconnect';
  preconnectCalendly.href = 'https://assets.calendly.com';
  document.head.appendChild(preconnectCalendly);
};

// Ejecutar optimizaciones
preloadCriticalResources();

// Optimización de scroll
let ticking = false;
const updateScrollPosition = () => {
  ticking = false;
};

const requestScrollUpdate = () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollPosition);
    ticking = true;
  }
};

window.addEventListener('scroll', requestScrollUpdate, { passive: true });

// Optimización de resize
let resizeTimer: number;
const handleResize = () => {
  clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => {
    // Resize logic here if needed
  }, 250);
};

window.addEventListener('resize', handleResize, { passive: true });