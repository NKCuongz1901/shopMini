import { useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { fetchProductByQuery, getCategoriesApi } from "@/services/api"
import { ICategory, IProduct } from "@/types/global"

export default function ProductCollection() {
    const [sortOrder, setSortOrder] = useState("default")
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [minPrice, setMinPrice] = useState<string>("")
    const [maxPrice, setMaxPrice] = useState<string>("")
    const [productData, setProductData] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState<ICategory[]>([]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await getCategoriesApi();
                if (res) {
                    setCategoryData(res);
                }
            } catch (error) {
                console.log("Cant fetch category data");
            }
        };
        fetchCategory();
    }, []);
    
    console.log("check category",categoryData);
    useEffect(() => {
        fetchProducts();
    }, [selectedCategories, minPrice, maxPrice, sortOrder]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            let queryParams = new URLSearchParams();
            
            // Add category filter if any categories are selected
            if (selectedCategories.length > 0) {
                queryParams.append('category', selectedCategories.join(','));
            }
            
            // Add price range filter
            if (minPrice) {
                queryParams.append('minPrice', minPrice);
            }
            if (maxPrice) {
                queryParams.append('maxPrice', maxPrice);
            }
            
            const query = queryParams.toString();
            const res = await fetchProductByQuery(query);
            
            if (res) {
                let sortedProducts = Array.isArray(res) ? res : [res];
                
                // Sort products based on selected sort order
                if (sortOrder === "price-low-high") {
                    sortedProducts.sort((a: IProduct, b: IProduct) => a.price - b.price);
                } else if (sortOrder === "price-high-low") {
                    sortedProducts.sort((a: IProduct, b: IProduct) => b.price - a.price);
                }
                
                setProductData(sortedProducts);
            }
          
        } catch (error) {
            console.log("Fetching product data error");
        } finally {
            setLoading(false);
        }
    };
    console.log("check product", productData);
    // Handle category selection
    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId) ? prev.filter((c) => c !== categoryId) : [...prev, categoryId],
        )
    }

    // Handle price input changes
    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setMinPrice(value);
    }

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setMaxPrice(value);
    }

    return (
        <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
            {/* Sidebar Filter */}
            <aside className="w-full md:w-1/4 lg:w-1/5 p-4 border-r bg-white">
                <h2 className="text-lg font-semibold mb-4">Filter</h2>
                {/* Category */}
                <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2">Category</h3>
                    <div className="space-y-2">
                        {categoryData.map((category) => (
                            <div key={category._id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`category-${category._id}`}
                                    checked={selectedCategories.includes(category._id)}
                                    onCheckedChange={() => handleCategoryChange(category._id)}
                                />
                                <Label htmlFor={`category-${category._id}`}>{category.name}</Label>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Price */}
                <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2">Price</h3>
                    <div className="flex space-x-2">
                        <Input
                            type="text"
                            placeholder="Min"
                            value={minPrice}
                            onChange={handleMinPriceChange}
                            className="w-1/2"
                        />
                        <Input
                            type="text"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={handleMaxPriceChange}
                            className="w-1/2"
                        />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                    <h1 className="text-2xl font-bold mb-2 sm:mb-0">ALL COLLECTION</h1>
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Sort by:</span>
                        <select
                            className="border rounded px-2 py-1"
                            value={sortOrder}
                            onChange={e => setSortOrder(e.target.value)}
                        >
                            <option value="price-low-high">Price: Low to High</option>
                            <option value="price-high-low">Price: High to Low</option>
                        </select>
                    </div>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {productData.map((product, index) => (
                            <div key={index} className="bg-white rounded-lg shadow p-3 hover:shadow-lg transition cursor-pointer">
                                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-2">
                                    <img
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.productName}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="text-xs text-gray-500 mb-1">{product.brand || product.categoryName}</div>
                                <h3 className="text-sm font-medium">{product.productName}</h3>
                                <p className="mt-1 text-sm font-bold text-blue-600">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
