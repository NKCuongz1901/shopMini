import React, { useEffect, useState } from "react";
import { getOrdersApiByIdUser } from "@/services/api";
import { useCurrentApp } from "../../components/context/app.context";

const PAGE_SIZE = 10;

const MyOrdersPage = () => {
    const { user } = useCurrentApp();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (!user?.id) return;
        setLoading(true);
        const fetchOrders = async () => {
            try {
                const res: any = await getOrdersApiByIdUser(user.id);
                if (res) {
                    setOrders(Array.isArray(res) ? res : [res]);
                } else {
                    setOrders([]);
                }
            } catch (error) {
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user]);

    // Lấy danh sách đơn hàng cho trang hiện tại
    const paginatedOrders = orders.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    const totalPages = Math.ceil(orders.length / PAGE_SIZE);

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Đơn hàng của tôi</h1>
            {loading ? (
                <div className="text-center text-lg text-gray-500">Đang tải...</div>
            ) : orders.length === 0 ? (
                <div className="text-center text-gray-500">Bạn chưa có đơn hàng nào.</div>
            ) : (
                <>
                    <div className="space-y-8">
                        {paginatedOrders.map((order) => (
                            <div
                                key={order._id}
                                className="border rounded-xl shadow-md bg-white p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
                                    <div>
                                        <span className="font-semibold text-gray-700">Mã đơn:</span>{" "}
                                        <span className="text-blue-600">{order._id}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-700">Ngày đặt:</span>{" "}
                                        <span>{order.createdAt ? new Date(order.createdAt).toLocaleString("vi-VN") : "-"}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-700">Tổng tiền:</span>{" "}
                                        <span className="text-red-600 font-bold">{order.totalPrice?.toLocaleString("vi-VN")} ₫</span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-4 mb-2 text-sm text-gray-600">
                                    <div>
                                        <span className="font-semibold">Trạng thái:</span>{" "}
                                        <span className="text-green-600">{order.status || "Chờ xử lý"}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold">Thanh toán:</span> {order.paymentMethod}
                                    </div>
                                    <div>
                                        <span className="font-semibold">SĐT:</span> {order.phone}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Địa chỉ:</span> {order.shippingAddress}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="font-semibold mb-2 text-gray-700">Danh sách sản phẩm:</div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full border rounded-lg overflow-hidden">
                                            <thead>
                                                <tr className="bg-blue-50 text-blue-700">
                                                    <th className="border px-3 py-2">Hình ảnh</th>
                                                    <th className="border px-3 py-2">Tên</th>
                                                    <th className="border px-3 py-2">Số lượng</th>
                                                    <th className="border px-3 py-2">Giá</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.items.map((item: any, index: number) => (
                                                    <tr key={index} className="hover:bg-blue-50">
                                                        <td className="border px-3 py-2 text-center">
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="w-14 h-14 object-cover rounded shadow mx-auto"
                                                            />
                                                        </td>
                                                        <td className="border px-3 py-2">{item.name}</td>
                                                        <td className="border px-3 py-2 text-center">{item.quantity}</td>
                                                        <td className="border px-3 py-2 text-right">{item.price?.toLocaleString("vi-VN")} ₫</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8 gap-2">
                            <button
                                className="px-3 py-1 rounded border bg-gray-100 hover:bg-blue-100"
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                Trang trước
                            </button>
                            {[...Array(totalPages)].map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`px-3 py-1 rounded border ${currentPage === idx + 1 ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-blue-100"}`}
                                    onClick={() => setCurrentPage(idx + 1)}
                                >
                                    {idx + 1}
                                </button>
                            ))}
                            <button
                                className="px-3 py-1 rounded border bg-gray-100 hover:bg-blue-100"
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                Trang sau
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MyOrdersPage;
