import { useState } from "react";
import { toast } from "sonner";
import CartInfo from "./cartInfo";

interface IOrderFormProps {
    userId: string;
    onSubmit: (orderData: {
        userId: string;
        shippingAddress: string;
        phone: string;
        paymentMethod: string;
        selectedProductIds: string[];
    }) => void;
}

const OrderForm: React.FC<IOrderFormProps> = ({ userId, onSubmit }) => {
    const [shippingAddress, setShippingAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedProductIds.length === 0) {
            toast.error("Vui lòng chọn ít nhất một sản phẩm để đặt hàng.");
            return;
        }
        onSubmit({
            userId,
            shippingAddress,
            phone,
            paymentMethod,
            selectedProductIds,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg">

            <CartInfo
                userId={userId}
                onSelectedChange={(selectedIds) => setSelectedProductIds(selectedIds)}
            />

            <div>
                <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
                <input
                    type="text"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    pattern="^0\d{9}$" // Bắt đầu bằng 0, tổng 10 số
                    maxLength={10}
                    minLength={10}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder="Nhập số điện thoại (10 số)"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                    <option value="COD">Cash on Delivery (COD)</option>
                    <option value="BANK_TRANSFER">VNPAY</option>
                </select>
            </div>

            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 rounded">
                Place Order
            </button>
        </form>
    );
};

export default OrderForm;
