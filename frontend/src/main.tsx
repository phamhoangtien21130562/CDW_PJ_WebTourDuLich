import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Router from "./router/adminRouter.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
     <Router />
  </StrictMode>,
)
