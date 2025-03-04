import { Outlet } from "react-router";
import AppFooter from "./components/layout/app.footer";
import AppHeader from "./components/layout/app.header";

const Layout = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </>
  )
}

export default Layout;