import React, { useState, useEffect } from 'react';
import { LeftOutlined, UserAddOutlined, CheckCircleOutlined, CloseCircleOutlined, SearchOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import '../css/AssignStaff.css'; // Specific styles for this page
import DynamicHeader from '../DynamicHeader';
import Footer from '../Footer';

// ===== MOCK DATA (thay thế bằng API sau) =====
const mockAppointments = [
  {
    id: 1,
    customerName: 'Nguyễn Văn A',
    address: '123 Lê Lợi, Q.1',
    phone: '0909123456',
    date: '2024-07-01',
    time: '09:00',
    typeSample: 'Home_collection',
    status: 'Chưa phân công',
  },
  {
    id: 2,
    customerName: 'Trần Thị B',
    address: '456 Nguyễn Trãi, Q.5',
    phone: '0912345678',
    date: '2024-07-02',
    time: '14:00',
    typeSample: 'Home_collection',
    status: 'Đã phân công',
    assignedStaff: 'Lê Văn Nhân',
  },
];

const mockStaffs = [
  {
    id: 101,
    name: 'Lê Văn Nhân',
    phone: '0988777666',
    email: 'nhan.le@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    address: '789 CMT8, Q.3',
    role: 'Nhân viên lấy mẫu',
    note: 'Có kinh nghiệm lấy mẫu tại nhà',
  },
  {
    id: 102,
    name: 'Phạm Thị Mai',
    phone: '0977666555',
    email: 'mai.pham@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    address: '321 Lý Thường Kiệt, Q.10',
    role: 'Nhân viên lấy mẫu',
    note: 'Phục vụ tận tâm, chuyên nghiệp',
  },
  {
    id: 103,
    name: 'Nguyễn Xuân Việt',
    phone: '0976673456',
    email: 'viet.nguyen@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    address: 'VinHome, Q.9',
    role: 'Nhân viên lấy mẫu',
    note: 'Phục vụ tận tâm, chuyên nghiệp, Yêu FPT',
  },
];
// ===== END MOCK DATA =====

// Helper component for skeleton loading
const SkeletonRow = ({ columns }) => (
  <tr>
    <td colSpan={columns}>
      <div className="cell-staff-info">
        <div className="skeleton avatar"></div>
        <div style={{ flex: 1 }}>
          <div className="skeleton text"></div>
          <div className="skeleton text" style={{ width: '50%', marginTop: '8px' }}></div>
        </div>
        <div className="skeleton button"></div>
      </div>
    </td>
  </tr>
);

const AssignStaff = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [stagedStaff, setStagedStaff] = useState(null);
  const [staffSearchText, setStaffSearchText] = useState('');

  // Simulate API fetch
  useEffect(() => {
    setTimeout(() => {
      setAppointments(mockAppointments);
      setIsLoading(false);
    }, 1500); // 1.5 second delay
  }, []);

  // Stage a staff for confirmation
  const handleStageStaff = (staff) => {
    setStagedStaff(staff);
  };

  // Final confirmation of assignment
  const handleConfirmAssignment = () => {
    if (!stagedStaff) return;

    const updatedAppointments = appointments.map(appt =>
      appt.id === selectedAppointment.id
        ? { ...appt, status: 'Đã phân công', assignedStaff: stagedStaff.name }
        : appt
    );
    setAppointments(updatedAppointments);
    
    // Close the panel and show success feedback (could be a toast notification in a real app)
    setSelectedAppointment(null);
    setStagedStaff(null);
  };
  
  const handleCancelStage = () => {
    setStagedStaff(null);
  };

  // Khi chọn cuộc hẹn
  const handleSelectAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setStagedStaff(null);
  };

  const handleCancelAssignment = (appointmentId) => {
    const updatedAppointments = appointments.map(appt =>
      appt.id === appointmentId
        ? { ...appt, status: 'Chưa phân công', assignedStaff: undefined }
        : appt
    );
    setAppointments(updatedAppointments);
    if(selectedAppointment?.id === appointmentId) {
        setSelectedAppointment(null);
    }
  };

  // Khi quay lại bảng cuộc hẹn
  const handleBack = () => {
    setSelectedAppointment(null);
    setStagedStaff(null);
  };

  // Tìm các nhân viên đã được phân công cho bất kỳ cuộc hẹn nào
  const assignedStaffNames = appointments
    .filter(appt => appt.status === 'Đã phân công' && appt.assignedStaff)
    .map(appt => appt.assignedStaff);

  const filteredStaff = mockStaffs.filter(staff =>
    staff.name.toLowerCase().includes(staffSearchText.toLowerCase()) ||
    staff.phone.includes(staffSearchText)
  );

  const renderAppointmentTableBody = () => {
    if (isLoading) {
      return Array.from({ length: 3 }).map((_, index) => <SkeletonRow key={index} columns={5} />);
    }
    if (appointments.length === 0) {
      return (
        <tr>
          <td colSpan="5">
            <div className="empty-state">
              <CalendarOutlined className="empty-state-icon" />
              <p className="empty-state-text">Hiện không có cuộc hẹn nào cần phân công.</p>
            </div>
          </td>
        </tr>
      );
    }
    return appointments.map((appt, index) => (
      <tr 
        key={appt.id} 
        onClick={() => handleSelectAppointment(appt)}
        className={selectedAppointment?.id === appt.id ? 'selected-row' : ''}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <td>{appt.customerName}</td>
        <td>{appt.address}</td>
        <td>{`${appt.date} ${appt.time}`}</td>
        <td>
          <span className={`status-badge ${appt.status === 'Chưa phân công' ? 'status-unassigned' : 'status-assigned'}`}>
            {appt.status === 'Đã phân công' ? `NV: ${appt.assignedStaff}` : 'Chưa phân công'}
          </span>
        </td>
        <td>
          {appt.status === 'Chưa phân công' ? (
            <button 
              className="ant-btn ant-btn-primary" 
              onClick={(e) => { e.stopPropagation(); handleSelectAppointment(appt); }}
            >
              <UserAddOutlined />
              Chọn nhân viên
            </button>
          ) : (
            <button 
              className="ant-btn btn-cancel" 
              onClick={(e) => { e.stopPropagation(); handleCancelAssignment(appt.id); }}
            >
              <CloseCircleOutlined />
              Hủy phân công
            </button>
          )}
        </td>
      </tr>
    ));
  };
  
  const renderStaffPanel = () => {
    if (selectedAppointment.status === 'Đã phân công') {
      return (
        <div className="staff-details-card">
          <h4>Thông tin nhân viên đã phân công</h4>
          <div className="staff-details-header">
            <img src={mockStaffs.find(s => s.name === selectedAppointment.assignedStaff)?.avatar} alt={selectedAppointment.assignedStaff} className="staff-details-avatar" />
            <div className="staff-details-info">
              <div><b>{selectedAppointment.assignedStaff}</b></div>
            </div>
          </div>
        </div>
      );
    }

    if (stagedStaff) {
      return (
        <div className="confirmation-panel">
          <h4>Xác nhận phân công</h4>
          <p>Vui lòng xác nhận phân công nhân viên sau cho cuộc hẹn này.</p>
          <div className="staff-details-card confirmation-card">
            <div className="staff-details-header">
              <img src={stagedStaff.avatar} alt={stagedStaff.name} className="staff-details-avatar" />
              <div className="staff-details-info">
                <div><b>{stagedStaff.name}</b> ({stagedStaff.role})</div>
                <div><b>SĐT:</b> {stagedStaff.phone}</div>
                <div><b>Email:</b> {stagedStaff.email}</div>
              </div>
            </div>
          </div>
          <div className="confirmation-actions">
            <button className="ant-btn" onClick={handleCancelStage}>
              <LeftOutlined /> Chọn lại
            </button>
            <button className="ant-btn ant-btn-primary" onClick={handleConfirmAssignment}>
              <CheckCircleOutlined /> Xác nhận
            </button>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="search-input-container">
          <SearchOutlined className="search-icon" />
          <input
            type="text"
            placeholder="Tìm nhân viên theo tên hoặc SĐT..."
            className="staff-search-input"
            value={staffSearchText}
            onChange={(e) => setStaffSearchText(e.target.value)}
          />
        </div>
        <table className="custom-table">
           <thead>
            <tr>
              <th>Nhân viên</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.length > 0 ? filteredStaff.map((staff, index) => {
              const isAssigned = assignedStaffNames.includes(staff.name);
              return (
                <tr 
                  key={staff.id} 
                  onClick={() => !isAssigned && handleStageStaff(staff)}
                  className={isAssigned ? 'disabled-row' : ''}
                  style={{ animationDelay: `${index * 50}ms`, cursor: isAssigned ? 'not-allowed' : 'pointer' }}
                >
                  <td>
                    <div className="cell-staff-info">
                      <img src={staff.avatar} alt={staff.name} className="staff-avatar" />
                      <div>
                        <span>{staff.name}</span>
                        {isAssigned && <span className="status-badge staff-status">Đã có lịch</span>}
                      </div>
                    </div>
                  </td>
                  <td>
                    <button className="ant-btn ant-btn-primary" disabled={isAssigned}>
                      <UserAddOutlined /> Chọn
                    </button>
                  </td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan="2">
                  <div className="empty-state">
                    <UserOutlined className="empty-state-icon" />
                    <p className="empty-state-text">Không tìm thấy nhân viên nào.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <>
      <DynamicHeader />
      <div className="assign-staff-container">
        {/* Bảng cuộc hẹn */}
        <div className={`appointments-section ${selectedAppointment ? 'collapsed' : ''}`}>
          <h2>List Appointment</h2>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Khách hàng</th>
                <th>Địa chỉ</th>
                <th>Ngày giờ</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {renderAppointmentTableBody()}
            </tbody>
          </table>
        </div>

        {/* Bảng nhân viên */}
        {selectedAppointment && (
          <div className="staff-section">
            <button className="ant-btn back-button" onClick={handleBack}>
              <LeftOutlined /> Quay lại
            </button>
            <h3>
              {selectedAppointment.status === 'Chưa phân công' ? 'Chọn nhân viên' : 'Chi tiết phân công'}
            </h3>
            <div className="appointment-details">
              <span>Khách hàng: <b>{selectedAppointment.customerName}</b></span>
              <span>Địa chỉ: <b>{selectedAppointment.address}</b></span>
              <span>Thời gian: <b>{`${selectedAppointment.date} ${selectedAppointment.time}`}</b></span>
            </div>
            {renderStaffPanel()}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AssignStaff; 