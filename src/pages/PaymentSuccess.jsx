import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { message } from "antd";
import axios from "axios";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const orderCode = params.get("orderCode");
  const courseId = params.get("courseId"); // sẽ dùng cách 2 để truyền courseId

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/enrollments/confirm`,
          { orderCode },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        message.success("Thanh toán thành công! Bạn đã được kích hoạt khóa học.");

        // ✔ Redirect thẳng về trang khóa học
        navigate(`/student/courses/${courseId}`);
      } catch (err) {
        message.error("Xác nhận thanh toán thất bại!");
      }
    };

    if (orderCode) confirmPayment();
  }, [orderCode, courseId, navigate]);

  return <p>Đang xác nhận thanh toán...</p>;
}
