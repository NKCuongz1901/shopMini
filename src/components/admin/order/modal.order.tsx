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

interface OrderItem {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  total: number;
  _id: string;
}

const ModalOrder: React.FC<ModalOrderProps> = ({ openModal, setOpenModal, userId }) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userId) {
      console.log("Không có userId, không gọi API");
      return;
    }
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await getOrdersApiByIdUser(userId);
        console.log("Dữ liệu API:", res);
        const ordersData:any = Array.isArray(res) ? res : [res].filter(Boolean);
        if (ordersData.length > 0) {
          setOrders(ordersData);
        } else {
          message.info("Không có đơn hàng nào cho người dùng này!");
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        message.error("Không thể tải danh sách đơn hàng!");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId]);

  const handleCancel = () => {
    setOpenModal(false);
  };

  // Cột cho bảng con (chi tiết items)
  const itemColumns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img src={image} alt="product" style={{ width: 50, height: 50, objectFit: "cover" }} />
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => price.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    {
      title: "Tổng",
      dataIndex: "total",
      key: "total",
      render: (total: number) => total.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
  ];

  // Cột cho bảng chính
  const columns = [
    {
      title: "STT",
      key: "index",
      render: (_text: any, _record: IOrder, index: number) => index + 1,
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "items",
      key: "items",
      render: (items: OrderItem[] | undefined) => (Array.isArray(items) ? items.length : 0),
    },
    {
      title: "Giá tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number | undefined) =>
        price !== undefined
          ? price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
          : "Chưa có giá",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (phone: string | undefined) => phone || "Không có",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string | undefined) => status || "Không rõ",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string | undefined) =>
        date ? new Date(date).toLocaleDateString("vi-VN") : "-",
    },
  ];

  // Bảng con cho items (sử dụng expandedRowRender)
  const expandedRowRender = (record: IOrder) => {
    return (
      <Table
        columns={itemColumns}
        dataSource={record.items}
        rowKey="_id"
        pagination={false}
        size="small"
      />
    );
  };

  return (
    <Modal
      title="Chi tiết đơn hàng"
      open={openModal}
      onCancel={handleCancel}
      footer={[<Button key="close" onClick={handleCancel}>Đóng</Button>]}
      width={1000} // Tăng kích thước modal
      bodyStyle={{ padding: 16 }} // Tùy chỉnh padding
    >
      {loading ? (
        <Table
          dataSource={[]}
          columns={columns}
          rowKey="_id"
          loading={loading}
          pagination={false}
          expandable={{ expandedRowRender }}
        />
      ) : orders.length === 0 ? (
        <p>Không có đơn hàng nào cho người dùng này.</p>
      ) : (
        <Table
          dataSource={orders}
          columns={columns}
          rowKey="_id"
          loading={loading}
          pagination={false}
          expandable={{ expandedRowRender }} // Thêm bảng con cho items
          scroll={{ x: "max-content" }} // Cho phép cuộn ngang nếu bảng rộng
        />
      )}
    </Modal>
  );
};

export default ModalOrder;