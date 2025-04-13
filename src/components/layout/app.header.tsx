import logo from "@/assets/img/logo.png"
// import profileIcon from "@/assets/img/profile_icon.png"
// import cartIcon from "@/assets/img/cart_icon.png"

import { Link, NavLink } from "react-router"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useCurrentApp } from "../context/app.context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Avatar, AvatarImage } from "../ui/avatar"

function AppHeader() {
    const { user, isAuthenticated, setUser, setIsAuthenticate } = useCurrentApp();


    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUser(null);
        setIsAuthenticate(false);
    }



    return (
        <div className="flex items-center justify-between py-5 font-medium px-10">
            <a href="/">
                <img src={logo} alt="logo img" className="w-36" />
            </a>
            <ul className="hidden sm:flex gap-5  text-sm text-gray-700">
                <NavLink to={"/"} className="flex flex-col items-center gap-1 text-[18px] hover:opacity-80">
                    <p>Home</p>

                </NavLink>
                <NavLink to={"/product"} className="flex flex-col items-center gap-1 text-[18px] hover:opacity-80">
                    <p>All Product</p>
                </NavLink>
                <NavLink to={"/"} className="flex flex-col items-center gap-1 text-[18px] hover:opacity-80">
                    <p>About</p>
                </NavLink>
                <NavLink to={"/"} className="flex flex-col items-center gap-1 text-[18px] hover:opacity-80">
                    <p>Contact</p>
                </NavLink>
            </ul>
            <div className="flex items-center gap-6">
                <Input type="text" placeholder="Do you looking for what" className="border border-amber-100 rounded-2xl" />

                {/* <Link to="/cart" className="relative">
                    <img src={cartIcon} alt="" className="w-5 cursor-pointer" />
                </Link>
                <div className="group relative">
                    <img src={profileIcon} alt="" className="w-5 cursor-pointer" />
                    <div className="group-hover:block hidden  absolute dropdown-menu right-0 pt-4">
                        <div className="flex flex-col  gap-2  w-36  py-3  bg-slate-300 text-gray-500 rounded items-center">
                            <p className="cursor-pointer hover:text-black">My profile</p>
                            <p className="cursor-pointer hover:text-black">Order</p>
                            <p className="cursor-pointer hover:text-black">Log out</p>
                        </div>
                    </div>
                </div> */}
                {!isAuthenticated ?
                    <Button className="bg-blue-500 hover:border-amber-300  ">
                        <Link to={"login"}>Login</Link>
                    </Button>
                    :
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild className="">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                {/* <AvatarFallback>{user?.name}</AvatarFallback> */}
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-white ">
                            <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                {user?.role === "ADMIN" && (
                                    <DropdownMenuItem>
                                        Admin page
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="cursor-pointer hover:opacity-90">
                                    Profile

                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Cart

                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout}>
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuGroup>


                        </DropdownMenuContent>
                    </DropdownMenu>
                }

            </div>
        </div>
    )
}

export default AppHeader