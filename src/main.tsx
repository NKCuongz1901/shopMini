import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './App.tsx'
import Homepage from './pages/client/homepage.tsx'
import LoginPage from './pages/client/loginPage.tsx'
import ProductPage from './pages/client/productPage.tsx'
import RegisterPage from './pages/client/registerPage.tsx'
import LayoutAdmin from './components/layout/layout.admin.tsx'
import DashBoardPage from './pages/admin/dashBoardPage.tsx'
import UserAdminPage from './pages/admin/userAdminPage.tsx'
import ProductAdminPage from './pages/admin/productAdminPage.tsx'
import OrderAdminPage from './pages/admin/orderAdminPage.tsx'
import { AppProvider } from './components/context/app.context.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, element: <Homepage />
      },
      {
        path: "/product",
        element: <ProductPage />
      }
    ]
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      {
        index: true, element: <DashBoardPage />
      },
      {
        path: 'user',
        element: <UserAdminPage />,
      },
      {
        path: 'product',
        element: <ProductAdminPage />
      },
      {
        path: 'order',
        element: <OrderAdminPage />
      }
    ]
  },


  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  }
]);



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>

  </StrictMode>,
)
