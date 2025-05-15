import React from 'react';
import OrderForm from '../../../src/components/orderForm';
import { useCurrentApp } from "../../components/context/app.context";
import { createOrderApi } from "@/services/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
    const { user } = useCurrentApp();
    const navigate = useNavigate();

    const handleOrderSubmit = async (orderData: {
    userId: string;
    shippingAddress: string;
    phone: string;
    paymentMethod: string;
    selectedProductIds: string[]; // Đây là từ OrderForm
}) => {
    try {
        // ⚠️ Đổi tên selectedProductIds thành productIds để đúng với ICreateOrderPayload
        const { selectedProductIds, ...rest } = orderData;
        const res = await createOrderApi({
            ...rest,
            productIds: selectedProductIds, // ✅ Đúng tên kiểu yêu cầu
        });

        if (res) {
            toast.success("Đặt hàng thành công!");
            navigate("/my-orders");
        } else {
            toast.error("Đặt hàng thất bại!");
        }
    } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error);
        toast.error("Có lỗi xảy ra khi đặt hàng!");
    }
};


    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Place Your Order</h1>
            <OrderForm userId={user.id} onSubmit={handleOrderSubmit} />
        </div>
    );
};

export default OrderPage;
