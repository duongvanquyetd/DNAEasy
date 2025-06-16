import React, { useEffect, useState } from 'react';
import { GetHistoryAppointment } from '../../service/appointment';
import { GetSampleByAppointmentId } from '../../service/sample';
import { GetResultByAppointmentId } from '../../service/result';
import { GetPaymentStatus, PayToview, UpdatePaymentStatus } from '../../service/payment';
import api from '../../service/api';

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
                            status: status.data,
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
                window.location.href = response.data;
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
        };
        UpdatePaymentStatus(Updatepayment).then((response) => {
            console.log("update", response.data);
            window.location.reload();
        }).catch((error) => {
            console.log(error.data);
        });
    }

    const formatDate = (date) => new Date(date).toLocaleString();

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-center">Lịch Hẹn Của Bạn</h1>
            </header>
            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {historyBooking.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg">Bạn chưa có lịch hẹn nào.</p>
                ) : (
                    <div className="grid gap-6">
                        {historyBooking.map((booking) => (
                            <div
                                key={booking.appointmentId}
                                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
                                    selectedAppointmentId === booking.appointmentId ? 'ring-2 ring-blue-500' : ''
                                }`}
                                onClick={() =>
                                    setSelectedAppointmentId(
                                        selectedAppointmentId === booking.appointmentId ? null : booking.appointmentId
                                    )
                                }
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xl font-semibold text-blue-700">
                                            {booking.serviceName} ({booking.typeService})
                                        </h3>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            booking.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {booking.curentStatusAppointment || (booking.status ? "Đã thanh toán" : "Chưa thanh toán")}
                                        </span>
                                    </div>
                                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                                        <p><strong>Khách hàng:</strong> {booking.customerName}</p>
                                        <p><strong>Ngày lấy mẫu:</strong> {formatDate(booking.dateCollect)}</p>
                                        <p><strong>Địa điểm:</strong> {booking.location}</p>
                                        <p><strong>Email:</strong> {booking.emailAppointment}</p>
                                        <p><strong>Phone:</strong> {booking.phoneAppointment}</p>
                                        <p><strong>Ghi chú:</strong> {booking.note || 'Không có'}</p>
                                    </div>
                                    {rolename === "STAFF_RECEPTION" && (
                                        <button
                                            onClick={() => handleCash(booking)}
                                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                        >
                                            Thanh toán bằng tiền mặt
                                        </button>
                                    )}
                                </div>
                                {selectedAppointmentId === booking.appointmentId && (
                                    <div className="bg-gray-50 p-6 border-t border-gray-200">
                                        {!booking.status && rolename === "CUSTOMER" && booking.curentStatusAppointment === "COMPLETE" ? (
                                            <div className="bg-yellow-50 p-4 rounded-md">
                                                <p className="text-yellow-800 font-medium">Bạn chưa thanh toán cho lịch hẹn này.</p>
                                                <button
                                                    onClick={() => handleVnpay(booking.appointmentId)}
                                                    className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                                                >
                                                    Thanh toán ngay bằng VNPay
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="mb-6">
                                                    <h4 className="text-lg font-semibold text-gray-800">Phương thức thanh toán</h4>
                                                    <p className="text-gray-600">{booking.paymentMethod || 'Chưa xác định'}</p>
                                                </div>
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                    <div>
                                                        <h4 className="text-lg font-semibold text-gray-800">Tiến trình lịch hẹn</h4>
                                                        {booking.tracking && booking.tracking.length > 0 ? (
                                                            <div className="mt-2 space-y-4">
                                                                {booking.tracking.map((item, index) => (
                                                                    <div key={index} className="flex items-start">
                                                                        <span className="w-3 h-3 bg-blue-500 rounded-full mt-1 mr-3"></span>
                                                                        <div>
                                                                            <p className="font-medium text-gray-800">{item.statusName}</p>
                                                                            <p className="text-sm text-gray-600">{formatDate(item.statusDate)}</p>
                                                                            {item.imageUrl && (
                                                                                <img
                                                                                    src={item.imageUrl}
                                                                                    alt={`Tracking ${index}`}
                                                                                    className="mt-2 w-full max-w-xs rounded-md"
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <p className="text-gray-600">Không có dữ liệu.</p>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-semibold text-gray-800">Tiến trình xử lý mẫu</h4>
                                                        {booking.trackingSample && booking.trackingSample.length > 0 ? (
                                                            <div className="mt-2 space-y-4">
                                                                {booking.trackingSample.map((item, index) => (
                                                                    <div key={index} className="flex items-start">
                                                                        <span className="w-3 h-3 bg-blue-500 rounded-full mt-1 mr-3"></span>
                                                                        <div>
                                                                            <p className="font-medium text-gray-800">{item.nameStatus}</p>
                                                                            <p className="text-sm text-gray-600">{formatDate(item.sampleTrackingTime)}</p>
                                                                            {item.imageUrl && (
                                                                                <img
                                                                                    src={item.imageUrl}
                                                                                    alt={`Tracking ${index}`}
                                                                                    className="mt-2 w-full max-w-xs rounded-md"
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <p className="text-gray-600">Không có dữ liệu.</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="mt-6">
                                                    <h4 className="text-lg font-semibold text-gray-800">Kết quả xét nghiệm</h4>
                                                    {booking.result && booking.result.length > 0 ? (
                                                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            {booking.result.map((res, idx) => (
                                                                <div key={idx} className="bg-white p-4 rounded-md shadow-sm">
                                                                    <p><strong>Người mẫu:</strong> {res.nameOfPerson}</p>
                                                                    <p><strong>Quan hệ:</strong> {res.relationName}</p>
                                                                    <p><strong>Mã mẫu:</strong> {res.samplecode}</p>
                                                                    <p><strong>Kết luận:</strong> {res.conclustionResult}</p>
                                                                    <p><strong>Có kết quả:</strong> {formatDate(res.resultTime)}</p>
                                                                    {res.resulFilePDF && (
                                                                        <div className="mt-2">
                                                                            <img
                                                                                src={res.resulFilePDF}
                                                                                alt="Kết quả PDF"
                                                                                className="w-full max-w-xs rounded-md"
                                                                            />
                                                                            <a
                                                                                href={res.resulFilePDF.replace('/upload/', '/upload/fl_attachment/')}
                                                                                className="mt-2 inline-block text-blue-600 hover:underline"
                                                                            >
                                                                                ⬇️ Tải xuống
                                                                            </a>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <p className="text-gray-600">Chưa có kết quả.</p>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};