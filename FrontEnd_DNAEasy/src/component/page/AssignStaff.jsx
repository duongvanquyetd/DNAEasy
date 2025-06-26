import React, { useState, useEffect } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { AssignForAppoint, GetAppointForManagerAssign } from '../../service/appointment';
import { GetStaffForAppoint } from '../../service/user';
import '../css/AssignStaff.css';
import Header from '../Header';
import Footer from '../Footer';
import HeaderManager from '../HeaderManager';

export const AssignStaff = () => {
  const [appointments, setAppointments] = useState([]);
  const [listStaff, setListStaff] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchKey, setSearchKey] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const [totalPages, setTotalPages] = useState(0);
  const [currentPageStaff, setCurrentPageStaff] = useState(1);
  const pageSizeStaff = 5;
  const [totalPageStaff, setTotalPageStaff] = useState(0);
  const [expandedStaffId, setExpandedStaffId] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ open: false, staff: null, type: null });

  useEffect(() => {
    fetchAppointments();
  }, [currentPage]);

  useEffect(() => {
    if (!selectedAppointment) return;
    fetchStaff();
  }, [selectedAppointment, currentPageStaff, searchKey]);

  const fetchAppointments = async () => {
    try {
      const response = await GetAppointForManagerAssign(currentPage, pageSize);
      setTotalPages(response.data.totalPages);
      setAppointments(response.data.content || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await GetStaffForAppoint(selectedAppointment.appointmentId, pageSizeStaff, currentPageStaff, searchKey);
      setTotalPageStaff(response.data.totalPages);
      setListStaff(response.data.content || []);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  const handleBack = () => {
    setSelectedAppointment(null);
    setSearchKey('');
    setCurrentPageStaff(1);
  };

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

  // Hàm mở modal xác nhận
  const openConfirmModal = (staff, type) => {
    setConfirmModal({ open: true, staff, type });
  };
  // Hàm đóng modal xác nhận
  const closeConfirmModal = () => {
    setConfirmModal({ open: false, staff: null, type: null });
  };

  // Hàm thực hiện phân công/huỷ sau khi xác nhận
  const handleConfirmAssign = () => {
    const appointmentId = selectedAppointment.appointmentId;
    const personId = confirmModal.type === 'assign' ? confirmModal.staff.personId : null;
    const request = {
      appoinmetnId: Number(appointmentId),
      personId: personId !== null ? Number(personId) : null,
    };
    AssignForAppoint(request)
      .then(() => {
        setToast({ type: 'success', message: personId ? 'Phân công thành công!' : 'Huỷ phân công thành công!' });
        GetAppointForManagerAssign(currentPage, pageSize)
          .then((response) => {
            setTotalPages(response.data.totalPages);
            setAppointments(response.data.content);
          });
        if (selectedAppointment) {
          GetStaffForAppoint(selectedAppointment.appointmentId, pageSizeStaff, currentPageStaff, searchKey)
            .then((response) => {
              setTotalPageStaff(response.data.totalPages);
              setListStaff(response.data.content);
            });
        }
        setTimeout(() => setToast(null), 1500);
      })
      .catch((error) => {
        setToast({ type: 'error', message: 'Có lỗi xảy ra, vui lòng thử lại!' });
        setTimeout(() => setToast(null), 2000);
        console.log("Error", error);
      });
    closeConfirmModal();
  };

  return (
    <>
      <HeaderManager />
      {toast && (
        <div className="toast-notification">
          {toast.message}
        </div>
      )}
      <div className={`assign-staff-container${!selectedAppointment ? ' no-staff-selected' : ''}`}>
        <div className="appointments-section">
          <h2>Appointments</h2>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Location</th>
                <th>Service Type</th>
                <th>Date Collect</th>
                <th>Type Collect</th>
                <th>Assigned</th>
                <th className="action-header">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr
                  key={a.appointmentId}
                  className={
                    `appointment-row ${
                      selectedAppointment?.appointmentId === a.appointmentId ? 'selected-row' : ''
                    } ${a.staffName ? 'assigned-row' : ''}`
                  }
                  onClick={() => {
                    setSelectedAppointment(a);
                    setCurrentPageStaff(1);
                    setSearchKey('');
                  }}
                >
                  <td>{a.location}</td>
                  <td>{a.typeService}</td>
                  <td>{a.dateCollect}</td>
                  <td>{a.typeCollect}</td>
                  <td>{a.staffName || <span className="not-assigned">Not Assigned</span>}</td>
                  <td className="action-cell">
                    <button
                      className="action-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAppointment(a);
                        setCurrentPageStaff(1);
                        setSearchKey('');
                      }}
                    >
                      {a.staffName ? 'Change' : 'Assign'}
                    </button>
                    {a.staffName && (
                      <button
                        className="cancel-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openConfirmModal({ personId: null, name: a.staffName }, 'cancel');
                          setCurrentPageStaff(1);
                          setSearchKey('');
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalPages > 1 && renderPagination(totalPages, currentPage, setCurrentPage)}
        </div>

        <div className={`staff-section-panel${selectedAppointment ? ' open' : ' closed'}`}>
          {selectedAppointment ? (
            <div className="staff-section-inner">
              <button className="close-button" onClick={handleBack}>
                ✕
              </button>
              <h2 className="panel-title">
                <span role="img" aria-label="calendar">📅</span> Chi tiết lịch hẹn
              </h2>
              <div className="appointment-details-card">
                <div className="appointment-details-content">
                  <div className="appointment-detail-row">
                    <span className="appointment-detail-icon">👤</span>
                    <span className="appointment-detail-label">Khách hàng:</span>
                    <span className="appointment-detail-value">{selectedAppointment.customerName}</span>
                  </div>
                  <div className="appointment-detail-row">
                    <span className="appointment-detail-icon">🏠</span>
                    <span className="appointment-detail-label">Địa chỉ:</span>
                    <span className="appointment-detail-value">{selectedAppointment.address}</span>
                  </div>
                  <div className="appointment-detail-row">
                    <span className="appointment-detail-icon">⏰</span>
                    <span className="appointment-detail-label">Thời gian:</span>
                    <span className="appointment-detail-value">{selectedAppointment.date} {selectedAppointment.time}</span>
                  </div>
                  <div className="appointment-detail-row">
                    <span className="appointment-detail-icon">🧪</span>
                    <span className="appointment-detail-label">Loại:</span>
                    <span className="appointment-detail-value">
                      {selectedAppointment.typeSample === 'Home_collection'
                        ? 'Lấy mẫu tại nhà'
                        : selectedAppointment.typeSample === 'Hospital_collection'
                        ? 'Lấy mẫu tại viện'
                        : 'Gửi kit test'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="search-container">
                <span className="search-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="9" cy="9" r="7" stroke="#94a3b8" strokeWidth="1.7" />
                    <path d="M15.2 15.2L19 19" stroke="#94a3b8" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by name or address..."
                  value={searchKey}
                  onChange={(e) => {
                    setSearchKey(e.target.value);
                    setCurrentPageStaff(1);
                  }}
                />
              </div>
              {listStaff.length === 0 ? (
                <p className="no-staff">No staff available</p>
              ) : (
                <>
                  {listStaff.map((staff) => {
                    const status = staff.status ? staff.status.toLowerCase() : 'available';
                    return (
                      <div
                        key={staff.personId}
                        className={`staff-card${expandedStaffId === staff.personId ? ' expanded' : ''}`}
                        onClick={() => setExpandedStaffId(expandedStaffId === staff.personId ? null : staff.personId)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div style={{display: 'flex', alignItems: 'center', position: 'relative'}}>
                          <div style={{position: 'relative'}}>
                            <img
                              src={staff.avatarUrl || '/default-avatar.png'}
                              alt={staff.name}
                              className={`avatar${!staff.avatarUrl ? ' default' : ''}`}
                            />
                            <span className={`avatar-status-dot ${status}`}></span>
                          </div>
                        </div>
                        <div className="staff-info">
                          <div className="staff-header">
                            <strong>{staff.name}</strong>
                          </div>
                          <div className="staff-address"><span style={{marginRight: 4}}>🏠</span>{staff.address}</div>
                          {expandedStaffId === staff.personId && (
                            <div className="staff-detail-expand" style={{marginTop: 10, fontSize: '0.97rem', color: '#334155'}}>
                              <div><span style={{marginRight: 4}}>📞</span>{staff.phone || 'Chưa có số điện thoại'}</div>
                              <div><span style={{marginRight: 4}}>✉️</span>{staff.email || 'Chưa có email'}</div>
                              <div><span style={{marginRight: 4}}>🕒</span>Số lần được phân công: {staff.assignCount || 0}</div>
                            </div>
                          )}
                        </div>
                        <button
                          className="choose-button"
                          onClick={e => { e.stopPropagation(); openConfirmModal(staff, 'assign'); }}
                          style={{opacity: 1}}
                          title={'Chọn nhân viên này'}
                        >
                          <span className="choose-icon" style={{display: 'flex', alignItems: 'center', height: '100%'}}>✔️</span>Choose
                        </button>
                      </div>
                    );
                  })}
                  {totalPageStaff > 1 && renderPagination(totalPageStaff, currentPageStaff, setCurrentPageStaff)}
                </>
              )}
              <button className="back-button" onClick={handleBack}>
                <LeftOutlined /> Quay lại
              </button>
            </div>
          ) :null}
        </div>
      </div>
      {confirmModal.open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{marginBottom: 16}}>
              {confirmModal.type === 'assign' ? 'Xác nhận phân công' : 'Xác nhận huỷ phân công'}
            </h3>
            <div style={{marginBottom: 18, fontSize: '1.05rem'}}>
              {confirmModal.type === 'assign'
                ? `Bạn có chắc chắn muốn phân công nhân viên "${confirmModal.staff.name}" cho lịch hẹn này?`
                : `Bạn có chắc chắn muốn huỷ phân công nhân viên "${confirmModal.staff.name}" khỏi lịch hẹn này?`}
            </div>
            <div style={{display: 'flex', gap: 16, justifyContent: 'center'}}>
              <button className="action-button" onClick={handleConfirmAssign}>Xác nhận</button>
              <button className="cancel-button" onClick={closeConfirmModal}>Huỷ</button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};