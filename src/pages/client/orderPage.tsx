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
  selectedProductIds: string[];
}) => {
  try {
    const { selectedProductIds, ...rest } = orderData;

    const res:any = await createOrderApi({
      ...rest,
      productIds: selectedProductIds,
    });

    console.log('API response:', res);

    if (!res) {
      toast.error('Đặt hàng thất bại!');
      return;
    }

    /* 🔑 1. Nếu backend trả paymentUrl (thanh toán VNPay) → redirect */
    if (res.paymentUrl) {
      window.location.href = res.paymentUrl;     // sang trang VNPay
      return;                                    // dừng tại đây
    }

    /* 🔑 2. Không có paymentUrl → đơn COD / transfer nội bộ */
    toast.success('Đặt hàng thành công!');
    navigate('/my-orders');
  } catch (err) {
    console.error('Lỗi khi tạo đơn hàng:', err);
    toast.error('Có lỗi xảy ra khi đặt hàng!');
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
