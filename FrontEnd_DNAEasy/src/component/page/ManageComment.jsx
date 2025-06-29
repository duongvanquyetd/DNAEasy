import React, { useEffect, useState } from 'react';
import { CommentReport, ManageCommentReport } from '../../service/Comment';
import '../css//ManageComment.css';
import DynamicHeader from '../DynamicHeader';
import Footer from '../Footer';

export const ManageComment = () => {
  const [searchQuery, setSearchQuery] = useState({ keysearch: '', star: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [comments, setComments] = useState([]);
  const [expandedComment, setExpandedComment] = useState(null);
  const [total, setTotal] = useState([]);


  useEffect(() => {
    CommentReport().then((response) => {
      console.log("Reponse  data", response.data.comments)
      setTotal(response.data.comments)
    }).catch((error) => {
      console.log("error", error)
    })
  }, [])

  useEffect(() => {
    ManageCommentReport(currentPage, pageSize, searchQuery)
      .then((response) => {
        console.log("Reponse data", response.data)
        setComments(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  }, [currentPage, searchQuery]);

  const renderStars = (rating) => {
    return (
      <div className="rating-stars">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={`star ${i < rating ? 'filled' : 'empty'}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleExpandComment = (commentIndex) => {
    setExpandedComment(expandedComment === commentIndex ? null : commentIndex);
  };

  const renderPagination = (total, current,setPage) => (
    <div className="pagination">
      {Array.from({ length: total }, (_, i) => i + 1).map((i) => (
        <button
          key={i}
          className={`page-btn ${i === current ? 'active' : ''}`}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      ))}
    </div>
  );

  const renderSearchFilters = () => (
    <div className="search-filters">

      <div className="search-controls">
        <input
          type="text"
          placeholder="Search by customer name, comment content..."
          className="search-input"
          value={searchQuery.keysearch}
          onChange={(e) => setSearchQuery(prev => ({ ...prev, keysearch: e.target.value }))}
        />
        <select
          className="star-filter"
          value={searchQuery.star}
          onChange={(e) => setSearchQuery(prev => ({ ...prev, star: parseInt(e.target.value) }))}
        >
          <option value={0}>All ratings</option>
          <option value={1}>1 star</option>
          <option value={2}>2 stars</option>
          <option value={3}>3 stars</option>
          <option value={4}>4 stars</option>
          <option value={5}>5 stars</option>
        </select>
      </div>
    </div>
  );

  const renderStaffInfo = (staffType, comment) => {
    const staffData = {
      Lab: {
        name: comment.nameStaff_Lab,
        email: comment.emailStaff_Lab,
        phone: comment.phoneStaff_Lab,
        avatar: comment.avatarUrlStaff_Lab
      },
      Test: {
        name: comment.nameStaff_Test,
        email: comment.emailStaff_Test,
        phone: comment.phoneStaff_Test,
        avatar: comment.avatarUrlStaff_Test
      },
      Reception: {
        name: comment.nameStaff_Reception,
        email: comment.emailStaff_Reception,
        phone: comment.phoneStaff_Reception,
        avatar: comment.avatarUrlStaff_Reception
      },
      ReceptionRefund: {
        name: comment.nameStaff_Reception_Refund,
        email: comment.emailStaff_Reception_Refund,
        phone: comment.phoneStaff_Reception_Refund,
        avatar: comment.avatarUrlStaff_ReceptionRefund
      }
    };

    const staff = staffData[staffType];
    if (!staff.name) return null;

    const staffTitles = {
      Lab: 'Lab Staff',
      Test: 'Test Staff',
      Reception: 'Receptionist',
      ReceptionRefund: 'Receptionist (Refund)'
    };

    return (
      <div className="staff-card">
        <h5 className="staff-title">{staffTitles[staffType]}</h5>
        <div className="staff-info">
          {staff.avatar && (
            <img
              src={staff.avatar}
              alt={staff.name}
              className="staff-avatar"
            />
          )}
          <div className="staff-details">
            <p className="staff-name">{staff.name}</p>
            <p className="staff-contact">{staff.email}</p>
            <p className="staff-contact">{staff.phone}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <DynamicHeader />
      <div className="manage-comment-container">

        <h1 className="page-title">Comment Management</h1>
      
        <div className="star-summary-row">
          <div className="star-summary-block" onClick={(e) => setSearchQuery(prev => ({ ...prev, star: 1 }))}><span className="star-icon">★</span>  ({total["1sao"] || 0})</div>
          <div className="star-summary-block" onClick={(e) => setSearchQuery(prev => ({ ...prev, star: 2 }))}><span className="star-icon">★★</span> ({total["2sao"] || 0}) </div>
          <div className="star-summary-block" onClick={(e) => setSearchQuery(prev => ({ ...prev, star: 3 }))}><span className="star-icon">★★★</span> ({total["3sao"] || 0}) </div>
          <div className="star-summary-block" onClick={(e) => setSearchQuery(prev => ({ ...prev, star: 4 }))}><span className="star-icon">★★★★</span> ({total["4sao"] || 0}) </div>
          <div className="star-summary-block" onClick={(e) => setSearchQuery(prev => ({ ...prev, star: 5 }))}><span className="star-icon">★★★★★</span> ({total["5sao"] || 0}) </div>
        </div>

        {renderSearchFilters()}

        <div className="comments-list">
          {comments.map((comment, index) => (
            <div key={index} className="comment-card">
              {/* Header - Always visible */}
              <div
                className="comment-header"
                onClick={() => toggleExpandComment(index)}
              >
                <div className="comment-main">
                  <div className="comment-content">
                    {comment.avatarUrl_Customer && (
                      <img
                        src={comment.avatarUrl_Customer}
                        alt={comment.nameCustomer}
                        className="customer-avatar"
                      />
                    )}
                    <div className="comment-info">
                      <div className="comment-top">
                        <h3 className="customer-name">
                          {comment.nameCustomer}
                        </h3>
                        <div className="rating-date">
                          {renderStars(comment.rating)}
                          <span className="comment-date">
                            {formatDate(comment.commentDate)}
                          </span>
                        </div>
                      </div>
                      <p className="comment-text">{comment.commentContent}</p>
                      <div className="service-info">
                        <span>Service: {comment.serviceName}</span>
                        <span>•</span>
                        <span>Type: {comment.serviceType}</span>
                      </div>
                    </div>
                  </div>
                  <div className="expand-button">
                    <button className="toggle-btn">
                      {expandedComment === index ? '▲ Collapse' : '▼ View details'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedComment === index && (
                <div className="comment-details">
                  <div className="details-content">
                    {/* Customer Details */}
                    <div className="detail-section">
                      <h4 className="section-title">Customer Information</h4>
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Email:</span> {comment.emailCustomer}
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Phone:</span> {comment.phoneCustomer}
                        </div>
                      </div>
                    </div>

                    {/* Service Details */}
                    <div className="detail-section">
                      <h4 className="section-title">Service Details</h4>
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Service Name:</span> {comment.serviceName}
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Service Type:</span> {comment.serviceType}
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Sample Collection Type:</span> {comment.typeCollect}
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Sample Collection Date:</span> {formatDate(comment.dateCollected)}
                        </div>
                      </div>
                    </div>

                    {/* Staff Information */}
                    <div className="detail-section">
                      <h4 className="section-title">Staff Information</h4>
                      <div className="staff-grid">
                        {renderStaffInfo('Lab', comment)}
                        {renderStaffInfo('Test', comment)}
                        {renderStaffInfo('Reception', comment)}
                        {renderStaffInfo('ReceptionRefund', comment)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {comments.length === 0 && (
          <div className="empty-state">
            No comments found.
          </div>
        )}

        {renderPagination(totalPages, currentPage, setCurrentPage)}
      </div>
      <Footer />
    </>
  );
};