import React, { useEffect, useState } from 'react';
import { GetHistoryAppointment } from '../../service/appointment';
import { GetSampleByAppointmentId } from '../../service/sample';
import { GetResultByAppointmentId } from '../../service/result';
import { GetPaymentStatus, PayToview, UpdatePaymentStatus } from '../../service/payment';
import api from '../../service/api'; // Import API base nếu cần cho thanh toán

export const HistoryBooking = () => {
    const [historyBooking, setHistoryBooking] = useState([]);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const rolename = localStorage.getItem('rolename') ? localStorage.getItem('rolename') : null;
    useEffect(() => {
        const fetchHistoryBooking = async () => {
            try {
                const appointmentData = await GetHistoryAppointment();

                const fullAppointments = await Promise.all(
                    appointmentData.data.map(async (appointment) => {
                        const [result, status] = await Promise.all([
                            GetResultByAppointmentId({ appoinmentId: appointment.appointmentId }),
                            GetPaymentStatus(appointment.appointmentId),
                        ]);

                        return {
                            ...appointment,
                            trackingSample: appointment.listSample[0]?.sampleTracking || {},
                            result: result.data || [],
                            status: status.data, // true/false
                        };
                    })
                );

                setHistoryBooking(fullAppointments);
                console.log("History booking data fetched successfully:", fullAppointments);
            } catch (error) {
                console.error('Error fetching history booking:', error);
            }
        };

        fetchHistoryBooking();
    }, []);

    function handleVnpay(appointmentId) {
        PayToview(appointmentId)
            .then((response) => {

                window.location.href = response.data; // Redirect to payment page

            })
            .catch((error) => {
                console.error("Error fetching payment data:", error);
                alert("Có lỗi xảy ra khi lấy thông tin thanh toán.");
            });

    }
    function handleCash(booking) {

        const Updatepayment = {
            appointmentId: booking.appointmentId,
            paymentMehtod: "Cash"
        }
        UpdatePaymentStatus(Updatepayment).then((response) => {
            console.log("update", response.data);
            window.location.reload();
        })
            .catch((error) => {
                console.log(error.data)
            })
    }
    const formatDate = (date) => new Date(date).toLocaleString();

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-blue-800">Lịch hẹn của bạn</h2>

            {historyBooking.length === 0 && <p>Ban khong co appointment</p>}

            {historyBooking.map((booking) => (
                <div
                    key={booking.appointmentId}
                    className={`border rounded-xl p-6 mb-6 shadow-sm transition-all cursor-pointer ${selectedAppointmentId === booking.appointmentId ? 'bg-blue-50' : 'bg-white'
                        }`}
                    onClick={() =>
                        setSelectedAppointmentId(
                            selectedAppointmentId === booking.appointmentId ? null : booking.appointmentId
                        )
                    }
                >
                    {/* Thông tin tổng quan */}
                    <div className="space-y-1 mb-3">
                        <h3 className="text-xl font-semibold text-gray-800">{booking.serviceName}({booking.typeService})</h3>
                        <p className="text-gray-700"><strong>Khách hàng:</strong> {booking.customerName}</p>
                        <p className="text-gray-700"><strong>Ngày lấy mẫu:</strong> {formatDate(booking.dateCollect)}</p>
                        <p className="text-gray-700"><strong>Địa điểm:</strong> {booking.location}</p>
                        <p className="text-gray-700"><strong>Email:</strong> {booking.emailAppointment}</p>
                        <p className="text-gray-700"><strong>Phone:</strong> {booking.phoneAppointment}</p>
                        <p className="text-gray-700"><strong>Trạng thái:</strong> {booking.curentStatusAppointment || (booking.status ? "Đã thanh toán" : "Chưa thanh toán")}</p>
                        <p className="text-gray-700"><strong>Note:</strong> {booking.note}</p>
                        {rolename === "STAFF_RECEPTION" && (
                            <button
                                onClick={() => handleCash(booking)}
                                className="bg-[#f97316] text-white px-4 py-2 rounded hover:bg-[#dc2626] transition"
                            >
                                Paid cash
                            </button>
                        )}
                    </div>

                    {/* Chi tiết */}

                    {selectedAppointmentId === booking.appointmentId && (
                        <div className="mt-4 space-y-6 border-t pt-4 text-sm">
                            {!booking.status && rolename === "CUSTOMER" && booking.curentStatusAppointment === "COMPLETE" ? (
                                <div className="text-center">
                                    <p className="text-red-600 mb-4 font-medium">
                                        Bạn chưa thanh toán cho lịch hẹn này.
                                    </p>
                                    <button
                                        onClick={() => handleVnpay(booking.appointmentId)}
                                        className="bg-[#f97316] text-white px-4 py-2 rounded hover:bg-[#dc2626] transition"
                                    >
                                        Thanh toán ngay bang VNpay
                                    </button>

                                </div>


                            ) : (

                                <>


                                    <div>
                                        <h4 className="text-base font-semibold text-gray-800 mb-2">Phương thức thanh toán</h4>
                                        <p className="text-gray-600">{booking.paymentMethod}</p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="text-base font-semibold text-gray-800 mb-2">Tiến trình lịch hẹn</h4>

                                            {booking.tracking && booking.tracking.length > 0 ? (
                                                <div className="relative border-l-2 border-gray-300 pl-6 space-y-6">
                                                    {booking.tracking.map((item, index) => (
                                                        <div key={index} className="relative">
                                                            {/* Chấm tròn bên trái timeline */}
                                                            <span className="absolute -left-3 top-2 w-3 h-3 bg-blue-500 rounded-full border border-white shadow" />

                                                            <div className="bg-gray-50 p-4 rounded shadow-sm">
                                                                <p className="font-semibold text-gray-800">🟢 {item.statusName}</p>
                                                                <p className="text-sm text-gray-600">{formatDate(item.statusDate)}</p>

                                                                {item.imageUrl && (
                                                                    <div className="mt-2">
                                                                        <img style={{ width: '400px' }}
                                                                            src={item.imageUrl}
                                                                            alt={`Tracking ${index}`}
                                                                            className="w-16 h-16 object-cover rounded border"
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-500">Không có dữ liệu.</p>
                                            )}
                                        </div>

                                        <div>
                                            <h4 className="text-base font-semibold text-gray-800 mb-4">Tiến trình xử lý mẫu</h4>

                                            {booking.trackingSample && booking.trackingSample.length > 0 ? (
                                                <div className="relative border-l-2 border-gray-300 pl-6 space-y-6">
                                                    {booking.trackingSample.map((item, index) => (
                                                        <div key={index} className="relative">
                                                            {/* Chấm tròn bên trái timeline */}
                                                            <span className="absolute -left-3 top-2 w-3 h-3 bg-blue-500 rounded-full border border-white shadow" />

                                                            <div className="bg-gray-50 p-4 rounded shadow-sm">
                                                                <p className="font-semibold text-gray-800">🟢 {item.nameStatus}</p>
                                                                <p className="text-sm text-gray-600">{formatDate(item.sampleTrackingTime)}</p>

                                                                {item.imageUrl && (
                                                                    <div className="mt-2">
                                                                        <img style={{ width: '400px' }}
                                                                            src={item.imageUrl}
                                                                            alt={`Tracking ${index}`}
                                                                            className="w-16 h-16 object-cover rounded border"
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-500">Không có dữ liệu.</p>
                                            )}

                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-base font-semibold text-gray-800 mb-2">Kết quả xét nghiệm</h4>
                                        {booking.result && booking.result.length > 0 ? (
                                            <div className="space-y-4">
                                                {booking.result.map((res, idx) => (
                                                    <div key={idx} className="bg-white border rounded-lg p-4 shadow">
                                                        <p><strong>Người mẫu:</strong> {res.nameOfPerson}</p>
                                                        <p><strong>Quan hệ:</strong> {res.relationName}</p>
                                                        <p><strong>Mã mẫu:</strong> {res.samplecode}</p>
                                                        <p><strong>Kết luận:</strong> {res.conclustionResult}</p>
                                                        <p><strong>Có kết quả:</strong> {formatDate(res.resultTime)}</p>


                                                        {res.resulFilePDF && (
                                                            <div className="mt-3">
                                                                <img

                                                                    src={res.resulFilePDF}
                                                                    alt="Kết quả PDF"
                                                                    className="w-full max-w-md rounded border"
                                                                />
                                                                <a
                                                                    href={res.resulFilePDF.replace('/upload/', '/upload/fl_attachment/')}
                                                                    className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                                >
                                                                    ⬇️ dowload

                                                                </a>

                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-500">Chưa có kết quả.</p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
