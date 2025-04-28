
import { useEffect, useState } from "react"
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { getCategoriesApi, getProductsApi } from "@/services/api"
import { ICategory, IProduct } from "@/types/global"

// Sample product data
const products = [
    {
        id: 1,
        name: "Knitted Cropped Top",
        price: 40,
        image: "/placeholder.svg?height=300&width=300",
        category: "Top Wear",
    },
    {
        id: 2,
        name: "Boho Floral Blouse",
        price: 50,
        image: "/placeholder.svg?height=300&width=300",
        category: "Top Wear",
    },
    {
        id: 3,
        name: "Casual T-Shirt",
        price: 25,
        image: "/placeholder.svg?height=300&width=300",
        category: "Top Wear",
    },
    {
        id: 4,
        name: "Off-Shoulder Top",
        price: 45,
        image: "/placeholder.svg?height=300&width=300",
        category: "Top Wear",
    },
    {
        id: 5,
        name: "Slim Fit Jeans",
        price: 60,
        image: "/placeholder.svg?height=300&width=300",
        category: "Bottom Wear",
    },
    {
        id: 6,
        name: "Pleated Skirt",
        price: 35,
        image: "/placeholder.svg?height=300&width=300",
        category: "Bottom Wear",
    },
    {
        id: 7,
        name: "Cargo Pants",
        price: 55,
        image: "/placeholder.svg?height=300&width=300",
        category: "Bottom Wear",
    },
    {
        id: 8,
        name: "Denim Shorts",
        price: 30,
        image: "/placeholder.svg?height=300&width=300",
        category: "Bottom Wear",
    },
]





export default function ProductCollection() {
    const [sortOrder, setSortOrder] = useState("default")
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [priceRange, setPriceRange] = useState([0, 100])
    const [categoryData, setCategoryData] = useState<ICategory[]>([]);
    const [productData, setProductData] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await getCategoriesApi();
                const categories = res.map((category: { name: string }) => category.name);
                setCategoryData(categories);
            } catch (error) {
                console.log("Cant fetch category data");
            }
        };
        fetchCategory();
    }, []);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const res = await getProductsApi();
                if (res) {
                    setProductData(res);
                }
            } catch (error) {
                console.log("Fetching product data error");
            }
        }
        fetchProductData();
    }, [])

    // Handle category selection
    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
        )
    }

    // Filter products based on selected filters
    const filteredProducts = products.filter((product) => {
        // Filter by category if any selected
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
            return false
        }

        // Filter by price range
        if (product.price < priceRange[0] || product.price > priceRange[1]) {
            return false
        }

        return true
    })

    // Sort products based on selected sort order
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOrder === "price-low-high") {
            return a.price - b.price
        } else if (sortOrder === "price-high-low") {
            return b.price - a.price
        }
        return 0
    })

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-8">ALL COLLECTION</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Left side - Sort options */}
                <div className="md:w-1/6">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">Sort By</h2>
                        <div className="flex flex-col gap-2">
                            <Button
                                variant={sortOrder === "price-low-high" ? "default" : "outline"}
                                className="justify-start"
                                onClick={() => setSortOrder("price-low-high")}
                            >
                                <ArrowUpAZ className="mr-2 h-4 w-4" />
                                Price: Low to High
                            </Button>
                            <Button
                                variant={sortOrder === "price-high-low" ? "default" : "outline"}
                                className="justify-start"
                                onClick={() => setSortOrder("price-high-low")}
                            >
                                <ArrowDownAZ className="mr-2 h-4 w-4" />
                                Price: High to Low
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Middle - Products grid */}
                <div className="md:flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {productData.map((product, index) => (
                            <div key={index} className="group cursor-pointer">
                                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-2">
                                    <img
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.productName}
                                        width={300}
                                        height={300}
                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                    />
                                </div>
                                <h3 className="text-sm font-medium">{product.productName}</h3>
                                <p className="mt-1 text-sm font-medium">${product.price}</p>
                            </div>
                        ))}
                    </div>


                </div>

                {/* Right side - Filters */}
                <div className="md:w-1/4 lg:w-1/5 p-5 ">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Filter</h2>

                            <div className="mb-6">
                                <h3 className="text-sm font-medium mb-2">Category</h3>
                                <div className="space-y-2">
                                    {categoryData.map((category, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`category-${category}`}
                                                checked={selectedCategories.includes(category)}
                                                onCheckedChange={() => handleCategoryChange(category)}
                                            />
                                            <Label htmlFor={`category-${category}`}>{category}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6 ">
                                <h3 className="text-sm font-medium mb-2">Price Range</h3>
                                <div className="px-2">
                                    <Slider
                                        defaultValue={[0, 100]}
                                        max={100}
                                        step={5}
                                        value={priceRange}
                                        onValueChange={setPriceRange}
                                        className="mb-2"
                                    />
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>${priceRange[0]}</span>
                                        <span>${priceRange[1]}</span>
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-4" />


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
