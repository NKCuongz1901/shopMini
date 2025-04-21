import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { getProductsApi } from '@/services/api';
import ModalProduct from '@/components/products/modal.product';
import { IProduct } from '@/types/global';

const ProductAdminPage = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [dataInit, setDataInit] = useState<IProduct | null>(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await getProductsApi();
            console.log("res.data1", res);
            1
            // Check if the response is valid and contains data
            console.log("res.data", res.data);
            if (Array.isArray(res)) {
                setProducts(res);
            } else {
                message.error('Dữ liệu trả về không đúng định dạng');
            }
        } catch (error) {
            message.error('Không thể tải danh sách sản phẩm');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (product?: IProduct) => {
        setDataInit(product || null);
        setOpenModal(true);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const columns = [
        {
            title: 'STT',
            key: 'index',
            render: (_text: any, _record: IProduct, index: number) => index + 1,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => (
                <img
                    src={image}
                    alt="product"
                    style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
                />
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => price.toLocaleString('vi-VN') + ' đ',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_text: any, record: IProduct) => (
                <Space>
                    <EditOutlined
                        style={{ fontSize: 20, color: '#ffa500', cursor: 'pointer' }}
                        onClick={() => handleOpenModal(record)}
                    />
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa sản phẩm này?"
                        okText="Xác nhận"
                        cancelText="Hủy"
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
                dataSource={products}
                columns={columns}
                rowKey="_id"
                loading={loading}
                scroll={{ x: 'max-content' }}
            />
            <ModalProduct
                openModal={openModal}
                setOpenModal={setOpenModal}
                reloadTable={fetchProducts}
                dataInit={dataInit}
                setDataInit={setDataInit}
            />
        </div>
    );
};

export default ProductAdminPage;
