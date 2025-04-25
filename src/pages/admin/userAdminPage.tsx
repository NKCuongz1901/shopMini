import React, { useEffect, useState } from "react";
import { Table, Button, Space, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { getListUsers, deleteUser } from "@/services/api";
import ModalUser from "@/components/admin/user/modal.user";
import { IUser } from "@/types/global";

const UserAdminPage = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [dataInit, setDataInit] = useState<IUser | null>(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await getListUsers();
            if (Array.isArray(res)) {
                setUsers(res);
            } else {
                message.error("Dữ liệu trả về không đúng định dạng");
            }
        } catch (error) {
            message.error("Không thể tải danh sách người dùng");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (user?: IUser) => {
        setDataInit(user || null);
        setOpenModal(true);
    };

    const handleDeleteUser = async (id: string) => {
        try {
            await deleteUser(id);
            message.success("Xóa người dùng thành công!");
            fetchUsers();
        } catch (error) {
            message.error("Không thể xóa người dùng!");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const columns = [
        {
            title: "STT",
            key: "index",
            render: (_text: any, _record: IUser, index: number) => index + 1,
        },
        {
            title: "Tên người dùng",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Vai trò",
            dataIndex: "role",
            key: "role",
            render: (role: string) => (role === "ADMIN" ? "Quản trị viên" : "Người dùng"),
        },
        {
            title : 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title : 'UpdatedAt',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
        },
        {
            title: "Hành động",
            key: "actions",
            render: (_text: any, record: IUser) => (
                <Space>
                    <EditOutlined
                        style={{ fontSize: 20, color: "#ffa500", cursor: "pointer" }}
                        onClick={() => handleOpenModal(record)}
                    />
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa người dùng này?"
                        okText="Xác nhận"
                        cancelText="Hủy"
                        onConfirm={() => handleDeleteUser(record._id)}
                    >
                        <DeleteOutlined
                            style={{ fontSize: 20, color: "#ff4d4f", cursor: "pointer" }}
                        />
                    </Popconfirm>
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
                onClick={() => handleOpenModal()}
            >
                Thêm mới
            </Button>
            <Table
                dataSource={users}
                columns={columns}
                rowKey="_id"
                loading={loading}
                scroll={{ x: "max-content" }}
            />
            <ModalUser
                openModal={openModal}
                setOpenModal={setOpenModal}
                reloadTable={fetchUsers}
                dataInit={dataInit}
                setDataInit={setDataInit}
            />
        </div>
    );
};

export default UserAdminPage;