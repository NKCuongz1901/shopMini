import  { useEffect, useState } from 'react';
import { Table, Button, Space, Popconfirm, message, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { getProductsApi, deleteProductApi,getCategoriesApi } from '@/services/api';
import ModalProduct from '@/components/admin/products/modal.product';
import { IProduct } from '@/types/global';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

dayjs.locale('vi');

const ProductAdminPage = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<{ label: string; value: string }[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [dataInit, setDataInit] = useState<IProduct | null>(null);
    const [searchName, setSearchName] = useState("");
    const [filterCategory, setFilterCategory] = useState("");

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await getProductsApi();
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

   
    
    const fetchCategories = async () => {
        try {
            const res = await getCategoriesApi(); // API trả mảng danh mục
            if (Array.isArray(res)) {
                const options = res.map((cat: any) => ({
                    label: cat.name,
                    value: cat._id,
                }));
                console.log("đasadsadsadsadsa",options)
                setCategories(options);
            }
        } catch (error) {
            message.error("Không thể tải danh mục sản phẩm");
        }
    };
    

    const handleOpenModal = (product?: IProduct) => {
        setDataInit(product || null);
        setOpenModal(true);
    };
    
    const handleDeleteProduct = async (id: string) => {
        try {
            await deleteProductApi(id);
            message.success("Xóa sản phẩm thành công!");
            fetchProducts(); // Tải lại danh sách sản phẩm sau khi xóa
        } catch (error) {
            message.error("Không thể xóa sản phẩm!");
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories()
    }, []);

    // Lọc sản phẩm theo tên và danh mục
    const filteredProducts = products.filter(product => {
        const matchName = product.productName.toLowerCase().includes(searchName.toLowerCase());
        const matchCategory = filterCategory ? product.category === filterCategory : true;
        return matchName && matchCategory;
    });

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
            render: (categoryId: string) => {
                const category = categories.find(cat => cat.value === categoryId);
                return category ? category.label : 'Không rõ';
            }
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
                        onConfirm={() => handleDeleteProduct(record._id)} // Gọi hàm xóa sản phẩm
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
            <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
                <Input
                    placeholder="Tìm theo tên sản phẩm"
                    value={searchName}
                    onChange={e => setSearchName(e.target.value)}
                    style={{ width: 200 }}
                />
                <Select
                    allowClear
                    placeholder="Lọc theo danh mục"
                    value={filterCategory || undefined}
                    onChange={value => setFilterCategory(value || "")}
                    style={{ width: 200 }}
                    options={categories}
                />
            </div>
            <Table
                dataSource={filteredProducts}
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
