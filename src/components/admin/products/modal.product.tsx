import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Modal, Upload, Input, Button, message, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { uploadImageApi, updateProductApi, createProductApi, getCategoriesApi } from "@/services/api";
import React from "react";
import { IProduct } from "@/types/global";
 
interface ModalProductProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
    reloadTable: () => void;
    dataInit: IProduct | null;
    setDataInit: (data: IProduct | null) => void;
}

const ModalProduct: React.FC<ModalProductProps> = ({
    openModal,
    setOpenModal,
    reloadTable,
    dataInit,
    setDataInit,
}) => {
    const [form] = Form.useForm();
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [categories, setCategories] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getCategoriesApi();
                if (Array.isArray(res)) {
                    const options = res.map((cat: any) => ({
                        label: cat.name,
                        value: cat._id,
                    }));
                    console.log("lllll:",options);
                    setCategories(options);
                }
            } catch (error) {
                message.error("Không thể tải danh mục sản phẩm");
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (dataInit) {
            form.setFieldsValue(dataInit);
            setImageUrl(dataInit.image || null);
        } else {
            form.resetFields();
            setImageUrl(null);
        }
    }, [dataInit, form]);

    const handleUpload = async (file: File) => {
        try {
            setLoadingUpload(true);
            const response: any = await uploadImageApi(file);
            if (response && response.data) {
                setImageUrl(response.data?.url);
                message.success("Upload ảnh thành công!");
            }
        } catch (error) {
            message.error("Lỗi khi upload ảnh!");
        } finally {
            setLoadingUpload(false);
        }
    };

    const beforeUpload = (file: File) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("Bạn chỉ có thể upload file JPG/PNG!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Hình ảnh phải nhỏ hơn 2MB!");
        }
        return isJpgOrPng && isLt2M;
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            if (!imageUrl) {
                message.error("Vui lòng upload ảnh sản phẩm!");
                return;
            }

            if (dataInit) {
                await updateProductApi(dataInit._id, { ...values, image: imageUrl });
                message.success("Sửa sản phẩm thành công!");
            } else {
                await createProductApi({ ...values, image: imageUrl });
                message.success("Thêm sản phẩm thành công!");
            }

            reloadTable();
            setOpenModal(false);
            setDataInit(null);
        } catch (error) {
            message.error("Có lỗi xảy ra!");
        }
    };

    const handleCancel = () => {
        setOpenModal(false);
        setDataInit(null);
        form.resetFields();
        setImageUrl(null);
    };

    return (
        <Modal
            title={dataInit ? "Sửa sản phẩm" : "Thêm sản phẩm"}
            open={openModal}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Lưu
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="productName"
                    label="Tên sản phẩm"
                    rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
                >
                    <Input placeholder="Nhập tên sản phẩm" />
                </Form.Item>
                <Form.Item
                    name="category"
                    label="Danh mục"
                    rules={[{ required: true, message: "Vui lòng chọn danh mục sản phẩm!" }]}
                >
                    <Select
                        placeholder="Chọn danh mục"
                        options={categories}
                        showSearch
                        optionFilterProp="label"
                    />
                </Form.Item>
                <Form.Item
                    name="quantity"
                    label="Số lượng"
                    rules={[{ required: true, message: "Vui lòng nhập số lượng sản phẩm!" }]}
                >
                    <InputNumber min={1} placeholder="Nhập số lượng sản phẩm" style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Giá"
                    rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm!" }]}
                >
                    <InputNumber
                        min={0}
                        placeholder="Nhập giá sản phẩm"
                        style={{ width: "100%" }}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[{ required: true, message: "Vui lòng nhập mô tả sản phẩm!" }]}
                >
                    <Input.TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
                </Form.Item>
                <Form.Item label="Ảnh sản phẩm">
                    <Upload
                        name="image"
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        customRequest={({ file }) => handleUpload(file as File)}
                    >
                        {imageUrl ? (
                            <img src={imageUrl} alt="product" style={{ width: "100%" }} />
                        ) : (
                            <div>
                                {loadingUpload ? <LoadingOutlined /> : <PlusOutlined />}
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalProduct;
