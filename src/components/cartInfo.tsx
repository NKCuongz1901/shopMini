import { useEffect, useState } from "react";
import {
  getCartApi,
  updateToCartApi,
  getProductByIdApi,
  deleteItemCartApi
} from "../services/api";

const CartInfo = ({
  userId,
  onSelectedChange,
}: {
  userId: string;
  onSelectedChange?: (selectedIds: string[]) => void;
}) => {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [productDetails, setProductDetails] = useState<Record<string, any>>({});
  const [selectedTotal, setSelectedTotal] = useState<number>(0);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    const fetchCart = async () => {
      try {
        const res = await getCartApi(userId);
        setCart(res);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setCart(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [userId]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!cart || !cart.items) return;
      const newDetails: Record<string, any> = { ...productDetails };

      for (const item of cart.items) {
        const id = item.productId;
        if (!newDetails[id]) {
          try {
            const detail = await getProductByIdApi(id);
            newDetails[id] = detail;
          } catch (error) {
            console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
          }
        }
      }

      setProductDetails(newDetails);
    };

    fetchProductDetails();
  }, [cart]);

  useEffect(() => {
    if (onSelectedChange) {
      onSelectedChange(selectedProducts);
    }

    if (!cart || !cart.items) return;
    const total = cart.items.reduce((sum: number, item: any) => {
      return selectedProducts.includes(item.productId)
        ? sum + item.total
        : sum;
    }, 0);
    setSelectedTotal(total);
  }, [selectedProducts, cart, onSelectedChange]);

  const handleCheckboxChange = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (!cart || !cart.items) return;

    if (selectedProducts.length === cart.items.length) {
      setSelectedProducts([]);
    } else {
      const allProductIds = cart.items.map((item: any) => item.productId);
      setSelectedProducts(allProductIds);
    }
  };

  const isAllSelected =
    cart && cart.items.length > 0 && selectedProducts.length === cart.items.length;

  const handleQuantityChange = async (productId: string, delta: number) => {
    const item = cart.items.find((i: any) => i.productId === productId);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity === 0) {
      const confirmDelete = window.confirm("Bạn có muốn xoá sản phẩm này khỏi giỏ hàng không?");
      if (!confirmDelete) return;
    } else if (newQuantity < 0) {
      return;
    }

    try {
      await updateToCartApi({
        userId,
        productId,
        quantity: newQuantity,
      });
      const newCart = await getCartApi(userId);
      setCart(newCart);
    } catch (error) {
      console.error("Cập nhật số lượng thất bại:", error);
    }
  };

  const handleDeleteItem = async (productId: string) => {
  const confirmDelete = window.confirm("Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng?");
  if (!confirmDelete) return;

  try {
    await deleteItemCartApi({ userId, productId });
    const newCart = await getCartApi(userId);
    setCart(newCart);
    setSelectedProducts((prev) => prev.filter((id) => id !== productId));
  } catch (error) {
    console.error("Lỗi khi xoá sản phẩm:", error);
  }
};


  if (loading) return <div>Đang tải dữ liệu giỏ hàng...</div>;
  if (!cart || !cart.items?.length)
    return <div className="text-gray-500">Không có sản phẩm trong giỏ hàng.</div>;

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm mb-4">
      <h3 className="text-md font-semibold mb-2 text-blue-600">🛒 Thông tin giỏ hàng</h3>
      <ul className="space-y-3">
        {cart.items.map((item: any) => {
          const product = productDetails[item.productId];
          return (
            <li
              key={item._id}
              className="border p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition flex items-center gap-4"
            >
              <input
                type="checkbox"
                checked={selectedProducts.includes(item.productId)}
                onChange={() => handleCheckboxChange(item.productId)}
                className="shrink-0"
              />

              <div className="flex-1 flex justify-between items-center gap-4 flex-wrap">
                <div className="w-1/5 flex items-center gap-2">
                  {product?.image && (
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <div>
                    <strong>{product?.productName || "Sản phẩm"}</strong>
                  </div>
                </div>

                <div className="w-1/5 flex items-center gap-2">
                  <strong>Số lượng:</strong>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => handleQuantityChange(item.productId, -1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => handleQuantityChange(item.productId, 1)}
                  >
                    +
                  </button>
                </div>

                <div className="w-1/5">
                  <strong>Giá:</strong> {item.price.toLocaleString("vi-VN")} VND
                </div>
                <div className="w-1/5">
                  <strong>Tổng:</strong> {item.total.toLocaleString("vi-VN")} VND
                </div>
                <div className="w-1/10 flex items-center">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteItem(item.productId)}
                  >
                    🗑️ Xoá
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Tổng tiền và chọn tất cả */}
      <div className="mt-4 flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={handleSelectAll}
          />
          Chọn tất cả
        </label>
        <strong className="text-lg text-green-600">
          Tổng tiền các sản phẩm đã chọn: {selectedTotal.toLocaleString("vi-VN")} VND
        </strong>
      </div>
    </div>
  );
};

export default CartInfo;
