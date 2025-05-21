import React, { useEffect, useState } from "react";
import { Table, Button, Space, Popconfirm, message, Input } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { getListUsers, deleteUser } from "@/services/api";
import ModalUser from "@/components/admin/user/modal.user";
import { IUser } from "@/types/global";
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

dayjs.locale('vi');

const UserAdminPage = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [dataInit, setDataInit] = useState<IUser | null>(null);
    const [searchEmail, setSearchEmail] = useState("");

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

    // Lọc users theo email
    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchEmail.toLowerCase())
    );

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
            render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
        },
        {
            title : 'UpdatedAt',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
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
            <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
                <Input
                    placeholder="Tìm kiếm theo email"
                    value={searchEmail}
                    onChange={e => setSearchEmail(e.target.value)}
                    style={{ width: 250 }}
                />
            </div>
            <Table
                dataSource={filteredUsers}
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