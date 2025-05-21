import React, { useEffect, useState } from "react";
import { Table, Button, Space, message, Input, Select } from "antd";
import { EditOutlined, PlusOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { getListOrders, getUserByIdApi, updateOrderApi } from "@/services/api";
import ModalOrder from "@/components/admin/order/modal.order";
import { IOrder } from "@/types/global";

const OrderAdminPage = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [users, setUsers] = useState<Map<string, string>>(new Map());
    const [loading, setLoading] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [searchPhone, setSearchPhone] = useState("");
    const [searchName, setSearchName] = useState(""); // Thêm state lọc tên
    const [filterStatus, setFilterStatus] = useState(""); // Thêm state lọc status
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await getListOrders();
            console.log("dsadsadsad",res);
            if (Array.isArray(res)) {
                setOrders(res);
                // Gọi API để lấy tên người dùng
                //setSelectedUserId(res.userId),
                await fetchUsers(res);
            } else {
              message.error("Dữ liệu trả về không đúng định dạng!");
            }
        } catch (error) {
            message.error("Không thể tải danh sách đơn hàng!");
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async (orders: IOrder[]) => {
        const userIds = orders.map((order) => order.userId);
        const uniqueUserIds = Array.from(new Set(userIds));  // Loại bỏ userId trùng lặp

        for (const userId of uniqueUserIds) {
            try {
                const user:any = await getUserByIdApi(userId);  // Gọi API lấy thông tin user
                if (user?.name) {
                    setUsers((prevUsers) => new Map(prevUsers).set(userId, user?.name));  // Cập nhật tên người dùng
                }
            } catch (error) {
                console.error(`Không thể lấy thông tin người dùng ${userId}`);
            }
        }
    };

    const handleOpenModal = (userId: string) => {
        setSelectedUserId(userId);
        setOpenModal(true);
    };

    const handleUpdateStatus = async (orderId: string, newStatus: string) => {
        try {
            console.log("orderId", orderId);
            console.log("newStatus", newStatus);
            const res = await updateOrderApi(orderId, newStatus);
            console.log("res from API orrrrrrrr:", res);
            if (res) {
                setOrders(prev =>
                    prev.map(order =>
                        order._id === orderId ? { ...order, status: newStatus } : order
                    )
                );
                alert("Cập nhật trạng thái thành công!");
            } else {
               alert("Cập nhật trạng thái thất bại!");
            }
        } catch (error) {
            message.error("Cập nhật trạng thái thất bại!");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Lọc theo số điện thoại, tên và trạng thái
    const filteredOrders = orders.filter(order => {
        const userName = users.get(order.userId) || "";
        const matchPhone = order.phone?.toLowerCase().includes(searchPhone.toLowerCase());
        const matchName = userName.toLowerCase().includes(searchName.toLowerCase());
        const matchStatus = filterStatus ? order.status === filterStatus : true;
        return matchPhone && matchName && matchStatus;
    });

    // Map trạng thái sang tiếng Việt
    const statusOptions = [
        { value: "PENDING", label: "Chờ xử lý" },
        { value: "PROCESSING", label: "Đang xử lý" },
        { value: "SHIPPED", label: "Đã gửi hàng" },
        { value: "DELIVERED", label: "Đã thanh toán" },
        { value: "CANCELLED", label: "Đã hủy" },
    ];

    const columns = [
        {
            title: "STT",
            key: "index",
            render: (_text: any, _record: IOrder, index: number) =>
                (currentPage - 1) * pageSize + index + 1,
        },
        {
            title: "Người dùng",
            dataIndex: "userId",
            key: "userId",
            render: (userId: string) => users.get(userId) || "Không rõ",
        },
        {
            title: "Số lượng",
            dataIndex: "items",
            key: "items",
            render: (items: any[]) => items.length,
        },
        {
            title: "Giá tiền",
            dataIndex: "totalPrice",
            key: "totalPrice",
            render: (price: number) =>
                price
                    ? price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
                    : "0 ₫",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status: string, record: IOrder) => (
                <Select
                    value={status}
                    style={{ width: 140 }}
                    onChange={value => handleUpdateStatus(record._id, value)}
                    options={statusOptions}
                />
            ),
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date: string) =>
                date
                    ? new Date(date).toLocaleString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                      })
                    : "-",
        },
        {
            title: "Hành động",
            key: "actions",
            render: (_text: any, record: IOrder) => (
                <Space>
                    <InfoCircleOutlined
                        style={{ fontSize: 20, color: "#1890ff", cursor: "pointer" }}
                        onClick={() => handleOpenModal(record.userId)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Button
                icon={<PlusOutlined />}
                type="primary"
                style={{ marginBottom: 16 }}
                onClick={() => message.info("Thêm mới đơn hàng chưa được hỗ trợ!")}
            >
                Thêm mới
            </Button>
            <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
                <Input
                    placeholder="Tìm theo số điện thoại"
                    value={searchPhone}
                    onChange={e => setSearchPhone(e.target.value)}
                    style={{ width: 180 }}
                />
                <Input
                    placeholder="Tìm theo tên người dùng"
                    value={searchName}
                    onChange={e => setSearchName(e.target.value)}
                    style={{ width: 180 }}
                />
                <Select
                    allowClear
                    placeholder="Lọc theo trạng thái"
                    value={filterStatus || undefined}
                    onChange={value => setFilterStatus(value || "")}
                    style={{ width: 180 }}
                    options={statusOptions}
                />
            </div>
            <Table
                dataSource={filteredOrders}
                columns={columns}
                rowKey="_id"
                loading={loading}
                scroll={{ x: "max-content" }}
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: filteredOrders.length,
                    onChange: (page, size) => {
                        setCurrentPage(page);
                        setPageSize(size || 10);
                    },
                }}
            />
            <ModalOrder
                openModal={openModal}
                setOpenModal={setOpenModal}
                userId={selectedUserId}
            />
        </div>
    );
};

export default OrderAdminPage;
