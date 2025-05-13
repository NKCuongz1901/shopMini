import { useState } from "react";
import { IProduct } from "@/types/global";
import { Button } from "@/components/ui/button";
import { useCurrentApp } from "./context/app.context";
import { toast } from "sonner";
import { addToCartApi } from "@/services/api";
import { Toaster } from "./ui/sonner";

interface IProps {
    currentProductData: IProduct | null;
}

function ProductDetailCard(props: IProps) {
    const {user, isAuthenticated} = useCurrentApp();
    const { currentProductData } = props;
    const [quantity, setQuantity] = useState(1);
    
    console.log("check user", user);
    if (!currentProductData) return null;

    const handleDecrease = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };
    const handleIncrease = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleAddToCart = async () => {
        if (!isAuthenticated || !user) {
            toast.warning("Bạn cần đăng nhập để thêm vào giỏ hàng!");
            return;
        }
        try {
            const res = await addToCartApi({
                userId: user.id,
                productId: currentProductData._id,
                quantity,
            });
            if (res) {
                toast.success("Thêm vào giỏ hàng thành công!");
            } else {
                toast.error("Có lỗi xảy ra, vui lòng thử lại!");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };
    
    return (
        <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-lg shadow p-4 w-full max-w-5xl mx-auto">
            {/* Image */}
            <div className="flex-1 flex justify-center items-start">
                <img
                    src={currentProductData.image || "/placeholder.svg"}
                    alt={currentProductData.productName}
                    className="rounded-lg w-full max-w-md object-cover"
                />
            </div>
            {/* Info */}
            <div className="flex-1 flex flex-col gap-4">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{currentProductData.productName}</h1>
                <div className="text-gray-500 text-sm mb-2">Delivery from 3 weeks</div>
                <div>
                    <h2 className="font-semibold text-base mb-1">DESCRIPTION</h2>
                    <p className="text-gray-700 text-sm md:text-base whitespace-pre-line">
                        {currentProductData.description || "No description."}
                    </p>
                </div>
                <div className="border-t pt-4 mt-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <span className="text-gray-500 text-sm sm:w-32">Price</span>
                        <span className="text-lg font-semibold ">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentProductData.price * quantity)}
                        </span>
                    </div>
                </div>
                {/* Quantity & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
                    <div className="flex items-center border rounded px-2 py-1 w-max">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            onClick={handleDecrease}
                            disabled={quantity <= 1}
                        >-</Button>
                        <span className="px-3 min-w-[32px] text-center">{quantity}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            onClick={handleIncrease}
                        >+</Button>
                    </div>
                    <div className="flex gap-2 w-full">
                        <Button className="flex-1" variant="outline" onClick={() => {handleAddToCart()}}>Add to cart</Button>
                        <Button className="flex-1" variant="outline">Buy Now</Button>
                    </div>
                </div>
            </div>
            <Toaster position="top-center" richColors />
        </div>
    );
}

export default ProductDetailCard;