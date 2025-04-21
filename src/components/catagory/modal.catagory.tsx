import React, { useEffect } from "react";
import { Form, Modal, Input, Button, message } from "antd";
import { createCategoryApi, updateCategoryApi } from "@/services/api";
import { ICategory } from "@/types/global";

interface ModalCatagoryProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
    reloadTable: () => void;
    dataInit: ICategory | null;
    setDataInit: (data: ICategory | null) => void;
}

const ModalCatagory: React.FC<ModalCatagoryProps> = ({
    openModal,
    setOpenModal,
    reloadTable,
    dataInit,
    setDataInit,
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataInit) {
            form.setFieldsValue(dataInit);
        } else {
            form.resetFields();
        }
    }, [dataInit, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            if (dataInit) {
                // Sửa danh mục
                await updateCategoryApi(dataInit._id, values);
                message.success("Sửa danh mục thành công!");
            } else {
                // Thêm danh mục
                await createCategoryApi(values);
                message.success("Thêm danh mục thành công!");
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
    };

    return (
        <Modal
            title={dataInit ? "Sửa danh mục" : "Thêm danh mục"}
            visible={openModal}
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
                    name="name"
                    label="Tên danh mục"
                    rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
                >
                    <Input placeholder="Nhập tên danh mục" />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[{ required: true, message: "Vui lòng nhập mô tả danh mục!" }]}
                >
                    <Input.TextArea rows={4} placeholder="Nhập mô tả danh mục" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalCatagory;