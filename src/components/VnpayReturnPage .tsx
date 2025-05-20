import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'query-string';
import { vnpayReturnApi } from '@/services/api';

const VnpayReturnHandler = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [paymentResult, setPaymentResult] = useState<{ status: string; orderId?: string; amount?: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryObj = qs.parse(search);

    (async () => {
      try {
        const data: any = await vnpayReturnApi(queryObj);
        console.log('API response (vnpayReturn):', data);
        if (!data) {
          setPaymentResult({ status: 'FAILED' });
        } else {
          setPaymentResult(data);
        }
      } catch (err) {
        setPaymentResult({ status: 'FAILED' });
      } finally {
        setLoading(false);
      }
    })();
  }, [search]);

  const handleBackToOrders = () => {
    navigate('/my-orders', { state: paymentResult });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600 animate-pulse">Đang xác minh thanh toán…</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {paymentResult?.status === 'PAID' ? (
          <>
            <div className="mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-16 w-16 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <h2 className="mt-4 text-2xl font-bold text-green-700">Thanh toán thành công!</h2>
            </div>
            <p className="text-gray-700 mb-2">Mã đơn hàng: <span className="font-mono">{paymentResult.orderId}</span></p>
            <p className="text-gray-700 mb-4">
              Số tiền đã thanh toán: <strong>{paymentResult.amount?.toLocaleString('vi-VN')} ₫</strong>
            </p>
            <p className="mb-6 text-gray-600">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
            <button
              onClick={handleBackToOrders}
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
              type="button"
            >
              Quay về đơn hàng của tôi
            </button>
          </>
        ) : (
          <>
            <div className="mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-16 w-16 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <h2 className="mt-4 text-2xl font-bold text-red-700">Thanh toán thất bại</h2>
            </div>
            <p className="mb-6 text-gray-600">Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
            <button
              onClick={handleBackToOrders}
              className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition"
              type="button"
            >
              Quay về đơn hàng của tôi
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VnpayReturnHandler;
