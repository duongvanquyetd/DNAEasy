import React, { useEffect, useState } from 'react';
import { GetHistoryAppointment } from '../../service/appointment';
import { GetResultByAppointmentId } from '../../service/result';
import { GetPaymentStatus, PayToview } from '../../service/payment';
import '../css/HistoryBooking.css';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import { CanComment } from '../../service/Comment.js';
import HardResultModal from './HardResultModal.jsx';
import { CanConfirm, UpdateHardResult } from '../../service/hardresult.js';

export const HistoryBooking = () => {
    const [historyBooking, setHistoryBooking] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
 
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const rolename = localStorage.getItem('rolename') || null;
    const [createHardResult, setCreateHardResult] = useState(false);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 2;// maii mot sua thanh 5 booking 1 trang
    const [totalPages, setTotalPages] = useState(0);
    const [keysearch, setkeysearch] = useState('');
    useEffect(() => {
        const fetchHistoryBooking = async () => {
            try {
                const response = await GetHistoryAppointment(currentPage,pageSize,keysearch);
                const appointmentData = response.data.content;
                console.log("Response data",response.data)
                setTotalPages(response.data.totalPages)
                const fullAppointments = await Promise.all(
                    appointmentData.map(async (appointment) => {
                        const [result, status, cancomment] = await Promise.all([
                            GetResultByAppointmentId({ appoinmentId: appointment.appointmentId }),
                            GetPaymentStatus(appointment.appointmentId),
                            CanComment(appointment.serviceId),
                        ]);
                        const hardresultID = result.data?.[0]?.hardresultID;
                        const canconfirm = hardresultID ? await CanConfirm(hardresultID) : { data: null };

                        // Derive sampleCollectMethod based on location or a new field (example logic)
                        const sampleCollectMethod = appointment.location === 'Tại nhà' ? 'Tại nhà tự lấy' : 'Bệnh viện';

                        return {
                            ...appointment,
                            trackingSample: appointment.listSample[0]?.sampleTracking || [],
                            result: result.data || [],
                            status: status.data,
                            cancomment: cancomment.data,
                            trackingReuslt: result.data && result.data[0] && result.data[0].tracking ? result.data[0].tracking : '',
                            canconfirm: canconfirm.data,
                            sampleCollectMethod, // Added new field
                        };
                    })
                );
                setHistoryBooking(fullAppointments);
                setFilteredBookings(fullAppointments);
            } catch (error) {
                console.error('Error fetching history booking:', error);
            }
        };
        fetchHistoryBooking();
    }, [currentPage,keysearch]);

    // useEffect(() => {
    //     const filtered = historyBooking.filter(booking =>
    //         booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         booking.appointmentId.toString().includes(searchQuery)
    //     );
    //     setFilteredBookings(filtered);
    // }, [searchQuery, historyBooking]);

    const handleVnpay = (appointmentId) => {
        PayToview(appointmentId)
            .then((response) => {
                window.location.href = response.data;
            })
            .catch((error) => {
                console.error("Error fetching payment data:", error);
                alert("Có lỗi xảy ra khi lấy thông tin thanh toán.");
            });
    };

    const formatDate = (date) => new Date(date).toLocaleString();
    const renderPagination = (total, current, setPage) => (
        <div className="pagination">
            {Array.from({ length: total }, (_, i) => i + 1).map((i) => (
                <button
                    key={i}
                    className={`page-button ${i === current ? 'active' : ''}`}
                    onClick={() => setPage(i)}
                >
                    {i}
                </button>
            ))}
        </div>
    );
    return (
        <>
            <Header />
            <div className="history-booking">
                <header className="header-bg">
                    <div className="header-container">
                        <h1 className="header-title">Lịch Sử Đặt Lịch Hẹn</h1>
                        <p className="header-subtitle">Theo dõi và quản lý các lịch hẹn xét nghiệm một cách dễ dàng</p>
                    </div>
                </header>
                <main className="main-container">
                    <div className='search-bar-wrapper'>
                        <form
                            className="search-bar-form"
                            onSubmit={e => {
                                e.preventDefault();
                                setCurrentPage(1);
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Tìm kiếm lịch hẹn..."
                                value={keysearch}
                                onChange={e => {
                                    setkeysearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="search-input"
                            />
                            <button type="submit" className="searchBtn">
                                <span className="search-icon" aria-hidden="true">
                                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                        <circle cx="11" cy="11" r="8" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    </svg>
                                </span>
                                Tìm kiếm
                            </button>
                        </form>
                    </div>
                    {filteredBookings.length === 0 ? (
                        <div className="no-bookings">
                            <svg className="no-bookings-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <h3 className="no-bookings-title">Chưa có lịch hẹn</h3>
                            <p className="no-bookings-text">Không tìm thấy lịch hẹn nào khớp với tìm kiếm của bạn.</p>
                        </div>
                    ) : (
                        <div className="booking-list">
                            {filteredBookings.map((booking, index) => (
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
                                            <div className="service-info">
                                                <span className="index-circle">{index + 1}</span>
                                                <h3 className="service-name">{booking.serviceName}</h3>
                                                <span className="service-type">{booking.typeService}</span>
                                            </div>
                                            <div className="status-info">
                                                <span className={`status ${booking.status ? 'paid' : 'unpaid'}`}>
                                                    {booking.curentStatusAppointment || (booking.status ? "Đã thanh toán" : "Chưa thanh toán")}
                                                </span>
                                                <span className="toggle-details">
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="date-info">
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>{formatDate(booking.dateCollect)}</span>
                                        </div>
                                        <div className="sample-info">
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                            </svg>
                                            <span>Sample Collect: {booking.sampleCollectMethod || 'Không xác định'}</span>
                                        </div>
                                    </div>
                                    {selectedAppointmentId === booking.appointmentId && (
                                        <div className="card-body">
                                            {/* Basic details always visible */}
                                            <div className="details-grid">
                                                <div className="detail-item">
                                                    <span className="detail-label">Khách hàng:</span>
                                                    <span className="detail-value">{booking.customerName}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">Địa điểm:</span>
                                                    <span className="detail-value">{booking.location}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">Email:</span>
                                                    <span className="detail-value">{booking.emailAppointment}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">Số điện thoại:</span>
                                                    <span className="detail-value">{booking.phoneAppointment}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">Ghi chú:</span>
                                                    <span className="detail-value">{booking.note || 'Không có'}</span>
                                                </div>
                                                <div className="detail-item">
                                                    {booking.status && booking.cancomment && (
                                                        <a href={`/service/${booking.serviceId}`} className="comment-button">
                                                            Comment
                                                        </a>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Payment warning if not paid and customer role with complete status */}
                                            {!booking.status && rolename === "CUSTOMER" && booking.curentStatusAppointment === "COMPLETE" && (
                                                <div className="payment-warning">
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                                    </svg>
                                                    <div>
                                                        <h4>Cần thanh toán</h4>
                                                        <p>Vui lòng thanh toán để hoàn tất quy trình.</p>
                                                        <button onClick={() => handleVnpay(booking.appointmentId)} className="vnpay-button">
                                                            Thanh toán bằng VNPay
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Full details only visible after payment */}
                                            {booking.status && (
                                                <>
                                                    <div className="payment-info">
                                                        <h4>Phương thức thanh toán</h4>
                                                        <p>
                                                            {booking.paymentMethod === 'VNPay' ? (
                                                                <img src="https://s-vnba-cdn.aicms.vn/vnba-media/23/8/16/vnpay-logo_64dc3da9d7a11.jpg" alt="VNPay" className="payment-logo" />
                                                            ) : booking.paymentMethod === 'Cash' ? (
                                                                <img src="https://www.creativefabrica.com/wp-content/uploads/2021/09/15/Money-finance-cash-payment-icon-Graphics-17346742-1.jpg" alt="Cash" className="payment-logo" />
                                                            ) : (
                                                                booking.paymentMethod
                                                            )}
                                                        </p>
                                                        <p className="payment-amount">{booking.paymentAmount?.toLocaleString('vi-VN')} VNĐ</p>
                                                    </div>
                                                    <div className="tracking-grid">
                                                        <div className="tracking-section">
                                                            <h4>Tiến trình lịch hẹn</h4>
                                                            {booking.tracking?.length > 0 ? (
                                                                booking.tracking.map((track, idx) => (
                                                                    <div key={idx} className="tracking-item">
                                                                        <span className="status-dot appointment" />
                                                                        <div>
                                                                            <p>{track.statusName}</p>
                                                                            <span>{formatDate(track.statusDate)}</span>
                                                                            {track.imageUrl && <img src={track.imageUrl} alt="Track" className="tracking-image" />}
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <p>Không có dữ liệu.</p>
                                                            )}
                                                        </div>
                                                        <div className="tracking-section">
                                                            <h4>Tiến trình xử lý mẫu</h4>
                                                            {booking.trackingSample?.length > 0 ? (
                                                                booking.trackingSample.map((track, idx) => (
                                                                    <div key={idx} className="tracking-item">
                                                                        <span className="status-dot sample" />
                                                                        <div>
                                                                            <p>{track.nameStatus}</p>
                                                                            <span>{formatDate(track.sampleTrackingTime)}</span>
                                                                            {track.imageUrl && <img src={track.imageUrl} alt="Track" className="tracking-image" />}
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <p>Không có dữ liệu.</p>
                                                            )}
                                                        </div>
                                                        <div className="tracking-section">
                                                            <h4>Kết quả xét nghiệm</h4>
                                                            {booking.result?.length > 0 ? (
                                                                booking.result.map((res, idx) => (
                                                                    <div key={idx} className="tracking-item">
                                                                        <span className="status-dot result" />
                                                                        <div>
                                                                            <p><strong>Người lấy mẫu:</strong> {res.nameOfPerson}</p>
                                                                            {res.relationName && <p><strong>Quan hệ:</strong> {res.relationName}</p>}
                                                                            <p><strong>Mã mẫu:</strong> {res.samplecode}</p>
                                                                            {res.conclustionResult && <p><strong>Kết luận:</strong> {res.conclustionResult}</p>}
                                                                            <p><strong>Có kết quả:</strong> {formatDate(res.resultTime)}</p>
                                                                            {res.resulFilePDF && (
                                                                                <>
                                                                                    <img src={res.resulFilePDF} alt="Kết quả PDF" className="result-image" />
                                                                                    <a href={res.resulFilePDF.replace('/upload/', '/upload/fl_attachment/')} className="download-button">
                                                                                        Tải xuống
                                                                                    </a>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <p>Chưa có kết quả.</p>
                                                            )}
                                                            {rolename === "CUSTOMER" && booking.result[0]?.hardresultID === null && (
                                                                <button
                                                                    className="receive-hard-result-btn"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setCreateHardResult(true);
                                                                    }}
                                                                >
                                                                    Receive Hard Result
                                                                </button>
                                                            )}
                                                            <HardResultModal
                                                                isOpen={createHardResult}
                                                                onClose={() => setCreateHardResult(false)}
                                                                resultlist={booking.result}
                                                            />
                                                        </div>
                                                    </div>
                                                    {booking.canconfirm?.canConfirmHardResult && (
                                                        <button
                                                            className="comment-button"
                                                            onClick={() => setShowUploadForm(booking)}
                                                        >
                                                            {booking.canconfirm.nextStatus}
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    {showUploadForm && (
                        <div className="overlay-upload">
                            <div className="upload-box">
                                <h3>Upload Image Confirm</h3>
                                <input
                                    type="file"
                                    accept="image/*"
                                    required
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                    className="upload-input"
                                />
                                <button
                                    onClick={() => {
                                        if (!imageFile) return alert("Vui lòng chọn ảnh.");
                                        const formData = new FormData();
                                        const update = {
                                            statusName: showUploadForm.canconfirm.nextStatus,
                                            hardresultID: showUploadForm.result[0].hardresultID
                                        };
                                        formData.append("hardresult", new Blob([JSON.stringify(update)], { type: "application/json" }));
                                        formData.append("file", imageFile);
                                        UpdateHardResult(formData)
                                            .then(() => {
                                                window.location.reload();
                                            })
                                            .catch((error) => {
                                                console.error("Error:", error);
                                            });
                                        setShowUploadForm(false);
                                    }}
                                    className="upload-button"
                                >
                                    Upload
                                </button>
                            </div>
                        </div>
                    )}
                </main>
                {renderPagination(totalPages, currentPage, setCurrentPage)}
            </div>
            <Footer />
        </>
    );
};