import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { getCategoriesApi, deleteCategoryApi } from '@/services/api';
import ModalCatagory from '@/components/admin/catagory/modal.catagory';
import { ICategory } from '@/types/global';

const CatagoryAdminPage = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [dataInit, setDataInit] = useState<ICategory | null>(null);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res: any = await getCategoriesApi();
            console.log("res from API:", res);

            // Xử lý đúng định dạng nếu dữ liệu nằm trong res.data.data
            const data = res

            if (Array.isArray(data)) {
                setCategories(data);
            } else {
                message.error('Dữ liệu trả về không đúng định dạng mảng');
            }
        } catch (error) {
            console.error("Lỗi khi fetch categories:", error);
            message.error('Không thể tải danh sách danh mục');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (category?: ICategory) => {
        setDataInit(category || null);
        setOpenModal(true);
    };

    const handleDeleteCategory = async (id: string) => {
        try {
            await deleteCategoryApi(id);
            message.success("Xóa danh mục thành công!");
            fetchCategories(); // Tải lại danh sách sau khi xóa
        } catch (error) {
            message.error("Không thể xóa danh mục!");
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const columns = [
        {
            title: 'STT',
            key: 'index',
            render: (_text: any, _record: ICategory, index: number) => index + 1,
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
        },
        {
            title: 'Parent ID',
            dataIndex: 'parentId',
            key: 'parentId',
            render: (parentId: any) => {
                if (!parentId) return 'Không có';
                if (typeof parentId === 'object' && parentId.name) return parentId.name;
                return parentId;
            }
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Độ ưu tiên',
            dataIndex: 'priority',
            key: 'priority',
        },
        {
            title: 'Loại danh mục',
            dataIndex: 'type',
            key: 'type',
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
            title: 'Hành động',
            key: 'actions',
            render: (_text: any, record: ICategory) => (
                <Space>
                    <EditOutlined
                        style={{ fontSize: 20, color: '#ffa500', cursor: 'pointer' }}
                        onClick={() => handleOpenModal(record)}
                    />
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa danh mục này?"
                        okText="Xác nhận"
                        cancelText="Hủy"
                        onConfirm={() => handleDeleteCategory(record._id)} // Gọi hàm xóa
                    >
                        <DeleteOutlined
                            style={{ fontSize: 20, color: '#ff4d4f', cursor: 'pointer' }}
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
                dataSource={categories}
                columns={columns}
                rowKey={(record) => record._id}
                loading={loading}
                scroll={{ x: 'max-content' }}
            />

            <ModalCatagory
                openModal={openModal}
                setOpenModal={setOpenModal}
                reloadTable={fetchCategories}
                dataInit={dataInit}
                setDataInit={setDataInit}
            />
        </div>
    );
};

export default CatagoryAdminPage;
