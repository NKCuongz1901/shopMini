import { Form, Modal, Input, Button, message, Select, Table } from "antd";
import { useEffect, useState } from "react";
import React from "react";
import { IOrder } from "@/types/global";
import { getOrdersApiByIdUser } from "@/services/api";

interface ModalOrderProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
    userId: string | null;
}

const ModalOrder: React.FC<ModalOrderProps> = ({ openModal, setOpenModal, userId }) => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (userId) {
            const fetchOrders = async () => {
                setLoading(true);
                try {
                    const res = await getOrdersApiByIdUser(userId);
                    if (Array.isArray(res)) {
                        setOrders(res);
                    } else {
                        message.error("Dữ liệu trả về không đúng định dạng!");
                    }
                } catch (error) {
                    message.error("Không thể tải danh sách đơn hàng!");
                } finally {
                    setLoading(false);
                }
            };

            fetchOrders();
        }
    }, [userId]);

    const handleCancel = () => {
        setOpenModal(false);
    };

    const columns = [
        {
            title: "STT",
            key: "index",
            render: (_text: any, _record: IOrder, index: number) => index + 1,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Ghi chú",
            dataIndex: "note",
            key: "note",
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
        },
    ];

    return (
        <Modal
            title="Chi tiết đơn hàng"
            open={openModal}
            onCancel={handleCancel}
            footer={[
                <Button key="close" onClick={handleCancel}>
                    Đóng
                </Button>,
            ]}
        >
            <Table
                dataSource={orders}
                columns={columns}
                rowKey="_id"
                loading={loading}
                pagination={false}
            />
        </Modal>
    );
};

export default ModalOrder;