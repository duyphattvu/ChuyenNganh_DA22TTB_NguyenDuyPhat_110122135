import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuanLyYeuCauHoTro.css';

function QuanLyYeuCauHoTro() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('support'); // 'support' hoặc 'reviews'
  
  // Support states
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  
  // Reviews states
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [reviewSearch, setReviewSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [selectedReview, setSelectedReview] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Load data từ localStorage
  useEffect(() => {
    loadRequests();
    loadReviews();
  }, []);

  // Filter requests khi search hoặc filter thay đổi
  useEffect(() => {
    filterRequests();
  }, [requests, searchTerm, statusFilter, subjectFilter]);

  // Filter reviews
  useEffect(() => {
    filterReviews();
  }, [reviews, reviewSearch, ratingFilter]);

  const loadRequests = () => {
    const savedRequests = JSON.parse(localStorage.getItem('supportRequests') || '[]');
    const requestsWithStatus = savedRequests.map(req => ({
      ...req,
      status: req.status || 'Chưa xử lý'
    }));
    setRequests(requestsWithStatus);
  };

  const loadReviews = () => {
    const savedReviews = JSON.parse(localStorage.getItem('productReviews') || '[]');
    setReviews(savedReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  };

  const filterReviews = () => {
    let filtered = [...reviews];
    
    if (ratingFilter !== 'all') {
      filtered = filtered.filter(r => r.rating === parseInt(ratingFilter));
    }
    
    if (reviewSearch) {
      const term = reviewSearch.toLowerCase();
      filtered = filtered.filter(r => 
        r.userId?.toLowerCase().includes(term) ||
        r.comment?.toLowerCase().includes(term) ||
        r.orderId?.toString().includes(term)
      );
    }
    
    setFilteredReviews(filtered);
  };

  const filterRequests = () => {
    let filtered = [...requests];

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(req => req.status === statusFilter);
    }

    // Filter by subject
    if (subjectFilter !== 'all') {
      filtered = filtered.filter(req => req.subject === subjectFilter);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(req => 
        req.id?.toString().includes(term) ||
        req.name?.toLowerCase().includes(term) ||
        req.email?.toLowerCase().includes(term) ||
        req.phone?.includes(term) ||
        req.message?.toLowerCase().includes(term)
      );
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

    setFilteredRequests(filtered);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'Chưa xử lý': { label: 'Chưa xử lý', class: 'status-pending' },
      'Đang xử lý': { label: 'Đang xử lý', class: 'status-processing' },
      'Đã xử lý': { label: 'Đã xử lý', class: 'status-completed' },
      'Đã hủy': { label: 'Đã hủy', class: 'status-cancelled' }
    };

    const statusInfo = statusMap[status] || { label: status, class: 'status-default' };
    return (
      <span className={`status-badge ${statusInfo.class}`}>
        {statusInfo.label}
      </span>
    );
  };

  const getSubjectLabel = (subject) => {
    const subjectMap = {
      'order': 'Đặt hàng & Thanh toán',
      'shipping': 'Vận chuyển & Giao hàng',
      'return': 'Đổi trả sản phẩm',
      'warranty': 'Bảo hành',
      'product': 'Thông tin sản phẩm',
      'other': 'Khác'
    };
    return subjectMap[subject] || subject;
  };

  const updateRequestStatus = (requestId, newStatus) => {
    const updatedRequests = requests.map(req =>
      req.id === requestId
        ? { ...req, status: newStatus }
        : req
    );
    setRequests(updatedRequests);
    localStorage.setItem('supportRequests', JSON.stringify(updatedRequests));

    // Cập nhật selected request nếu đang mở
    if (selectedRequest && selectedRequest.id === requestId) {
      setSelectedRequest({ ...selectedRequest, status: newStatus });
    }
  };

  const viewRequestDetail = (request) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedRequest(null);
  };

  const deleteRequest = (requestId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa yêu cầu hỗ trợ này?')) {
      const updatedRequests = requests.filter(req => req.id !== requestId);
      setRequests(updatedRequests);
      localStorage.setItem('supportRequests', JSON.stringify(updatedRequests));
      if (selectedRequest && selectedRequest.id === requestId) {
        closeDetailModal();
      }
      alert('✅ Xóa yêu cầu hỗ trợ thành công!');
    }
  };

  const markAsRead = (requestId) => {
    updateRequestStatus(requestId, 'Đã xử lý');
  };

  const openReplyModal = (request) => {
    setSelectedRequest(request);
    setReplyMessage('');
    setShowReplyModal(true);
  };

  const sendReplyEmail = async () => {
    if (!replyMessage.trim()) {
      alert('Vui lòng nhập nội dung trả lời!');
      return;
    }

    setSendingEmail(true);

    // Lưu phản hồi vào localStorage
    const updatedRequests = requests.map(req =>
      req.id === selectedRequest.id
        ? { 
            ...req, 
            status: 'Đã xử lý',
            reply: replyMessage,
            replyDate: new Date().toISOString()
          }
        : req
    );
    setRequests(updatedRequests);
    localStorage.setItem('supportRequests', JSON.stringify(updatedRequests));

    // Tạo nội dung email
    const subject = `[SHOP NDP] Phan hoi yeu cau ho tro #${selectedRequest.id}`;
    const bodyText = `Kinh gui ${selectedRequest.name},

Cam on ban da lien he voi SHOP NDP!

Ve yeu cau ho tro cua ban:
"${selectedRequest.message}"

Phan hoi tu chung toi:
${replyMessage}

---
Neu ban can ho tro them, vui long lien he:
Hotline: 0983592506
Email: duyphat@gmail.com

Tran trong,
SHOP NDP`;

    // Mở Gmail compose (hỗ trợ tốt hơn)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${selectedRequest.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    window.open(gmailUrl, '_blank');

    setSendingEmail(false);
    setShowReplyModal(false);
    setReplyMessage('');
    
    // Cập nhật selected request
    setSelectedRequest({ 
      ...selectedRequest, 
      status: 'Đã xử lý',
      reply: replyMessage,
      replyDate: new Date().toISOString()
    });
  };

  const deleteReview = (reviewId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) {
      const updatedReviews = reviews.filter(r => r.id !== reviewId);
      setReviews(updatedReviews);
      localStorage.setItem('productReviews', JSON.stringify(updatedReviews));
      setShowReviewModal(false);
      alert('✅ Đã xóa đánh giá!');
    }
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => r.status === 'Chưa xử lý').length;
  const processingRequests = requests.filter(r => r.status === 'Đang xử lý').length;
  const completedRequests = requests.filter(r => r.status === 'Đã xử lý').length;

  const totalReviews = reviews.length;
  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0;
  const fiveStarReviews = reviews.filter(r => r.rating === 5).length;
  const lowRatingReviews = reviews.filter(r => r.rating <= 2).length;

  return (
    <div className="quan-ly-yeu-cau-ho-tro">
      <div className="admin-header">
        <h1>📩 Quản Lý Hỗ Trợ & Đánh Giá</h1>
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Về trang chủ
        </button>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'support' ? 'active' : ''}`}
          onClick={() => setActiveTab('support')}
        >
          📩 Yêu cầu hỗ trợ <span className="tab-count">{pendingRequests}</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          ⭐ Đánh giá sản phẩm <span className="tab-count">{totalReviews}</span>
        </button>
      </div>

      {activeTab === 'support' && (
      <>
      {/* Statistics Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">📩</div>
          <div className="stat-info">
            <h3>Tổng yêu cầu</h3>
            <p className="stat-value">{totalRequests}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>Chưa xử lý</h3>
            <p className="stat-value warning">{pendingRequests}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-info">
            <h3>Đang xử lý</h3>
            <p className="stat-value info">{processingRequests}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✓</div>
          <div className="stat-info">
            <h3>Đã xử lý</h3>
            <p className="stat-value success">{completedRequests}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email, SĐT, nội dung..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        <div className="filter-box">
          <label>Lọc theo trạng thái:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tất cả</option>
            <option value="Chưa xử lý">Chưa xử lý</option>
            <option value="Đang xử lý">Đang xử lý</option>
            <option value="Đã xử lý">Đã xử lý</option>
            <option value="Đã hủy">Đã hủy</option>
          </select>
        </div>
        <div className="filter-box">
          <label>Lọc theo chủ đề:</label>
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tất cả</option>
            <option value="order">Đặt hàng & Thanh toán</option>
            <option value="shipping">Vận chuyển & Giao hàng</option>
            <option value="return">Đổi trả sản phẩm</option>
            <option value="warranty">Bảo hành</option>
            <option value="product">Thông tin sản phẩm</option>
            <option value="other">Khác</option>
          </select>
        </div>
      </div>

      {/* Requests Table */}
      <div className="requests-table-container">
        {filteredRequests.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>Không có yêu cầu hỗ trợ nào</h3>
            <p>Chưa có yêu cầu hỗ trợ nào phù hợp với bộ lọc của bạn</p>
          </div>
        ) : (
          <table className="requests-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Khách hàng</th>
                <th>Email</th>
                <th>SĐT</th>
                <th>Chủ đề</th>
                <th>Ngày gửi</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map(request => (
                <tr key={request.id}>
                  <td className="request-id">#{request.id}</td>
                  <td className="customer-name">{request.name || 'N/A'}</td>
                  <td className="customer-email">{request.email || 'N/A'}</td>
                  <td>{request.phone || 'N/A'}</td>
                  <td>
                    <span className="subject-badge">
                      {getSubjectLabel(request.subject)}
                    </span>
                  </td>
                  <td className="request-date">{formatDate(request.date)}</td>
                  <td>{getStatusBadge(request.status)}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-view"
                        onClick={() => viewRequestDetail(request)}
                      >
                        Xem
                      </button>
                      <button 
                        className="btn-reply"
                        onClick={() => openReplyModal(request)}
                        style={{
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      >
                        Trả lời
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Request Detail Modal */}
      {showDetailModal && selectedRequest && (
        <div className="modal-overlay" onClick={closeDetailModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Chi tiết yêu cầu hỗ trợ #{selectedRequest.id}</h2>
              <button className="close-btn" onClick={closeDetailModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-section">
                <h3>Thông tin khách hàng</h3>
                <div className="detail-grid">
                  <div><strong>ID:</strong> #{selectedRequest.id}</div>
                  <div><strong>Họ tên:</strong> {selectedRequest.name || 'N/A'}</div>
                  <div><strong>Email:</strong> {selectedRequest.email || 'N/A'}</div>
                  <div><strong>Số điện thoại:</strong> {selectedRequest.phone || 'N/A'}</div>
                  <div><strong>Chủ đề:</strong> {getSubjectLabel(selectedRequest.subject)}</div>
                  <div><strong>Trạng thái:</strong> {getStatusBadge(selectedRequest.status)}</div>
                  <div><strong>Ngày gửi:</strong> {formatDate(selectedRequest.date)}</div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Nội dung yêu cầu</h3>
                <div className="message-content">
                  <p>{selectedRequest.message || 'Không có nội dung'}</p>
                </div>
              </div>
            </div>
            {/* Hiển thị phản hồi nếu đã có */}
            {selectedRequest.reply && (
              <div className="detail-section">
                <h3>📧 Phản hồi đã gửi</h3>
                <div style={{ background: '#d1fae5', padding: '15px', borderRadius: '10px', border: '1px solid #10b981' }}>
                  <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{selectedRequest.reply}</p>
                  <p style={{ margin: '10px 0 0', fontSize: '12px', color: '#059669' }}>
                    Đã gửi lúc: {formatDate(selectedRequest.replyDate)}
                  </p>
                </div>
              </div>
            )}

            <div className="modal-footer">
              <button 
                className="btn-success"
                onClick={() => openReplyModal(selectedRequest)}
                style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
              >
                ✉️ Trả lời qua Email
              </button>
              <button 
                className="btn-danger"
                onClick={() => deleteRequest(selectedRequest.id)}
              >
                Xóa yêu cầu
              </button>
              <button className="btn-primary" onClick={closeDetailModal}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && selectedRequest && (
        <div className="modal-overlay" onClick={() => setShowReplyModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="modal-header" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white' }}>
              <h2>✉️ Trả lời yêu cầu hỗ trợ</h2>
              <button className="close-btn" onClick={() => setShowReplyModal(false)} style={{ color: 'white' }}>×</button>
            </div>
            <div className="modal-body">
              {/* Thông tin khách hàng */}
              <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
                <p style={{ margin: '5px 0' }}><strong>Gửi đến:</strong> {selectedRequest.name}</p>
                <p style={{ margin: '5px 0' }}><strong>Email:</strong> {selectedRequest.email}</p>
                <p style={{ margin: '5px 0' }}><strong>Chủ đề:</strong> {getSubjectLabel(selectedRequest.subject)}</p>
              </div>

              {/* Nội dung yêu cầu gốc */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>
                  Nội dung yêu cầu của khách:
                </label>
                <div style={{ background: '#fef3c7', padding: '15px', borderRadius: '10px', border: '1px solid #fbbf24' }}>
                  <p style={{ margin: 0, fontStyle: 'italic' }}>"{selectedRequest.message}"</p>
                </div>
              </div>

              {/* Nội dung trả lời */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>
                  Nội dung trả lời: <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Nhập nội dung phản hồi cho khách hàng..."
                  rows="6"
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '10px',
                    fontSize: '14px',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {/* Gợi ý mẫu trả lời */}
              <div style={{ marginTop: '15px' }}>
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>Mẫu trả lời nhanh:</p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setReplyMessage('Cảm ơn bạn đã liên hệ. Chúng tôi đã tiếp nhận yêu cầu của bạn và sẽ xử lý trong thời gian sớm nhất.')}
                    style={{ padding: '8px 12px', background: '#e2e8f0', border: 'none', borderRadius: '20px', fontSize: '12px', cursor: 'pointer' }}
                  >
                    Đã tiếp nhận
                  </button>
                  <button
                    type="button"
                    onClick={() => setReplyMessage('Vấn đề của bạn đã được giải quyết. Nếu cần hỗ trợ thêm, vui lòng liên hệ hotline 0983592506.')}
                    style={{ padding: '8px 12px', background: '#e2e8f0', border: 'none', borderRadius: '20px', fontSize: '12px', cursor: 'pointer' }}
                  >
                    Đã giải quyết
                  </button>
                  <button
                    type="button"
                    onClick={() => setReplyMessage('Chúng tôi cần thêm thông tin để hỗ trợ bạn tốt hơn. Vui lòng cung cấp mã đơn hàng hoặc thông tin chi tiết hơn.')}
                    style={{ padding: '8px 12px', background: '#e2e8f0', border: 'none', borderRadius: '20px', fontSize: '12px', cursor: 'pointer' }}
                  >
                    Cần thêm thông tin
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                onClick={() => setShowReplyModal(false)}
                style={{
                  padding: '12px 25px',
                  background: '#e2e8f0',
                  color: '#2d3748',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Hủy
              </button>
              <button 
                onClick={sendReplyEmail}
                disabled={sendingEmail || !replyMessage.trim()}
                style={{
                  padding: '12px 25px',
                  background: sendingEmail || !replyMessage.trim() ? '#ccc' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: sendingEmail || !replyMessage.trim() ? 'not-allowed' : 'pointer'
                }}
              >
                {sendingEmail ? '⏳ Đang gửi...' : '📧 Gửi Email'}
              </button>
            </div>
          </div>
        </div>
      )}
      </>
      )}

      {/* Tab Đánh giá */}
      {activeTab === 'reviews' && (
      <>
        {/* Reviews Statistics */}
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <h3>Tổng đánh giá</h3>
              <p className="stat-value">{totalReviews}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>Điểm trung bình</h3>
              <p className="stat-value" style={{color: '#fbbf24'}}>{avgRating} ⭐</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🌟</div>
            <div className="stat-info">
              <h3>5 sao</h3>
              <p className="stat-value success">{fiveStarReviews}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚠️</div>
            <div className="stat-info">
              <h3>Đánh giá thấp</h3>
              <p className="stat-value warning">{lowRatingReviews}</p>
            </div>
          </div>
        </div>

        {/* Reviews Filters */}
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Tìm theo khách hàng, nội dung, mã đơn..."
              value={reviewSearch}
              onChange={(e) => setReviewSearch(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          <div className="filter-box">
            <label>Lọc theo số sao:</label>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">Tất cả</option>
              <option value="5">5 sao ⭐⭐⭐⭐⭐</option>
              <option value="4">4 sao ⭐⭐⭐⭐</option>
              <option value="3">3 sao ⭐⭐⭐</option>
              <option value="2">2 sao ⭐⭐</option>
              <option value="1">1 sao ⭐</option>
            </select>
          </div>
        </div>

        {/* Reviews Table */}
        <div className="requests-table-container">
          {filteredReviews.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">⭐</div>
              <h3>Chưa có đánh giá nào</h3>
              <p>Chưa có khách hàng nào đánh giá sản phẩm</p>
            </div>
          ) : (
            <table className="requests-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Khách hàng</th>
                  <th>Mã đơn hàng</th>
                  <th>Đánh giá</th>
                  <th>Nội dung</th>
                  <th>Ngày đánh giá</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map(review => (
                  <tr key={review.id}>
                    <td className="request-id">#{review.id?.toString().slice(-6)}</td>
                    <td className="customer-name">{review.userId || 'Ẩn danh'}</td>
                    <td>#{review.orderId?.toString().slice(-6)}</td>
                    <td>
                      <span style={{ color: '#fbbf24', fontSize: '16px' }}>
                        {renderStars(review.rating)}
                      </span>
                    </td>
                    <td style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {review.comment}
                    </td>
                    <td className="request-date">{formatDate(review.createdAt)}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn-view"
                          onClick={() => { setSelectedReview(review); setShowReviewModal(true); }}
                        >
                          Xem
                        </button>
                        <button 
                          className="btn-danger"
                          onClick={() => deleteReview(review.id)}
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Review Detail Modal */}
        {showReviewModal && selectedReview && (
          <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header" style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' }}>
                <h2>⭐ Chi tiết đánh giá</h2>
                <button className="close-btn" onClick={() => setShowReviewModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="detail-section">
                  <h3>Thông tin đánh giá</h3>
                  <div className="detail-grid">
                    <div><strong>Khách hàng:</strong> {selectedReview.userId}</div>
                    <div><strong>Mã đơn hàng:</strong> #{selectedReview.orderId}</div>
                    <div><strong>Ngày đánh giá:</strong> {formatDate(selectedReview.createdAt)}</div>
                    <div>
                      <strong>Đánh giá:</strong>{' '}
                      <span style={{ color: '#fbbf24', fontSize: '20px' }}>{renderStars(selectedReview.rating)}</span>
                      <span style={{ marginLeft: '8px', fontWeight: '600' }}>({selectedReview.rating}/5)</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Nội dung đánh giá</h3>
                  <div className="message-content" style={{ background: '#fffbeb', border: '1px solid #fbbf24' }}>
                    <p>"{selectedReview.comment}"</p>
                  </div>
                </div>

                {selectedReview.products && selectedReview.products.length > 0 && (
                  <div className="detail-section">
                    <h3>Sản phẩm đã mua</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {selectedReview.products.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: '#f8f9fa', borderRadius: '8px' }}>
                          <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', borderRadius: '6px', objectFit: 'cover' }} />
                          <div>
                            <div style={{ fontWeight: '500', fontSize: '14px' }}>{item.name}</div>
                            <div style={{ fontSize: '12px', color: '#6b7280' }}>SL: {item.quantity}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button 
                  className="btn-danger"
                  onClick={() => deleteReview(selectedReview.id)}
                >
                  Xóa đánh giá
                </button>
                <button className="btn-primary" onClick={() => setShowReviewModal(false)}>
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </>
      )}
    </div>
  );
}

export default QuanLyYeuCauHoTro;




