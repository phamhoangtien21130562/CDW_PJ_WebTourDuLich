import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import AdminRouter from "./router/AdminRouter.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
     {/*<AdminRouter />*/}
  </StrictMode>,
)
