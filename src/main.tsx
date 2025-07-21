import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Optimización crítica de renderizado y carga
const root = createRoot(document.getElementById('root')!);

// Optimización de renderizado concurrente
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Optimizaciones críticas de performance y carga ultra-rápida
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration failed silently
    });
  });
}

// Preload crítico de recursos para carga instantánea
const preloadCriticalResources = () => {
  // Preload de fuentes críticas con prioridad alta
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap';
  fontLink.as = 'style';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);

  // Preconnect a dominios críticos para reducir latencia
  const preconnectCalendly = document.createElement('link');
  preconnectCalendly.rel = 'preconnect';
  preconnectCalendly.href = 'https://assets.calendly.com';
  document.head.appendChild(preconnectCalendly);

  // Preconnect al dominio del video
  const preconnectVideo = document.createElement('link');
  preconnectVideo.rel = 'preconnect';
  preconnectVideo.href = 'https://videomp46523.live-website.com';
  document.head.appendChild(preconnectVideo);

  // DNS prefetch para WhatsApp
  const dnsPrefetchWA = document.createElement('link');
  dnsPrefetchWA.rel = 'dns-prefetch';
  dnsPrefetchWA.href = 'https://wa.me';
  document.head.appendChild(dnsPrefetchWA);

  // Preload del video crítico
  const videoLink = document.createElement('link');
  videoLink.rel = 'preload';
  videoLink.href = 'https://videomp46523.live-website.com/wp-content/uploads/2025/07/VIDEO-WEBINAR-PREVIO-A-DEMO-2.mp4';
  videoLink.as = 'video';
  videoLink.type = 'video/mp4';
  document.head.appendChild(videoLink);
};

// Ejecutar optimizaciones inmediatamente
preloadCriticalResources();

// Optimización de scroll con throttling
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

// Optimización de resize con debouncing
let resizeTimer: number;
const handleResize = () => {
  clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => {
    // Lógica de resize optimizada
  }, 250);
};

window.addEventListener('resize', handleResize, { passive: true });

// Optimización de carga de imágenes lazy
const observerOptions = {
  root: null,
  rootMargin: '50px',
  threshold: 0.1
};

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target as HTMLImageElement;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    }
  });
}, observerOptions);

// Observar imágenes lazy cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => imageObserver.observe(img));
});

// Optimización de memoria - limpiar listeners
window.addEventListener('beforeunload', () => {
  window.removeEventListener('scroll', requestScrollUpdate);
  window.removeEventListener('resize', handleResize);
});