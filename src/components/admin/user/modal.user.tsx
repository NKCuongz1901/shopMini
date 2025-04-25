import React, { useEffect } from "react";
import { Form, Modal, Input, Button, message, Select } from "antd";
import { creatUser, updateUser } from "@/services/api";
import { IUser } from "@/types/global";

interface ModalUserProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
    reloadTable: () => void;
    dataInit: IUser | null;
    setDataInit: (data: IUser | null) => void;
}

const ModalUser: React.FC<ModalUserProps> = ({
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
            console.log("values1111:", values);
            if (dataInit) {
                await updateUser(dataInit._id, values);
                message.success("Sửa người dùng thành công!");
            } else {
                await creatUser(values);
                message.success("Thêm người dùng thành công!");
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
            title={dataInit ? "Sửa người dùng" : "Thêm người dùng"}
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
                    name="name"
                    label="Tên người dùng"
                    rules={[{ required: true, message: "Vui lòng nhập tên người dùng!" }]}
                >
                    <Input placeholder="Nhập tên người dùng" />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: "Vui lòng nhập email!" },
                        { type: "email", message: "Email không hợp lệ!" },
                    ]}
                >
                    <Input placeholder="Nhập email" />
                </Form.Item>
                {!dataInit &&  <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[{ required: !dataInit, message: "Vui lòng nhập mật khẩu!" }]}
                >
                  <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>}
               
                <Form.Item
                    name="address"
                    label="Địa chỉ"
                    rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
                >
                    <Input placeholder="Nhập địa chỉ" />
                </Form.Item>
                <Form.Item
                    name="role"
                    label="Vai trò"
                    rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
                >
                    <Select placeholder="Chọn vai trò">
                        <Select.Option value="ADMIN">Quản trị viên</Select.Option>
                        <Select.Option value="USER">Người dùng</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalUser;