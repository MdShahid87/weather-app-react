import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { getStoredTheme, applyTheme } from './utils/weatherUtils';

// Apply stored theme before first render to prevent flash
applyTheme(getStoredTheme());

createRoot(document.getElementById('root')).render(
  <App />
);
