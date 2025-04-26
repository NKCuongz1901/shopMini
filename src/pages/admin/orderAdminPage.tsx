import React, { useEffect, useState } from "react";
import { Table, Button, Space, message } from "antd";
import { EditOutlined, PlusOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { getListOrders, getUserByIdApi } from "@/services/api";  // Đảm bảo import đúng API getUserByIdApi
import ModalOrder from "@/components/admin/order/modal.order";
import { IOrder } from "@/types/global";

const OrderAdminPage = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [users, setUsers] = useState<Map<string, string>>(new Map());  // Lưu thông tin userId -> tên
    const [loading, setLoading] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    
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

    useEffect(() => {
        fetchOrders();
    }, []);

    const columns = [
        {
            title: "STT",
            key: "index",
            render: (_text: any, _record: IOrder, index: number) => index + 1,
        },
        {
            title: "Người dùng",
            dataIndex: "userId",
            key: "userId",
            render: (userId: string) => users.get(userId) || "Không rõ",  // Lấy tên từ Map
        },
        {
            title: "Số lượng",
            dataIndex: "items",
            key: "items",
            render: (items: any[]) => items.length, // lấy số lượng sản phẩm
        },
        {
            title: "Giá tiền",
            dataIndex: "totalPrice",
            key: "totalPrice",
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
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
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
            <Table
                dataSource={orders}
                columns={columns}
                rowKey="_id"
                loading={loading}
                scroll={{ x: "max-content" }}
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
