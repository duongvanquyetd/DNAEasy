import React, { useEffect, useState } from 'react';
import { GetHistoryAppointment } from '../../service/appointment';
import { GetSampleByAppointmentId } from '../../service/sample';
import { GetResultByAppointmentId } from '../../service/result';
import { GetPaymentStatus, PayToview, UpdatePaymentStatus } from '../../service/payment';
import api from '../../service/api';
import '../css/HistoryBooking.css'; // Ensure this points to the CSS file with the new class names
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import { CanComment } from '../../service/Comment.js';

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
                        const [result, status,cancomment] = await Promise.all([
                            GetResultByAppointmentId({ appoinmentId: appointment.appointmentId }),
                            GetPaymentStatus(appointment.appointmentId),
                            CanComment(appointment.serviceId),
                        ]);

                        return {
                            ...appointment,
                            trackingSample: appointment.listSample[0]?.sampleTracking || [],
                            result: result.data || [],
                            status: status.data,
                            cancomment: cancomment.data,
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
        <>
            <Header />
            <div className="history-booking">
                <header>
                    <div className="header-container">
                        <h1>Lịch Sử Đặt Lịch Hẹn</h1>
                        <p>Quản lý và theo dõi các lịch hẹn xét nghiệm của bạn một cách dễ dàng</p>
                    </div>
                </header>
                <main>
                    {historyBooking.length === 0 ? (
                        <div className="no-bookings">
                            <div className="icon-container">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3>Chưa có lịch hẹn</h3>
                            <p>Hiện tại bạn chưa có lịch hẹn xét nghiệm nào.</p>
                        </div>
                    ) : (
                        <div className="booking-list">
                            {historyBooking.map((booking, index) => (
                                <div
                                    key={booking.appointmentId}
                                    className={`booking-card ${selectedAppointmentId === booking.appointmentId ? 'selected' : ''}`}
                                    onClick={() =>
                                        setSelectedAppointmentId(
                                            selectedAppointmentId === booking.appointmentId ? null : booking.appointmentId
                                        )
                                    }
                                >
                                    <div className="card-header">
                                        <div className="header-content">
                                            <div className="flex items-center gap-4">
                                                <div className="index-circle">{index + 1}</div>
                                                <div className="service-info">
                                                    <h3 className="service-name">{booking.serviceName}</h3>
                                                    <span className="service-type">{booking.typeService}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <span className={`status ${booking.status ? 'paid' : 'unpaid'}`}>
                                                    {booking.curentStatusAppointment || (booking.status ? "Đã thanh toán" : "Chưa thanh toán")}
                                                </span>
                                                <div className="toggle-details">
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                    Xem chi tiết
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="details-grid">
                                            <div className="detail-item">
                                                <div className="detail-icon customer">
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="detail-label">Khách hàng</p>
                                                    <p className="detail-value">{booking.customerName}</p>
                                                </div>
                                            </div>
                                            <div className="detail-item">
                                                <div className="detail-icon date">
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="detail-label">Ngày lấy mẫu</p>
                                                    <p className="detail-value">{formatDate(booking.dateCollect)}</p>
                                                </div>
                                            </div>
                                            <div className="detail-item">
                                                <div className="detail-icon location">
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="detail-label">Địa điểm</p>
                                                    <p className="detail-value">{booking.location}</p>
                                                </div>
                                            </div>
                                            <div className="detail-item">
                                                <div className="detail-icon email">
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="detail-label">Email</p>
                                                    <p className="detail-value">{booking.emailAppointment}</p>
                                                </div>
                                            </div>
                                            <div className="detail-item">
                                                <div className="detail-icon phone">
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="detail-label">Số điện thoại</p>
                                                    <p className="detail-value">{booking.phoneAppointment}</p>
                                                </div>
                                            </div>
                                            <div className="detail-item">
                                                <div className="detail-icon note">
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="detail-label">Ghi chú</p>
                                                    <p className="detail-value">{booking.note || 'Không có'}</p>
                                                </div>
                                                {booking.cancomment  && (
                                                        <a href={`/service/${booking.serviceId}`} className="comment-button">
                                                            Comment
                                                        </a>
                                                    )}
                                        
                                            </div>


                                        </div>
                                        {rolename === "STAFF_RECEPTION" && (
                                            <div className="staff-section">
                                                <button
                                                    onClick={() => handleCash(booking)}
                                                    className="cash-button"
                                                >
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    Thanh toán bằng tiền mặt
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    {selectedAppointmentId === booking.appointmentId && (
                                        <div className="expanded-details">
                                            {!booking.status && rolename === "CUSTOMER" && booking.curentStatusAppointment === "COMPLETE" ? (
                                                <div className="payment-warning">
                                                    <div className="warning-content">
                                                        <div className="warning-icon">
                                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <h4 className="warning-title">Cần thanh toán</h4>
                                                            <p className="warning-text">Vui lòng thanh toán để hoàn tất quy trình.</p>
                                                            <button
                                                                onClick={() => handleVnpay(booking.appointmentId)}
                                                                className="vnpay-button"
                                                            >
                                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                                </svg>
                                                                Thanh toán bằng VNPay
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-6">
                                                    <div className="payment-method">
                                                        <div className="method-header">
                                                            <div className="method-icon">
                                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                                </svg>
                                                            </div>
                                                            <h4 className="method-title">Phương thức thanh toán</h4>
                                                        </div>
                                                        <p >



                                                            {booking.paymentMethod === 'Cash' || booking.paymentMethod === 'VNPay' ? (
                                                                <img src={booking.paymentMethod === 'VNPay' ? "https://s-vnba-cdn.aicms.vn/vnba-media/23/8/16/vnpay-logo_64dc3da9d7a11.jpg" : "https://www.creativefabrica.com/wp-content/uploads/2021/09/15/Money-finance-cash-payment-icon-Graphics-17346742-1.jpg"} alt={booking.paymentMethod} style={{ maxWidth: '150px' }} />
                                                            ) : (
                                                                <span className="method-value">{booking.paymentMethod}</span>
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="tracking-grid">
                                                        <div className="tracking-section">
                                                            <div className="tracking-header">
                                                                <div className="tracking-icon appointment">
                                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                                    </svg>
                                                                </div>
                                                                <h4 className="tracking-title">Tiến trình lịch hẹn</h4>
                                                            </div>
                                                            {booking.tracking && booking.tracking.length > 0 ? (
                                                                <div className="space-y-4">
                                                                    {booking.tracking.map((item, index) => (
                                                                        <div key={index} className="tracking-item">
                                                                            <div className="status-dot appointment"></div>
                                                                            <div className="status-content">
                                                                                <p className="status-name">{item.statusName}</p>
                                                                                <p className="status-date">{formatDate(item.statusDate)}</p>
                                                                                {item.imageUrl && (
                                                                                    <img
                                                                                        src={item.imageUrl}
                                                                                        alt={`Tracking ${index}`}
                                                                                        className="tracking-image"
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div className="no-tracking">
                                                                    <div className="icon-container">
                                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                        </svg>
                                                                    </div>
                                                                    <p>Không có dữ liệu tiến trình</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="tracking-section">
                                                            <div className="tracking-header">
                                                                <div className="tracking-icon sample">
                                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                                                    </svg>
                                                                </div>
                                                                <h4 className="tracking-title">Tiến trình xử lý mẫu</h4>
                                                            </div>
                                                            {booking.trackingSample && booking.trackingSample.length > 0 ? (
                                                                <div className="space-y-4">
                                                                    {booking.trackingSample.map((item, index) => (
                                                                        <div key={index} className="tracking-item">
                                                                            <div className="status-dot sample"></div>
                                                                            <div className="status-content">
                                                                                <p className="status-name">{item.nameStatus}</p>
                                                                                <p className="status-date">{formatDate(item.sampleTrackingTime)}</p>
                                                                                {item.imageUrl && (
                                                                                    <img
                                                                                        src={item.imageUrl}
                                                                                        alt={`Tracking ${index}`}
                                                                                        className="tracking-image"
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div className="no-tracking">
                                                                    <div className="icon-container">
                                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                        </svg>
                                                                    </div>
                                                                    <p>Không có dữ liệu tiến trình mẫu</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="tracking-section full-width">
                                                            <div className="tracking-header">
                                                                <div className="tracking-icon result">
                                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                    </svg>
                                                                </div>
                                                                <h4 className="tracking-title">Kết quả xét nghiệm</h4>
                                                            </div>
                                                            {booking.result && booking.result.length > 0 ? (
                                                                <div className="space-y-4">
                                                                    {booking.result.map((res, idx) => (
                                                                        <div key={idx} className="tracking-item full-width">
                                                                            <div className="status-dot result"></div>
                                                                            <div className="status-content full-width">
                                                                                <p className="status-name"><strong>Người lấy mẫu:</strong> {res.nameOfPerson}</p>
                                                                                <p className="status-name"><strong>Quan hệ:</strong> {res.relationName}</p>
                                                                                <p className="status-name"><strong>Mã mẫu:</strong> {res.samplecode}</p>
                                                                                <p className="status-name"><strong>Kết luận:</strong> {res.conclustionResult}</p>
                                                                                <p className="status-date"><strong>Có kết quả:</strong> {formatDate(res.resultTime)}</p>
                                                                                {res.resulFilePDF && (
                                                                                    <div className="mt-33 w-full">
                                                                                        <img style={{ maxWidth: '800px' }}
                                                                                            src={res.resulFilePDF}

                                                                                            alt="Kết quả PDF"
                                                                                            className="tracking-image result-image w-full"
                                                                                        />
                                                                                        <div>
                                                                                            <a
                                                                                                href={res.resulFilePDF.replace('/upload/', '/upload/fl_attachment/')}
                                                                                                className="download-button"
                                                                                            >
                                                                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="inline-block w-5 h-5 mr-2">
                                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                                                                </svg>
                                                                                                Tải xuống
                                                                                            </a>

                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div className="no-tracking">
                                                                    <div className="icon-container">
                                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                        </svg>
                                                                    </div>
                                                                    <p>Chưa có kết quả.</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </>
    );
};