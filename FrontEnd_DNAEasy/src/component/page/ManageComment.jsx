import React, { useEffect, useState } from 'react';
import { ManageCommentReport } from '../../service/Comment';

export const ManageComment = () => {
    const [searchQuery, setSearchQuery] = useState({ keysearch: '', star: 0 });
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [totalPages, setTotalPages] = useState(0);
    const [comments, setComments] = useState([]);
    const [expandedComments, setExpandedComments] = useState({});

    useEffect(() => {
        ManageCommentReport(currentPage, pageSize, searchQuery)
            .then((response) => {
                setComments(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => {
                console.log('Error', error);
            });
    }, [currentPage, searchQuery]);

    const toggleExpand = (index) => {
        setExpandedComments(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const renderPagination = (total, current, setPage) => (
        <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: total }, (_, i) => i + 1).map((i) => (
                <button
                    key={i}
                    className={`px-3 py-1 rounded border ${i === current ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
                        }`}
                    onClick={() => setPage(i)}
                >
                    {i}
                </button>
            ))}
        </div>
    );

    const renderUserInfo = (avatar, name, email, phone, title) => (
        <div className="flex gap-2 items-center mb-2">
            <img
                src={avatar || 'https://via.placeholder.com/40'}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover border"
            />
            <div>
                <p><strong>{title}:</strong> {name || '---'}</p>
                <p className="text-sm text-gray-500">{email || '---'} | {phone || '---'}</p>
            </div>
        </div>
    );

  // ...existing code...
return (
  <div className="manage-comment-container">
    <div className="manage-comment-title">Quản lý bình luận</div>

    {/* Thanh tìm kiếm */}
    <form
      className="comment-search-bar"
      onSubmit={e => {
        e.preventDefault();
        setCurrentPage(1);
      }}
    >
      <input
        className="comment-search-input"
        placeholder="Tìm kiếm bình luận..."
        value={searchQuery.keysearch}
        onChange={e => setSearchQuery({ ...searchQuery, keysearch: e.target.value })}
      />
      <button className="comment-search-btn" type="submit">
        <span style={{ marginRight: 6, display: 'flex', alignItems: 'center' }}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </span>
        Tìm kiếm
      </button>
    </form>

    {/* Danh sách bình luận */}
    <div className="comment-list">
      {comments.map((item, index) => (
        <div key={index} className="comment-card">
          <div className="comment-header">
            <span className="comment-user">{item.nameCustomer}</span>
            <span className="comment-date">{new Date(item.commentDate).toLocaleDateString()}</span>
            <span className="comment-stars">{'★'.repeat(item.rating)}</span>
          </div>
          <div className="comment-content">
            {expandedComments[index]
              ? item.commentContent
              : item.commentContent.slice(0, 120) + (item.commentContent.length > 120 ? '...' : '')}
            {item.commentContent.length > 120 && (
              <button className="comment-expand-btn" onClick={() => toggleExpand(index)}>
                {expandedComments[index] ? 'Thu gọn' : 'Xem thêm'}
              </button>
            )}
          </div>
          <div className="comment-actions">
            <button className="comment-action-btn">Ẩn</button>
            <button className="comment-action-btn">Xóa</button>
          </div>
          {/* Thông tin chi tiết khi mở rộng */}
          {expandedComments[index] && (
            <div className="mt-3">
              <div className="grid md:grid-cols-2 gap-4">
                {renderUserInfo(item.avatarUrl_Customer, item.nameCustomer, item.emailCustomer, item.phoneCustomer, 'Khách hàng')}
                {renderUserInfo(item.avatarUrlStaff_Test, item.nameStaff_Test, item.emailStaff_Test, item.phoneStaff_Test, 'Nhân viên Test')}
                {item.nameStaff_Lab &&
                  renderUserInfo(item.avatarUrlStaff_Lab, item.nameStaff_Lab, item.emailStaff_Lab, item.phoneStaff_Lab, 'Nhân viên Lab')}
                {item.nameStaff_Reception &&
                  renderUserInfo(item.avatarUrlStaff_Reception, item.nameStaff_Reception, item.emailStaff_Reception, item.phoneStaff_Reception, 'Lễ tân')}
                {item.nameStaff_Reception_Refund &&
                  renderUserInfo(item.avatarUrlStaff_ReceptionRefund, item.nameStaff_Reception_Refund, item.emailStaff_Reception_Refund, item.phoneStaff_Reception_Refund, 'Lễ tân hoàn tiền')}
                <div className="col-span-full mt-2">
                  <p><strong>Ngày lấy mẫu:</strong> {new Date(item.dateCollected).toLocaleDateString()}</p>
                  <p><strong>Hình thức lấy mẫu:</strong> {item.typeCollect}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>

    {renderPagination(totalPages, currentPage, setCurrentPage)}
  </div>
);
// ...existing code...
};
