import React, { useEffect, useState } from "react";
import { getOrdersApiByIdUser } from "@/services/api";
import { useCurrentApp } from "../../components/context/app.context";

const MyOrdersPage = () => {
    const { user } = useCurrentApp();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user?.id) return;
        setLoading(true);
        const fetchOrders = async () => {
            try {
                const res: any = await getOrdersApiByIdUser(user.id);
                console.log("API response (orders):", res);
                if (res) {
                    setOrders(Array.isArray(res) ? res : [res]);
                } else {
                    setOrders([]);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Đơn hàng của tôi</h1>
            {loading ? (
                <div>Đang tải...</div>
            ) : orders.length === 0 ? (
                <div>Bạn chưa có đơn hàng nào.</div>
            ) : (
                orders.map((order) => (
                    <div key={order._id} className="border rounded mb-6 p-4 shadow-sm bg-white">
                        <div className="mb-2">
                            <strong>Mã đơn:</strong> {order._id}
                        </div>
                        <div className="mb-2">
                            <strong>Ngày đặt:</strong>{" "}
                            {order.createdAt ? new Date(order.createdAt).toLocaleString("vi-VN") : "-"}
                        </div>
                        <div className="mb-2">
                            <strong>Tổng tiền:</strong>{" "}
                            {order.totalPrice?.toLocaleString("vi-VN")} ₫
                        </div>
                        <div className="mb-2">
                            <strong>Trạng thái:</strong> {order.status || "Chờ xử lý"}
                        </div>
                        <div className="mb-2">
                            <strong>Phương thức thanh toán:</strong> {order.paymentMethod}
                        </div>
                        <div className="mb-2">
                            <strong>Số điện thoại:</strong> {order.phone}
                        </div>
                        <div className="mb-2">
                            <strong>Địa chỉ giao hàng:</strong> {order.shippingAddress}
                        </div>

                        <div className="mt-4">
                            <strong>Danh sách sản phẩm:</strong>
                            <table className="w-full mt-2 border">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border px-2 py-1">Hình ảnh</th>
                                        <th className="border px-2 py-1">Tên</th>
                                        <th className="border px-2 py-1">Số lượng</th>
                                        <th className="border px-2 py-1">Giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items.map((item: any, index: number) => (
                                        <tr key={index}>
                                            <td className="border px-2 py-1 text-center">
                                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mx-auto" />
                                            </td>
                                            <td className="border px-2 py-1">{item.name}</td>
                                            <td className="border px-2 py-1 text-center">{item.quantity}</td>
                                            <td className="border px-2 py-1">{item.price?.toLocaleString("vi-VN")} ₫</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyOrdersPage;
