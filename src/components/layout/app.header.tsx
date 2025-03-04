import logo from "@/assets/img/logo.png"
import searchIcon from "@/assets/img/search_icon.png"
import profileIcon from "@/assets/img/profile_icon.png"
import cartIcon from "@/assets/img/cart_icon.png"

import { Link, NavLink } from "react-router"

function AppHeader() {
    return (
        <div className="flex items-center justify-between py-5 font-medium px-10">
            <img src={logo} alt="logo img" className="w-36" />
            <ul className="hidden sm:flex gap-5  text-sm text-gray-700">
                <NavLink to={"/"} className="flex flex-col items-center gap-1">
                    <p>Home</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
                </NavLink>
                <NavLink to={"/"} className="flex flex-col items-center gap-1">
                    <p>Collection</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
                </NavLink>
                <NavLink to={"/"} className="flex flex-col items-center gap-1">
                    <p>About</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
                </NavLink>
                <NavLink to={"/"} className="flex flex-col items-center gap-1">
                    <p>Contact</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
                </NavLink>
            </ul>
            <div className="flex items-center gap-6">
                <img src={searchIcon} alt="" className="w-5 cursor-pointer " />
                <div className="group relative">
                    <img src={profileIcon} alt="" className="w-5 cursor-pointer" />
                    <div className="group-hover:block hidden  absolute dropdown-menu right-0 pt-4">
                        <div className="flex flex-col  gap-2  w-36  py-3  bg-slate-300 text-gray-500 rounded items-center">
                            <p className="cursor-pointer hover:text-black">My profile</p>
                            <p className="cursor-pointer hover:text-black">Order</p>
                            <p className="cursor-pointer hover:text-black">Log out</p>
                        </div>
                    </div>
                </div>
                <Link to="/cart" className="relative">
                    <img src={cartIcon} alt="" className="w-5 cursor-pointer" />
                </Link>
            </div>
        </div>
    )
}

export default AppHeader