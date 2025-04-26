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
import CatagoryAdminPage from './pages/admin/catagoryAdminPage.tsx'
import OrderAdminPage from './pages/admin/orderAdminPage.tsx'
import { AppProvider } from './components/context/app.context.tsx'
import VerifyPage from './pages/client/verifyPage.tsx'
import ProtectedRoute from './components/share/protected-route.ts/index.tsx'

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
        element:<ProtectedRoute><UserAdminPage /></ProtectedRoute>  ,
      },
      {
        path: 'product',
        element:    <ProtectedRoute><ProductAdminPage /></ProtectedRoute>,
      },
      {
        path: 'category',
        element:  <ProtectedRoute><CatagoryAdminPage /></ProtectedRoute>
      },
      {
        path: 'order',
        element:  <ProtectedRoute><OrderAdminPage /></ProtectedRoute>
      },
      {
        path: 'darshboard',
        element:  <ProtectedRoute><DashBoardPage /></ProtectedRoute>
      },
    ]
  },


  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/verify",
    element: <VerifyPage />
  }
]);



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>

  </StrictMode>,
)
