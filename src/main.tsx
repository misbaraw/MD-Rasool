// Ensure window.fetch has both getter and setter in iframe environments
try {
  const target: any = typeof window !== 'undefined' ? window : globalThis;
  const current = target.fetch;
  let active = typeof current === 'function' ? current.bind(target) : current;
  const desc = {
    get: () => active,
    set: (next: any) => {
      active = typeof next === 'function' ? next.bind(target) : next;
    },
    configurable: true,
    enumerable: true,
  };
  try {
    Object.defineProperty(target, 'fetch', desc);
  } catch {}
  if (typeof Window !== 'undefined' && Window.prototype) {
    try {
      Object.defineProperty(Window.prototype, 'fetch', desc);
    } catch {}
  }
} catch {}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
