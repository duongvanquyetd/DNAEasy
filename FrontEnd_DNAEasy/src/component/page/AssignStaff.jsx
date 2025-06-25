// src/component/page/AssignStaff.jsx
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
  const [searchkey, setSearchKey] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
  const [totalPages, setTotalPages] = useState(0);

  const [currentPageStaff, setCurrenpageStaff] = useState(1);
  const pageSizeStaff = 5;
  const [totalPageStaff, setTotalpageStaff] = useState(0);

  const [expandedStaffId, setExpandedStaffId] = useState(null);

  useEffect(() => {
    GetAppointForManagerAssign(currentPage, pageSize)
      .then((response) => {
        setTotalPages(response.data.totalPages);
        setAppointments(response.data.content);
      })
      .catch((error) => console.log("Error Get Appoint", error));
  }, [currentPage]);

  useEffect(() => {
    if (!selectedAppointment) return;
    GetStaffForAppoint(selectedAppointment.appointmentId, pageSizeStaff, currentPageStaff, searchkey)
      .then((response) => {
        setTotalpageStaff(response.data.totalPages);
        setListStaff(response.data.content);
      })
      .catch((error) => console.log("Error to get Staff for Assign", error));
  }, [selectedAppointment, currentPageStaff, searchkey]);

  const handleAssign = (appointmentId, personId) => {
    const request = {
      appoinmetnId: Number(appointmentId),
      personId: Number(personId),
    };
    AssignForAppoint(request)
      .then(() => window.location.reload())
      .catch((error) => console.log("Error", error));
  };

  const handleBack = () => {
    setSelectedAppointment(null);
    setSearchKey('');
    setCurrenpageStaff(1);
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
  // ...existing code...
  return (
    <>
   
      <div className="assign-staff-container">
      <HeaderManager />
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr
                  key={a.appointmentId}
                  className={
                    `appointment-row` +
                    (selectedAppointment?.appointmentId === a.appointmentId ? ' selected-row' : '') +
                    (a.staffName ? ' assigned-row' : '')
                  }
                  onClick={() => {
                    setSelectedAppointment(a);
                    setCurrenpageStaff(1);
                    setSearchKey('');
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{a.location}</td>
                  <td>{a.typeService}</td>
                  <td>{a.dateCollect}</td>
                  <td>{a.typeCollect}</td>
                  <td>{a.staffName || <span className="not-assigned">Not Assigned</span>}</td>
                  <td>
                    <button
                      className="action-button"
                      style={{ minWidth: 80 }}
                      onClick={e => {
                        e.stopPropagation();
                        setSelectedAppointment(a);
                        setCurrenpageStaff(1);
                        setSearchKey('');
                      }}
                    >
                      {a.staffName ? 'Change' : 'Assign'}
                    </button>
                    {a.staffName && (
                      <button
                        className="cancel-button"
                        onClick={e => {
                          e.stopPropagation();
                          handleAssign(a.appointmentId, null);
                          setCurrenpageStaff(1);
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

          {renderPagination(totalPages, currentPage, setCurrentPage)}
        </div>


        <div className={`staff-section-panel${selectedAppointment ? ' open' : ''}`}>
          {selectedAppointment ? (
            <>
              <div className="staff-section-inner" style={{position: 'relative'}}>
                <h2>
                  Staff for Appointment <span className="blue-id">#{selectedAppointment.appointmentId}</span>
                </h2>
                <button
                  className="close-button"
                  onClick={() => {
                    setSelectedAppointment(null)
                    setSearchKey('');
                    setCurrenpageStaff(1);
                  }}
                  title="Close"
                  style={{position: 'absolute', top: 18, right: 18, zIndex: 2}}
                >
                  <span style={{fontSize: '1rem', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>✖</span>
                </button>

                <div style={{position: 'relative'}}>
                  <span className="search-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="9" cy="9" r="7" stroke="#94a3b8" strokeWidth="1.7"/>
                      <path d="M15.2 15.2L19 19" stroke="#94a3b8" strokeWidth="1.7" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search by name..."
                    value={searchkey}
                    onChange={(e) => {
                      setSearchKey(e.target.value);
                      setCurrenpageStaff(1);
                    }}
                    style={{paddingLeft: '44px'}}
                  />
                </div>
                {listStaff.length === 0 ? (
                  <p className="no-staff">No staff available</p>
                ) : (
                  <>
                    {listStaff.map((staff) => {
                      const status = staff.status || 'Available';
                      return (
                        <div
                          key={staff.personId}
                          className={`staff-card${expandedStaffId === staff.personId ? ' expanded' : ''}`}
                          onClick={() => setExpandedStaffId(expandedStaffId === staff.personId ? null : staff.personId)}
                          style={{
                            cursor: 'pointer',
                            boxShadow: expandedStaffId === staff.personId ? '0 6px 24px #2563eb22' : undefined,
                            border: expandedStaffId === staff.personId ? '2px solid #2563eb55' : undefined,
                            background: expandedStaffId === staff.personId ? '#f0f7ff' : undefined,
                            transition: 'all 0.25s',
                            position: 'relative',
                          }}
                        >
                          <div style={{display: 'flex', alignItems: 'center'}}>
                            <img src={staff.avatarUrl} alt={staff.name} className="avatar" />
                          </div>
                          <div style={{flex: 1}}>
                            <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                              <strong style={{fontSize: '1.08rem', color: '#2563eb'}}>{staff.name}</strong>
                              <span className={`staff-status-badge ${status.toLowerCase()}`}>
                                <span className="status-dot"></span>
                                {status.toUpperCase()}
                              </span>
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
                            onClick={e => { e.stopPropagation(); handleAssign(selectedAppointment.appointmentId, staff.personId); }}
                            style={{opacity: 1}}
                            title={'Chọn nhân viên này'}
                          >
                            <span className="choose-icon" style={{display: 'flex', alignItems: 'center', height: '100%'}}>✔️</span>Choose
                          </button>
                        </div>
                      );
                    })}
                    {renderPagination(totalPageStaff, currentPageStaff, setCurrenpageStaff)}
                  </>
                )}
              </div>
              <div className="assign-staff-overlay" onClick={handleBack}></div>
              <div className="assign-staff-panel card">
                <button className="back-button" onClick={handleBack}>
                  <LeftOutlined /> Quay lại
                </button>
                <div className="appointment-details">
                  <span><b>Khách hàng:</b> {selectedAppointment.customerName}</span><br />
                  <span><b>Địa chỉ:</b> {selectedAppointment.address}</span><br />
                  <span><b>Thời gian:</b> {selectedAppointment.date} {selectedAppointment.time}</span><br />
                  <span><b>Loại:</b> {selectedAppointment.typeSample === 'Home_collection' ? 'Lấy mẫu tại nhà' : selectedAppointment.typeSample === 'Hospital_collection' ? 'Lấy mẫu tại viện' : 'Gửi kit test'}</span>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <Footer />
    </>
  )};
  // ...existing code...

