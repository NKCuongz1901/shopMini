import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './App.tsx'
import Homepage from './pages/client/homepage.tsx'
import LoginPage from './pages/client/loginPage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, element: <Homepage />
      }
    ]
  },



  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <div>Register page</div>
  }
]);



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />

  </StrictMode>,
)
