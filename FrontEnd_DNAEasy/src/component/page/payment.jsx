import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CreateSampleByAppointmentID } from '../../service/sample';
import { UpdatePaymentStatus } from '../../service/payment';

export const Payment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const appointmentId = searchParams.get("appointmentId");
  const success = searchParams.get("success") === "true";
  const paymentfor = searchParams.get("paymentfor");
  const hasRun = useRef(true); // Dùng để khóa

  useEffect(() => {
    if (!hasRun.current) return; 
    hasRun.current = false;

    if (success) {
      if (paymentfor === "pay") {
        CreateSampleByAppointmentID({ appointmentId: appointmentId })
          .then((response) => {
            console.log("Tạo mẫu thành công:", response.data);
            navigate("/yourappointment");
          })
          .catch((err) => {
            alert("Tạo mẫu thất bại.");
            navigate("/yourappointment");
          });

      } else if (paymentfor === "view") {
        const paymentUpdate = {
          appointmentId: appointmentId,
          paymentMehtod: "VNPay"
        };
        UpdatePaymentStatus(paymentUpdate)
          .then((response) => {
            console.log("Cập nhật thanh toán thành công:", response.data);
            navigate("/historybooking");
          })
          .catch((error) => {
            alert("Cập nhật trạng thái thanh toán thất bại.");
            navigate("/yourappointment");
          });
      }
    } else {
      alert("Thanh toán thất bại hoặc bị hủy.");
      navigate("/yourappoinment");
    }
  }, []);

  return <div>Đang xử lý kết quả thanh toán...</div>;
};
