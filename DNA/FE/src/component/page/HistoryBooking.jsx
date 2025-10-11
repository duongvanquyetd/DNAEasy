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
import { useNavigate, useParams } from 'react-router-dom';

export const HistoryBooking = () => {
    const [historyBooking, setHistoryBooking] = useState([]);
    const [zoomImage, setZoomImage] = useState(null);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const { appointmentId } = useParams();
    const navigate = useNavigate();
    const rolename = localStorage.getItem('rolename') || null;
    const [createHardResult, setCreateHardResult] = useState(false);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;// maii mot sua thanh 5 booking 1 trang
    const [totalPages, setTotalPages] = useState(0);
    const [keysearch, setkeysearch] = useState('');
    useEffect(() => {
        const fetchHistoryBooking = async () => {
            try {
                const response = await GetHistoryAppointment(currentPage, pageSize, keysearch);
                const appointmentData = response.data.content;
                console.log("Response data", response.data)
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



                        return {
                            ...appointment,
                            trackingSample: appointment.listSample[0]?.sampleTracking || [],
                            result: result.data || [],
                            status: status.data,
                            cancomment: cancomment.data,
                            trackingReuslt: result.data && result.data[0] && result.data[0].tracking ? result.data[0].tracking : '',
                            canconfirm: canconfirm.data,

                        };
                    })
                );

                console.log("full history appointment", fullAppointments)
                setHistoryBooking(fullAppointments);

            } catch (error) {
                console.error('Error fetching history booking:', error);
            }
        };
        fetchHistoryBooking();
    }, [currentPage, keysearch]);

    // Khi có appointmentId trên URL, tự động chọn booking tương ứng
    useEffect(() => {
        if (appointmentId && historyBooking.length > 0) {
            setSelectedAppointmentId(Number(appointmentId));
        } else {
            setSelectedAppointmentId(null);
        }
    }, [appointmentId, historyBooking]);

    const handleVnpay = (appointmentId) => {

        localStorage.setItem("id", appointmentId);
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
                        <h1 className="header-title">Appointment History</h1>
                        <p className="header-subtitle">Track and manage your test appointments easily</p>
                    </div>
                </header>
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
                            placeholder="Search appointments..."
                            value={keysearch}
                            onChange={e => {
                                setkeysearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="search-input"
                        />
                        <button type="submit" className="searchBtn">
                            <span className="search-icon" aria-hidden="true">
                                {/* ...icon... */}
                            </span>
                            Search
                        </button>
                    </form>
                </div>

                <main className="main-container">

                    {historyBooking.length === 0 ? (
                        <div className="no-bookings">
                            <svg className="no-bookings-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {/* ...icon... */}
                            </svg>
                            <h3 className="no-bookings-title">No appointments</h3>
                            <p className="no-bookings-text">No appointments found matching your search.</p>
                        </div>
                    ) : (
                        <div className="booking-list">
                            {historyBooking.map((booking, index) => (

                                <div
                                    key={booking.appointmentId}
                                    className={`booking-card ${selectedAppointmentId === booking.appointmentId ? 'selected' : ''}`}
                                    onClick={() => navigate(`/historybooking/${booking.appointmentId}`)}
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
                                                    {booking.curentStatusAppointment === "CANCLE"
                                                        ? "CANCELLED"
                                                        : (!booking.status ? "PENDING" : (booking.curentStatusAppointment || "Paid"))}
                                                </span>
                                                <span className="toggle-details">
                                                </span>
                                            </div>
                                        </div>
                                        <div className="date-info">
                                            <span style={{ marginRight: 6, verticalAlign: 'middle' }}>
                                                {/* Calendar icon */}
                                                <svg width="18" height="18" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                    <rect x="3" y="4" width="18" height="16" rx="3" />
                                                    <path d="M16 2v4M8 2v4M3 10h18" />
                                                </svg>
                                            </span>
                                            <span>{formatDate(booking.dateCollect)}</span>
                                        </div>
                                        <div className="sample-info">
                                            <span style={{ marginRight: 6, verticalAlign: 'middle' }}>
                                                {/* Flask/sample icon */}
                                                <svg width="18" height="18" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                    <path d="M6 2v6m12-6v6M6 8h12M6 8v8a6 6 0 0 0 12 0V8" />
                                                </svg>
                                            </span>
                                            <span>Sample Collect: {booking.typeCollect || 'Unknown'}</span>
                                        </div>
                                    </div>
                                    {selectedAppointmentId === booking.appointmentId && (
                                        <div className="card-body">
                                            {/* Basic details always visible */}
                                            <div className="details-grid">
                                                <div className="detail-item">
                                                    <span className="detail-label">
                                                        {/* User icon */}
                                                        <svg width="16" height="16" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4, verticalAlign: 'middle' }} viewBox="0 0 24 24">
                                                            <circle cx="12" cy="7" r="4" />
                                                            <path d="M5.5 21a7.5 7.5 0 0 1 13 0" />
                                                        </svg>
                                                        Customer:
                                                    </span>
                                                    <span className="detail-value">{booking.customerName}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">
                                                        {/* Location/Map icon */}
                                                        <svg width="16" height="16" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4, verticalAlign: 'middle' }} viewBox="0 0 24 24">
                                                            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
                                                            <circle cx="12" cy="10" r="3" />
                                                        </svg>
                                                        Location:
                                                    </span>
                                                    <span className="detail-value">{booking.location}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">
                                                        {/* Email icon */}
                                                        <svg width="16" height="16" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4, verticalAlign: 'middle' }} viewBox="0 0 24 24">
                                                            <rect x="3" y="5" width="18" height="14" rx="2" />
                                                            <polyline points="3 7 12 13 21 7" />
                                                        </svg>
                                                        Email:
                                                    </span>
                                                    <span className="detail-value">{booking.emailAppointment}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">
                                                        {/* Phone icon */}
                                                        <svg width="16" height="16" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4, verticalAlign: 'middle' }} viewBox="0 0 24 24">
                                                            <path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.05a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.98.35 2 .59 3.05.72A2 2 0 0 1 22 16.92z" />
                                                        </svg>
                                                        Phone:
                                                    </span>
                                                    <span className="detail-value">{booking.phoneAppointment}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">
                                                        {/* Note icon */}
                                                        <svg width="16" height="16" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4, verticalAlign: 'middle' }} viewBox="0 0 24 24">
                                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                                        </svg>
                                                        Note:
                                                    </span>
                                                    <span className="detail-value">{booking.note || 'None'}</span>
                                                </div>
                                                <div className="detail-item">
                                                    {booking.status && booking.cancomment && (
                                                        <a href={`/service/${booking.serviceId}`} className="comment-button">
                                                            {/* Comment icon */}
                                                            <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4, verticalAlign: 'middle' }} viewBox="0 0 24 24">
                                                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                                            </svg>
                                                            Comment
                                                        </a>
                                                    )}
                                                </div>
                                            </div>


                                            {/* Payment warning if not paid and customer role with complete status */}
                                            {!booking.status && rolename === "CUSTOMER" && booking.curentStatusAppointment === "COMPLETE" && (
                                                <div className="payment-warning">
                                                    {/* ...icon... */}
                                                    <div>
                                                        <h4>Payment required</h4>
                                                        <p>Please make payment to complete the process.</p>
                                                        <button onClick={() => handleVnpay(booking.appointmentId)} className="vnpay-button">
                                                            Pay with VNPay
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Full details only visible after payment */}

                                            <div className="payment-info">
                                                <h4>Payment Method</h4>

                                                <div>
                                                    <p >
                                                        {booking.paymentMethod === 'VNPay' ? (
                                                            <img src="https://s-vnba-cdn.aicms.vn/vnba-media/23/8/16/vnpay-logo_64dc3da9d7a11.jpg" alt="VNPay" className="payment-logo" />
                                                        ) : booking.paymentMethod === 'Cash' ? (
                                                            <img src="https://www.creativefabrica.com/wp-content/uploads/2021/09/15/Money-finance-cash-payment-icon-Graphics-17346742-1.jpg" alt="Cash" className="payment-logo" />
                                                        ) : (
                                                            booking.paymentMethod
                                                        )}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="payment-amount">({booking.paymentAmount?.toLocaleString('vi-VN')} VND)</p>
                                                </div>
                                            </div>

                                            <div className="tracking-grid">
                                                {/* Appointment Progress Timeline */}
                                                <div className="tracking-section timeline-section">
                                                    <h4>
                                                        <span style={{ marginRight: 6, verticalAlign: 'middle' }}>
                                                            {/* ...icon... */}
                                                        </span>
                                                        Appointment Progress
                                                    </h4>
                                                    <div className="timeline">
                                                        {booking.tracking?.length > 0 ? (
                                                            booking.tracking.map((track, idx) => (
                                                                <div key={idx} className="timeline-item">
                                                                    <div className="timeline-dot appointment">
                                                                        {/* ...icon... */}
                                                                    </div>
                                                                    <div className="timeline-content">
                                                                        <div className="timeline-title">{track.statusName}</div>
                                                                        <div className="timeline-date">{formatDate(track.statusDate)}</div>
                                                                        {track.imageUrl && <img onClick={e => {
                                                                            e.stopPropagation();
                                                                            setZoomImage(track.imageUrl);
                                                                        }} src={track.imageUrl} alt="Track" className="tracking-image" />}
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="timeline-empty">No data.</div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Sample Processing Progress Timeline */}
                                                <div className="tracking-section timeline-section">
                                                    <h4>
                                                        <span style={{ marginRight: 6, verticalAlign: 'middle' }}>
                                                            {/* ...icon... */}
                                                        </span>
                                                        Sample Processing Progress
                                                    </h4>
                                                    <div className="timeline">
                                                        {booking.trackingSample?.length > 0 ? (
                                                            booking.trackingSample.map((track, idx) => (
                                                                <div key={idx} className="timeline-item">
                                                                    <div className="timeline-dot sample">
                                                                        {/* ...icon... */}
                                                                    </div>
                                                                    <div className="timeline-content">
                                                                        <div className="timeline-title">{track.nameStatus}</div>
                                                                        <div className="timeline-date">{formatDate(track.sampleTrackingTime)}</div>
                                                                        {track.imageUrl && <img onClick={e => {
                                                                            e.stopPropagation();
                                                                            setZoomImage(track.imageUrl);
                                                                        }} src={track.imageUrl} alt="Track" className="tracking-image" />}
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="timeline-empty">No data.</div>
                                                        )}
                                                    </div>
                                                </div>
                                                {booking.status && (
                                                    <>
                                                        <div className="test-result-section">
                                                            <h4 className="test-result-title">
                                                                {/* ...icon... */}
                                                                Test Result
                                                            </h4>
                                                            {booking.result?.length > 0 ? (
                                                                <div className="test-result-list">
                                                                    {booking.result.map((res, idx) => (
                                                                        <div key={idx} className="test-result-card">
                                                                            <div className="test-result-header">
                                                                                <span className="test-result-icon">
                                                                                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                                        <circle cx="12" cy="12" r="10" />
                                                                                        <path d="M9 12l2 2 4-4" />
                                                                                    </svg>
                                                                                </span>
                                                                                <span className="test-result-label-main">Result #{idx + 1}</span>
                                                                            </div>
                                                                            <div className="test-result-body">
                                                                                <div className="test-result-row">
                                                                                    <span className="test-result-label">Collector:</span>
                                                                                    <span className="test-result-value">{res.nameOfPerson}</span>
                                                                                </div>
                                                                                {res.relationName && (
                                                                                    <div className="test-result-row">
                                                                                        <span className="test-result-label">Relation:</span>
                                                                                        <span className="test-result-value">{res.relationName}</span>
                                                                                    </div>
                                                                                )}
                                                                                <div className="test-result-row">
                                                                                    <span className="test-result-label">Sample Code:</span>
                                                                                    <span className="test-result-value">{res.samplecode}</span>
                                                                                </div>
                                                                                {res.conclustionResult && (
                                                                                    <div className="test-result-row">
                                                                                        <span className="test-result-label">Conclusion:</span>
                                                                                        <span className="test-result-value">{res.conclustionResult}</span>
                                                                                    </div>
                                                                                )}
                                                                                <div className="test-result-row">
                                                                                    <span className="test-result-label">Result Time:</span>
                                                                                    <span className="test-result-value">{formatDate(res.resultTime)}</span>
                                                                                </div>
                                                                                {res.resulFilePDF && (
                                                                                    <div className="test-result-row" style={{ marginTop: 8 }}>
                                                                                        <img
                                                                                            src={res.resulFilePDF}
                                                                                            alt="Result"
                                                                                            className="result-image zoomable-image"
                                                                                            style={{ maxWidth: 120, borderRadius: 8, boxShadow: '0 2px 8px #2563eb22', cursor: 'pointer' }}
                                                                                            onClick={e => {
                                                                                                e.stopPropagation();
                                                                                                setZoomImage(res.resulFilePDF);
                                                                                            }}
                                                                                        />
                                                                                        <a href={res.resulFilePDF.replace('/upload/', '/upload/fl_attachment/')} className="download-button" style={{ marginLeft: 10 }}>
                                                                                            {/* ...icon... */}
                                                                                            Download
                                                                                        </a>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div className="timeline-empty">No result yet.</div>
                                                            )}
                                                            {rolename === "CUSTOMER" && booking.result[0]?.hardresultID === null && (
                                                                <button
                                                                    className="receive-hard-result-btn"
                                                                    onClick={e => {
                                                                        e.stopPropagation();
                                                                        setCreateHardResult(true);
                                                                    }}
                                                                >
                                                                    {/* ...icon... */}
                                                                    Receive Hard Result
                                                                </button>
                                                            )}
                                                            {booking.canconfirm?.canConfirmHardResult && (
                                                                <button
                                                                    className="comment-button"
                                                                    onClick={() => setShowUploadForm(booking)}
                                                                >
                                                                    {booking.canconfirm.nextStatus}
                                                                </button>
                                                            )}

                                                            <HardResultModal
                                                                isOpen={createHardResult}
                                                                onClose={() => setCreateHardResult(false)}
                                                                resultlist={booking.result}
                                                            />

                                                            {showUploadForm && (
                                                                <div className="overlay-upload">
                                                                    <div className="upload-box">
                                                                        <h3>Upload Confirmation Image</h3>
                                                                        <input
                                                                            type="file"
                                                                            accept="image/*"
                                                                            required
                                                                            onChange={(e) => setImageFile(e.target.files[0])}
                                                                            className="upload-input"
                                                                        />
                                                                        <button
                                                                            onClick={() => {
                                                                                if (!imageFile) return alert("Please select an image.");
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
                                                        </div>

                                                        {/* Result Delivery Progress Timeline */}
                                                        <div className="tracking-section timeline-section">
                                                            <h4>
                                                                <span style={{ marginRight: 6, verticalAlign: 'middle' }}>
                                                                    {/* ...icon... */}
                                                                </span>
                                                                Result Delivery Progress
                                                            </h4>
                                                            <div className="timeline">
                                                                {booking.trackingReuslt?.length > 0 ? (
                                                                    booking.trackingReuslt.map((track, idx) => (
                                                                        <div key={idx} className="timeline-item">
                                                                            <div className="timeline-dot appointment">
                                                                                {/* ...icon... */}
                                                                            </div>
                                                                            <div className="timeline-content">
                                                                                <div className="timeline-title">{track.statusName}</div>
                                                                                <div className="timeline-date">{formatDate(track.trackingdate)}</div>
                                                                                {track.imgUrl && <img onClick={e => {
                                                                                    e.stopPropagation();
                                                                                    setZoomImage(track.imgUrl);
                                                                                }} src={track.imgUrl} alt="Track" className="tracking-image" />}
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    <div className="timeline-empty">No data.</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Modal overlay hiển thị chi tiết booking nếu có appointmentId */}
                    {appointmentId && selectedAppointmentId && (
                        <div className="modal-overlay" onClick={() => navigate('/historybooking')}>
                            <div className="modal-content" onClick={e => e.stopPropagation()}>
                                {(() => {
                                    const booking = historyBooking.find(b => b.appointmentId === Number(appointmentId));
                                    if (!booking) return null;
                                    return (
                                        <div className="card-body">
                                            {/* Basic details always visible */}
                                            <div className="details-grid">
                                                <div className="detail-item">
                                                    <span className="detail-label">Customer:</span>
                                                    <span className="detail-value">{booking.customerName}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">Location:</span>
                                                    <span className="detail-value">{booking.location}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">Email:</span>
                                                    <span className="detail-value">{booking.emailAppointment}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">Phone:</span>
                                                    <span className="detail-value">{booking.phoneAppointment}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">Note:</span>
                                                    <span className="detail-value">{booking.note || 'None'}</span>
                                                </div>
                                                <div className="detail-item">
                                                    {booking.status && booking.cancomment && (
                                                        <a href={`/service/${booking.serviceId}`} className="comment-button">Comment</a>
                                                    )}
                                                </div>
                                            </div>
                                            {/* Payment warning if not paid and customer role with complete status */}
                                            {!booking.status && rolename === "CUSTOMER" && booking.curentStatusAppointment === "COMPLETE" && (
                                                <div className="payment-warning">
                                                    <div>
                                                        <h4>Payment required</h4>
                                                        <p>Please make payment to complete the process.</p>
                                                        <button onClick={() => handleVnpay(booking.appointmentId)} className="vnpay-button">
                                                            Pay with VNPay
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                            {/* Full details only visible after payment */}
                                            <div className="payment-info">
                                                <h4>Payment Method</h4>
                                                <div>
                                                    <p >
                                                        {booking.paymentMethod === 'VNPay' ? (
                                                            <img src="https://s-vnba-cdn.aicms.vn/vnba-media/23/8/16/vnpay-logo_64dc3da9d7a11.jpg" alt="VNPay" className="payment-logo" />
                                                        ) : booking.paymentMethod === 'Cash' ? (
                                                            <img src="https://www.creativefabrica.com/wp-content/uploads/2021/09/15/Money-finance-cash-payment-icon-Graphics-17346742-1.jpg" alt="Cash" className="payment-logo" />
                                                        ) : (
                                                            booking.paymentMethod
                                                        )}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="payment-amount">({booking.paymentAmount?.toLocaleString('vi-VN')} VND)</p>
                                                </div>
                                            </div>
                                            <div className="tracking-grid">
                                                {/* Appointment Progress Timeline */}
                                                <div className="tracking-section timeline-section">
                                                    <h4>Appointment Progress</h4>
                                                    <div className="timeline">
                                                        {booking.tracking?.length > 0 ? (
                                                            booking.tracking.map((track, idx) => (
                                                                <div key={idx} className="timeline-item">
                                                                    <div className="timeline-dot appointment"></div>
                                                                    <div className="timeline-content">
                                                                        <div className="timeline-title">{track.statusName}</div>
                                                                        <div className="timeline-date">{formatDate(track.statusDate)}</div>
                                                                        {track.imageUrl && <img onClick={e => { e.stopPropagation(); setZoomImage(track.imageUrl); }} src={track.imageUrl} alt="Track" className="tracking-image" />}
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="timeline-empty">No data.</div>
                                                        )}
                                                    </div>
                                                </div>
                                                {/* Sample Processing Progress Timeline */}
                                                <div className="tracking-section timeline-section">
                                                    <h4>Sample Processing Progress</h4>
                                                    <div className="timeline">
                                                        {booking.trackingSample?.length > 0 ? (
                                                            booking.trackingSample.map((track, idx) => (
                                                                <div key={idx} className="timeline-item">
                                                                    <div className="timeline-dot sample"></div>
                                                                    <div className="timeline-content">
                                                                        <div className="timeline-title">{track.nameStatus}</div>
                                                                        <div className="timeline-date">{formatDate(track.sampleTrackingTime)}</div>
                                                                        {track.imageUrl && <img onClick={e => { e.stopPropagation(); setZoomImage(track.imageUrl); }} src={track.imageUrl} alt="Track" className="tracking-image" />}
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="timeline-empty">No data.</div>
                                                        )}
                                                    </div>
                                                </div>
                                                {booking.status && (
                                                    <>
                                                        <div className="test-result-section">
                                                            <h4 className="test-result-title">Test Result</h4>
                                                            {booking.result?.length > 0 ? (
                                                                <div className="test-result-list">
                                                                    {booking.result.map((res, idx) => (
                                                                        <div key={idx} className="test-result-card">
                                                                            <div className="test-result-header">
                                                                                <span className="test-result-label-main">Result #{idx + 1}</span>
                                                                            </div>
                                                                            <div className="test-result-body">
                                                                                <div className="test-result-row">
                                                                                    <span className="test-result-label">Collector:</span>
                                                                                    <span className="test-result-value">{res.nameOfPerson}</span>
                                                                                </div>
                                                                                {res.relationName && (
                                                                                    <div className="test-result-row">
                                                                                        <span className="test-result-label">Relation:</span>
                                                                                        <span className="test-result-value">{res.relationName}</span>
                                                                                    </div>
                                                                                )}
                                                                                <div className="test-result-row">
                                                                                    <span className="test-result-label">Sample Code:</span>
                                                                                    <span className="test-result-value">{res.samplecode}</span>
                                                                                </div>
                                                                                {res.conclustionResult && (
                                                                                    <div className="test-result-row">
                                                                                        <span className="test-result-label">Conclusion:</span>
                                                                                        <span className="test-result-value">{res.conclustionResult}</span>
                                                                                    </div>
                                                                                )}
                                                                                <div className="test-result-row">
                                                                                    <span className="test-result-label">Result Time:</span>
                                                                                    <span className="test-result-value">{formatDate(res.resultTime)}</span>
                                                                                </div>
                                                                                {res.resulFilePDF && (
                                                                                    <div className="test-result-row" style={{ marginTop: 8 }}>
                                                                                        <img
                                                                                            src={res.resulFilePDF}
                                                                                            alt="Result"
                                                                                            className="result-image zoomable-image"
                                                                                            style={{ maxWidth: 120, borderRadius: 8, boxShadow: '0 2px 8px #2563eb22', cursor: 'pointer' }}
                                                                                            onClick={e => {
                                                                                                e.stopPropagation();
                                                                                                setZoomImage(res.resulFilePDF);
                                                                                            }}
                                                                                        />
                                                                                        <a href={res.resulFilePDF.replace('/upload/', '/upload/fl_attachment/')} className="download-button" style={{ marginLeft: 10 }}>
                                                                                            Download
                                                                                        </a>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div className="timeline-empty">No result yet.</div>
                                                            )}
                                                            {rolename === "CUSTOMER" && booking.result[0]?.hardresultID === null && (
                                                                <button
                                                                    className="receive-hard-result-btn"
                                                                    onClick={e => {
                                                                        e.stopPropagation();
                                                                        setCreateHardResult(true);
                                                                    }}
                                                                >
                                                                    Receive Hard Result
                                                                </button>
                                                            )}
                                                            {booking.canconfirm?.canConfirmHardResult && (
                                                                <button
                                                                    className="comment-button"
                                                                    onClick={() => setShowUploadForm(booking)}
                                                                >
                                                                    {booking.canconfirm.nextStatus}
                                                                </button>
                                                            )}
                                                            <HardResultModal
                                                                isOpen={createHardResult}
                                                                onClose={() => setCreateHardResult(false)}
                                                                resultlist={booking.result}
                                                            />

                                                            {/* Image Zoom Modal */}
                                                            {zoomImage && (
                                                                <div className="zoom-modal" onClick={() => setZoomImage(null)}>
                                                                    <div className="zoom-modal-content" onClick={e => e.stopPropagation()}>
                                                                        <img src={zoomImage} alt="Zoomed Result" />
                                                                        <button className="zoom-modal-close" onClick={() => setZoomImage(null)}>×</button>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {showUploadForm && (
                                                                <div className="overlay-upload">
                                                                    <div className="upload-box">
                                                                          <button className="button-close" onClick={() =>setShowUploadForm(null)}>×</button>
                                                                        <h3>Upload Confirmation Image</h3>
                                                                        <input
                                                                            type="file"
                                                                            accept="image/*"
                                                                            required
                                                                            onChange={(e) => setImageFile(e.target.files[0])}
                                                                            className="upload-input"
                                                                        />
                                                                        <button
                                                                            onClick={() => {
                                                                                if (!imageFile) return alert("Please select an image.");
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
                                                        </div>
                                                        {/* Result Delivery Progress Timeline */}
                                                        <div className="tracking-section timeline-section">
                                                            <h4>Result Delivery Progress</h4>
                                                            <div className="timeline">
                                                                {booking.trackingReuslt?.length > 0 ? (
                                                                    booking.trackingReuslt.map((track, idx) => (
                                                                        <div key={idx} className="timeline-item">
                                                                            <div className="timeline-dot appointment"></div>
                                                                            <div className="timeline-content">
                                                                                <div className="timeline-title">{track.statusName}</div>
                                                                                <div className="timeline-date">{formatDate(track.trackingdate)}</div>
                                                                                {track.imgUrl && <img onClick={e => { e.stopPropagation(); setZoomImage(track.imgUrl); }} src={track.imgUrl} alt="Track" className="tracking-image" />}
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    <div className="timeline-empty">No data.</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <button className="close-modal-btn" onClick={() => navigate('/historybooking')}>X</button>
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                    )}
                </main >
                {renderPagination(totalPages, currentPage, setCurrentPage)}
            </div >
            <Footer />

        </>
    );
};