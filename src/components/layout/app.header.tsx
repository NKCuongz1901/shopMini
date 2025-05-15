import logo from "@/assets/img/logo.png"
import profileIcon from "@/assets/img/profile_icon.png"
import cartIcon from "@/assets/img/cart_icon.png"
import { useNavigate } from "react-router-dom";

import { Link, NavLink } from "react-router"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useCurrentApp } from "../context/app.context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Badge } from "antd"
import { useEffect, useState } from "react"
import { getCartApi } from "@/services/api"


function AppHeader() {
    const { user, isAuthenticated, setUser, setIsAuthenticate } = useCurrentApp();
    const [cart, setCart] = useState<ICart | null>(null);
    const [cartCount, setCartCount] = useState<number>(0);
    console.log("check cart", cart);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUser(null);
        setIsAuthenticate(false);
    }
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res:any = await getCartApi(user?.id);
                if(res){
                    setCart(res);
                    setCartCount(res.items.length);
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        }
        fetchCart();
    },[])


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
            <div className="p-2">
                <Badge className="" size="default" count={cartCount}>
                    <img src={cartIcon} alt="" className="w-8 cursor-pointer" onClick={() => navigate("/order")} />
                </Badge>
            </div>
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
                                        <Link to={"/admin"}>

                                            Admin page
                                        </Link>
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