// src/component/page/AssignStaff.jsx
import React, { useState, useEffect } from 'react';
import { LeftOutlined } from '@ant-design/icons';

import { AssignForAppoint, GetAppointForManagerAssign } from '../../service/appointment';
import { GetStaffForAppoint } from '../../service/user';
import '../css/AssignStaff.css';


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
    <div className="assign-staff-container">
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
            <div className="staff-section-inner">
              <h2>
                Staff for Appointment <span className="blue-id">#{selectedAppointment.appointmentId}</span>
              </h2>
              <button
                className="cancel-button"
                onClick={() => {
                  setSelectedAppointment(null)
                  setSearchKey('');
                  setCurrenpageStaff(1);
                }}
              >
                Close
              </button>

              <input
                type="text"
                className="search-input"
                placeholder="Search by name..."
                value={searchkey}
                onChange={(e) => {
                  setSearchKey(e.target.value);
                  setCurrenpageStaff(1);
                }}
              />
              {listStaff.length === 0 ? (
                <p className="no-staff">No staff available</p>
              ) : (
                <>
                  {listStaff.map((staff) => (
                    <div key={staff.personId} className="staff-card">
                      <img src={staff.avatarUrl} alt={staff.name} className="avatar" />
                      <div>
                        <strong>{staff.name}</strong>
                        <div className="staff-address">{staff.address}</div>
                      </div>
                      <button
                        className="choose-button"
                        onClick={() => handleAssign(selectedAppointment.appointmentId, staff.personId)}
                      >
                        Choose
                      </button>
                    </div>
                  ))}
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

  )};
  // ...existing code...

