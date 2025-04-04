import type React from "react"
import { useState, useEffect } from "react"
import {
    ChevronDown,
    ChevronRight,
    Home,
    Users,
    ShoppingCart,
    BarChart2,
    Settings,
    HelpCircle,
    Menu,
    X,
} from "lucide-react"
import { Outlet, useNavigate } from "react-router"

// Define types for menu items
type SubMenuItem = {
    id: string
    title: string
    path: string
}

type MenuItem = {
    id: string
    title: string
    icon: React.ElementType
    path?: string
    submenu?: SubMenuItem[]
}

// Sample menu data
const menuItems: MenuItem[] = [
    {
        id: "dashboard",
        title: "Dashboard",
        icon: Home,
        path: "/",
    },
    {
        id: "users",
        title: "User Management",
        icon: Users,
        path: "user"
    },
    {
        id: "products",
        title: "Products",
        icon: ShoppingCart,
        path: "product"
    },
    {
        id: "order",
        title: "Order",
        icon: BarChart2,
        path: "order",
    },
    {
        id: "settings",
        title: "Settings",
        icon: Settings,
        path: "/settings",
    },
    {
        id: "help",
        title: "Help & Support",
        icon: HelpCircle,
        path: "/help",
    },
]

export default function Sidebar() {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({})
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeItem, setActiveItem] = useState<string | null>(null)
    const navigate = useNavigate();

    // Toggle submenu expansion
    const toggleSubmenu = (id: string) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    // Handle item click
    const handleItemClick = (id: string, path?: string) => {
        setActiveItem(id)
        // Close mobile menu when an item is clicked
        setIsMobileMenuOpen(false)
        // You can add navigation logic here if needed
        console.log(`Navigating to: ${path}`);
        if (path) {
            navigate(path);
        }

    }

    // Close mobile menu on window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false)
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <>
            {/* Mobile menu toggle button */}
            <button
                className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
            >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 z-40 h-screen bg-gray-900 text-white transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:translate-x-0"}
          lg:w-64
        `}
            >
                {/* Logo */}
                <div className="flex items-center justify-center h-16 border-b border-gray-700">
                    <h1 className="text-xl font-bold">Admin Panel</h1>
                </div>

                {/* Menu items */}
                <nav className="mt-4 px-2">
                    <ul className="space-y-1 ">
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                {/* Menu item without submenu */}
                                {!item.submenu ? (
                                    <button
                                        onClick={() => handleItemClick(item.id, item.path)}
                                        className={`
                      flex items-center w-full px-4 py-2 rounded-md text-left
                      hover:bg-gray-800 transition-colors
                      ${activeItem === item.id ? "bg-gray-800 font-medium" : ""}
                    `}
                                    >
                                        <item.icon className="w-5 h-5 mr-3" />
                                        <span>{item.title}</span>
                                    </button>
                                ) : (
                                    // Menu item with submenu
                                    <div>
                                        <button
                                            onClick={() => toggleSubmenu(item.id)}
                                            className={`
                        flex items-center justify-between w-full px-4 py-2 rounded-md text-left
                        hover:bg-gray-800 transition-colors
                      `}
                                        >
                                            <div className="flex items-center">
                                                <item.icon className="w-5 h-5 mr-3" />
                                                <span>{item.title}</span>
                                            </div>
                                            {expanded[item.id] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                        </button>

                                        {/* Submenu */}
                                        {expanded[item.id] && (
                                            <ul className="mt-1 ml-6 space-y-1 border-l border-gray-700 pl-2">
                                                {item.submenu.map((subItem) => (
                                                    <li key={subItem.id}>
                                                        <button
                                                            onClick={() => handleItemClick(subItem.id, subItem.path)}
                                                            className={`
                                flex items-center w-full px-4 py-2 rounded-md text-left text-sm
                                hover:bg-gray-800 transition-colors
                                ${activeItem === subItem.id ? "bg-gray-800 font-medium" : ""}
                              `}
                                                        >
                                                            <span>{subItem.title}</span>
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* User profile section */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                            <span className="text-sm font-medium">JD</span>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium">John Doe</p>
                            <p className="text-xs text-gray-400">Administrator</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main content area - this is just a placeholder */}
            <main className="lg:ml-64 p-4 transition-all duration-300">{/* Your content will go here */}
                <Outlet />
            </main>
        </>
    )
}

