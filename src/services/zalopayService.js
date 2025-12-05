import api from "./api"; // axios instance có token

// Gọi backend để tạo thanh toán ZaloPay
export const createZaloPayment = async (courseId) => {
  return await api.post("/enrollment/create-payment", { courseId });
};
