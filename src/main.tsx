import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

const heroShell = document.getElementById('hero-shell')
if (heroShell) {
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      window.setTimeout(() => {
        heroShell.classList.add('hidden')
        window.setTimeout(() => heroShell.remove(), 500)
      }, 220)
    })
  )
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}
