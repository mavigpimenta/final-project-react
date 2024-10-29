import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/MainRoutes'
import './index.css'
import { ToastContainer } from 'react-toastify'
import { LanguageProvider } from './context/LanguageContext'
import 'react-toastify/dist/ReactToastify.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <RouterProvider router={routes} />
      <ToastContainer />
    </LanguageProvider>
  </StrictMode>,
)