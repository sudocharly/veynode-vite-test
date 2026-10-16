import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import '@fontsource-variable/fraunces/wght.css'
import '@fontsource-variable/fraunces/wght-italic.css'
import '@fontsource-variable/outfit/index.css'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element #root is missing from index.html.')
}

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter basename={basename === '' ? undefined : basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
