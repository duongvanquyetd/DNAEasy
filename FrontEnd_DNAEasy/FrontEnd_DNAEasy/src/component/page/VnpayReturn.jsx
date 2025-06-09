import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { UpdateStatusAppointment } from '../../service/appointment';
import { useNavigate } from 'react-router-dom';
import { CreateSampleByAppointmentID } from '../../service/sample';
import { PayToview, UpdatePaymentStatus } from '../../service/payment';

export const VNPayReturn = () => {
  const [searchParams] = useSearchParams();
  const navigator = useNavigate();
  const hasRun = useRef(false); // flag kiểm soát

  useEffect(() => {
    if (hasRun.current) return; // không chạy lại
    hasRun.current = true;

    const responseCode = searchParams.get('vnp_ResponseCode');
    const txnRef = searchParams.get('vnp_TxnRef');
    const vnp_OrderInfo = searchParams.get('vnp_OrderInfo');
    const appointmentId = txnRef.split("_")[0];
    const updateappointment = { appointmentId: Number(appointmentId), status: 'PAID' };
    console.log("Update Appointment Data:", updateappointment);
    const appoimentid = { appointmentId: updateappointment.appointmentId };
    if (responseCode === '00') {
      alert("Thanh toán thành công!");
      console.log(vnp_OrderInfo)
      if (vnp_OrderInfo.includes("Pay haft price for")) {
        alert("vao cho mau roi")
        UpdateStatusAppointment(updateappointment)
          .then((response) => {
            console.log(response.data);

            console.log(updateappointment.appointmentId);
            CreateSampleByAppointmentID(appoimentid)
              .then((response) => {
                console.log("Tạo mẫu thành công:", response.data);
                navigator(`/yourappoinment`);
              })
              .catch((error) => {
                console.error("Lỗi khi tạo mẫu:", error);
                alert("Có lỗi xảy ra khi tạo mẫu.");
              });
          })
          .catch((error) => {
            console.error("Cập nhật lịch hẹn thất bại:", error);
            alert("Có lỗi xảy ra khi cập nhật lịch hẹn.");
          });
      }
      else {
       
        UpdatePaymentStatus(updateappointment.appointmentId).then((response) => {
          navigator("/historyBooking")
        }).catch((error) => {
          console.log(error)
        })
        // goi api paytoview
        // naivator history booking 

      }


    } else {
      alert("Thanh toán thất bại hoặc bị hủy.");
    }
  }, []);

  return <div>Đang xử lý kết quả thanh toán...</div>;
};
