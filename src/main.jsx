import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {})
    })
  } else {
    navigator.serviceWorker.getRegistrations().then((registrations) => registrations.forEach((registration) => registration.unregister()))
    if ('caches' in window) caches.keys().then((keys) => keys.filter((key) => key.startsWith('slovolet-')).forEach((key) => caches.delete(key)))
  }
}
