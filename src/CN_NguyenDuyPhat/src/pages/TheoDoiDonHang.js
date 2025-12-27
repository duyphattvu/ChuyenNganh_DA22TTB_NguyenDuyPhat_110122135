import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './TheoDoiDonHang.css';

// Mô phỏng lịch sử trạng thái đơn hàng
const generateOrderHistory = (order) => {
  const createdDate = new Date(order.createdAt);
  const history = [
    {
      status: 'Đặt hàng thành công',
      description: 'Đơn hàng đã được tạo và đang chờ xác nhận',
      time: createdDate,
      icon: '📝',
      completed: true
    }
  ];

  if (order.status !== 'Đã hủy') {
    // Xác nhận đơn hàng (sau 30 phút)
    const confirmTime = new Date(createdDate.getTime() + 30 * 60000);
    if (order.status !== 'Đang xử lý' || new Date() > confirmTime) {
      history.push({
        status: 'Đã xác nhận',
        description: 'Shop đã xác nhận đơn hàng và đang chuẩn bị',
        time: confirmTime,
        icon: '✅',
        completed: order.status !== 'Đang xử lý'
      });
    }

    // Đang đóng gói (sau 2 giờ)
    const packingTime = new Date(createdDate.getTime() + 2 * 3600000);
    if (['Đang giao hàng', 'Đã hoàn thành'].includes(order.status)) {
      history.push({
        status: 'Đang đóng gói',
        description: 'Sản phẩm đang được đóng gói cẩn thận',
        time: packingTime,
        icon: '📦',
        completed: true
      });
    }

    // Đã giao cho vận chuyển (sau 4 giờ)
    const shippingTime = new Date(createdDate.getTime() + 4 * 3600000);
    if (['Đang giao hàng', 'Đã hoàn thành'].includes(order.status)) {
      history.push({
        status: 'Đã giao cho đơn vị vận chuyển',
        description: `Đơn hàng đang được vận chuyển đến ${order.shippingInfo?.city || 'địa chỉ của bạn'}`,
        time: shippingTime,
        icon: '🚚',
        completed: true
      });
    }

    // Đang giao hàng
    if (order.status === 'Đang giao hàng') {
      const deliveryTime = new Date(createdDate.getTime() + 24 * 3600000);
      history.push({
        status: 'Đang giao hàng',
        description: 'Shipper đang trên đường giao hàng đến bạn',
        time: deliveryTime,
        icon: '🏃',
        completed: false,
        current: true
      });
    }

    // Đã hoàn thành
    if (order.status === 'Đã hoàn thành') {
      const completeTime = new Date(createdDate.getTime() + 48 * 3600000);
      history.push({
        status: 'Giao hàng thành công',
        description: 'Đơn hàng đã được giao thành công. Cảm ơn bạn!',
        time: completeTime,
        icon: '🎉',
        completed: true
      });
    }
  } else {
    // Đã hủy
    history.push({
      status: 'Đã hủy',
      description: 'Đơn hàng đã bị hủy',
      time: new Date(createdDate.getTime() + 60000),
      icon: '❌',
      completed: true,
      cancelled: true
    });
  }

  return history;
};

function TheoDoiDonHang() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchId, setSearchId] = useState('');
  
  // Modal states
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [currentOrderForAction, setCurrentOrderForAction] = useState(null);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });
  const [supportData, setSupportData] = useState({ subject: '', message: '' });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      navigate('/dang-nhap');
      return;
    }
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const userOrders = allOrders.filter(order => 
      order.user === user?.name || 
      order.user === user?.email || 
      order.shippingInfo?.email === user?.email
    );
    setOrders(userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  }, [isAuthenticated, user, navigate, loading]);

  if (loading) {
    return (
      <div className="tracking-loading">
        <div className="spinner"></div>
        <p>Đang tải...</p>
      </div>
    );
  }

  const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
  const formatDate = (date) => new Date(date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const formatTime = (date) => new Date(date).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  const formatDateTime = (date) => `${formatTime(date)} - ${formatDate(date)}`;

  const getStatusConfig = (status) => {
    const config = {
      'Đang xử lý': { color: '#f59e0b', bg: '#fffbeb', icon: '⏳', progress: 25 },
      'Đang giao hàng': { color: '#3b82f6', bg: '#eff6ff', icon: '🚚', progress: 75 },
      'Đã hoàn thành': { color: '#10b981', bg: '#ecfdf5', icon: '✓', progress: 100 },
      'Đã hủy': { color: '#ef4444', bg: '#fef2f2', icon: '✕', progress: 0 }
    };
    return config[status] || { color: '#6b7280', bg: '#f9fafb', icon: '?', progress: 0 };
  };

  // Filter orders
  let filteredOrders = orders;
  if (filter !== 'all') {
    filteredOrders = orders.filter(o => o.status === filter);
  }
  if (searchId) {
    filteredOrders = filteredOrders.filter(o => o.id.toString().includes(searchId));
  }

  const stats = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'Đang xử lý').length,
    shipping: orders.filter(o => o.status === 'Đang giao hàng').length,
    completed: orders.filter(o => o.status === 'Đã hoàn thành').length
  };

  const copyOrderId = (id) => {
    navigator.clipboard.writeText(id.toString());
    alert('Đã sao chép mã đơn hàng!');
  };

  // Mở modal đánh giá
  const openReviewModal = (order) => {
    setCurrentOrderForAction(order);
    setReviewData({ rating: 5, comment: '' });
    setSubmitSuccess(false);
    setShowReviewModal(true);
  };

  // Mở modal hỗ trợ
  const openSupportModal = (order) => {
    setCurrentOrderForAction(order);
    setSupportData({ subject: '', message: '' });
    setSubmitSuccess(false);
    setShowSupportModal(true);
  };

  // Gửi đánh giá
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewData.comment.trim()) {
      alert('Vui lòng nhập nội dung đánh giá!');
      return;
    }
    
    const review = {
      id: Date.now(),
      orderId: currentOrderForAction.id,
      userId: user?.name,
      rating: reviewData.rating,
      comment: reviewData.comment,
      products: currentOrderForAction.items,
      createdAt: new Date().toISOString()
    };
    
    const reviews = JSON.parse(localStorage.getItem('productReviews') || '[]');
    reviews.push(review);
    localStorage.setItem('productReviews', JSON.stringify(reviews));
    
    setSubmitSuccess(true);
    setTimeout(() => {
      setShowReviewModal(false);
      setSubmitSuccess(false);
    }, 2000);
  };

  // Gửi yêu cầu hỗ trợ
  const handleSubmitSupport = (e) => {
    e.preventDefault();
    if (!supportData.subject || !supportData.message.trim()) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    
    const supportRequest = {
      id: Date.now(),
      orderId: currentOrderForAction.id,
      userId: user?.name,
      userEmail: user?.email,
      subject: supportData.subject,
      message: supportData.message,
      status: 'Chờ xử lý',
      createdAt: new Date().toISOString()
    };
    
    const requests = JSON.parse(localStorage.getItem('supportRequests') || '[]');
    requests.push(supportRequest);
    localStorage.setItem('supportRequests', JSON.stringify(requests));
    
    setSubmitSuccess(true);
    setTimeout(() => {
      setShowSupportModal(false);
      setSubmitSuccess(false);
    }, 2000);
  };

  return (
    <div className="tracking-page">
      {/* Header */}
      <div className="tracking-header">
        <div className="tracking-header-content">
          <h1>Đơn hàng của tôi</h1>
          <p>Xin chào, <strong>{user?.name}</strong>! Theo dõi và quản lý đơn hàng của bạn.</p>
        </div>
      </div>

      <div className="tracking-container">
        {/* Search & Filter */}
        <div className="tracking-toolbar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Tìm theo mã đơn hàng..." 
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>
          <div className="filter-tabs">
            {[
              { label: 'Tất cả', value: 'all', count: stats.all },
              { label: 'Đang xử lý', value: 'Đang xử lý', count: stats.pending },
              { label: 'Đang giao', value: 'Đang giao hàng', count: stats.shipping },
              { label: 'Hoàn thành', value: 'Đã hoàn thành', count: stats.completed }
            ].map(tab => (
              <button 
                key={tab.value}
                className={`filter-tab ${filter === tab.value ? 'active' : ''}`}
                onClick={() => setFilter(tab.value)}
              >
                {tab.label} <span className="count">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>Không tìm thấy đơn hàng</h3>
            <p>{searchId ? 'Không có đơn hàng nào khớp với mã tìm kiếm' : 'Bạn chưa có đơn hàng nào'}</p>
            <button className="btn-primary" onClick={() => navigate('/')}>Mua sắm ngay</button>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map(order => {
              const status = getStatusConfig(order.status);
              const isExpanded = selectedOrder === order.id;
              const itemCount = order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
              const history = generateOrderHistory(order);
              
              return (
                <div key={order.id} className={`order-card ${isExpanded ? 'expanded' : ''}`}>
                  {/* Order Header */}
                  <div className="order-header" onClick={() => setSelectedOrder(isExpanded ? null : order.id)}>
                    <div className="order-preview">
                      <div className="order-images">
                        {order.items?.slice(0, 3).map((item, idx) => (
                          <img key={idx} src={item.image} alt="" style={{ zIndex: 3 - idx }} />
                        ))}
                        {order.items?.length > 3 && (
                          <div className="more-items">+{order.items.length - 3}</div>
                        )}
                      </div>
                      <div className="order-basic-info">
                        <div className="order-id">
                          Đơn hàng <span>#{order.id.toString().slice(-8)}</span>
                          <button className="btn-copy" onClick={(e) => { e.stopPropagation(); copyOrderId(order.id); }}>📋</button>
                        </div>
                        <div className="order-meta">
                          {formatDateTime(order.createdAt)} • {itemCount} sản phẩm
                        </div>
                      </div>
                    </div>
                    <div className="order-summary">
                      <div className="order-total">{formatPrice(order.total)}</div>
                      <div className="order-status" style={{ background: status.bg, color: status.color }}>
                        <span>{status.icon}</span> {order.status}
                      </div>
                      <div className={`expand-icon ${isExpanded ? 'rotated' : ''}`}>▼</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {order.status !== 'Đã hủy' && (
                    <div className="progress-bar-container">
                      <div className="progress-bar" style={{ width: `${status.progress}%` }}></div>
                    </div>
                  )}

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="order-details">
                      {/* Timeline */}
                      <div className="detail-section">
                        <h4>📍 Lịch sử đơn hàng</h4>
                        <div className="timeline">
                          {history.map((event, idx) => (
                            <div key={idx} className={`timeline-item ${event.completed ? 'completed' : ''} ${event.current ? 'current' : ''} ${event.cancelled ? 'cancelled' : ''}`}>
                              <div className="timeline-icon">{event.icon}</div>
                              <div className="timeline-content">
                                <div className="timeline-status">{event.status}</div>
                                <div className="timeline-desc">{event.description}</div>
                                <div className="timeline-time">{formatDateTime(event.time)}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Products */}
                      <div className="detail-section">
                        <h4>🛍️ Sản phẩm ({order.items?.length})</h4>
                        <div className="products-list">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="product-item">
                              <img src={item.image} alt={item.name} />
                              <div className="product-info">
                                <div className="product-name">{item.name}</div>
                                <div className="product-variant">
                                  Size: {item.size || '-'} | Màu: {typeof item.color === 'object' ? item.color?.name : (item.color || '-')}
                                </div>
                                <div className="product-qty">x{item.quantity}</div>
                              </div>
                              <div className="product-price">{formatPrice((item.salePrice || item.price) * item.quantity)}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Info Grid */}
                      <div className="info-grid">
                        <div className="info-card">
                          <h5>📍 Địa chỉ nhận hàng</h5>
                          <p className="info-name">{order.shippingInfo?.fullName}</p>
                          <p className="info-phone">{order.shippingInfo?.phone}</p>
                          <p className="info-address">
                            {order.shippingInfo?.address}, {order.shippingInfo?.district}, {order.shippingInfo?.city}
                          </p>
                        </div>
                        <div className="info-card">
                          <h5>💳 Thanh toán</h5>
                          <p className="payment-method">
                            {order.shippingInfo?.paymentMethod === 'cod' ? '💵 COD - Thanh toán khi nhận' : '🏦 Chuyển khoản ngân hàng'}
                          </p>
                          <div className="payment-details">
                            <div className="payment-row">
                              <span>Tạm tính</span>
                              <span>{formatPrice(order.subtotal || order.total)}</span>
                            </div>
                            <div className="payment-row">
                              <span>Phí vận chuyển</span>
                              <span className={order.shippingFee === 0 ? 'free' : ''}>
                                {order.shippingFee === 0 ? 'Miễn phí' : formatPrice(order.shippingFee || 0)}
                              </span>
                            </div>
                            <div className="payment-row total">
                              <span>Tổng cộng</span>
                              <span>{formatPrice(order.total)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="order-actions">
                        {order.status === 'Đã hoàn thành' && (
                          <button className="btn-action btn-review" onClick={() => openReviewModal(order)}>⭐ Đánh giá</button>
                        )}
                        <button className="btn-action btn-support" onClick={() => openSupportModal(order)}>
                          💬 Liên hệ hỗ trợ
                        </button>
                        {order.status === 'Đang xử lý' && (
                          <button className="btn-action btn-cancel">❌ Hủy đơn</button>
                        )}
                        <button className="btn-action btn-rebuy" onClick={() => navigate('/')}>🔄 Mua lại</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Đánh giá */}
      {showReviewModal && currentOrderForAction && (
        <div className="modal-overlay">
          <div className="modal-content">
            {submitSuccess ? (
              <div className="modal-success">
                <div className="success-icon">✅</div>
                <h3>Cảm ơn bạn đã đánh giá!</h3>
                <p>Đánh giá của bạn đã được ghi nhận.</p>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h3>⭐ Đánh giá đơn hàng</h3>
                  <button className="modal-close" onClick={() => setShowReviewModal(false)}>×</button>
                </div>
                <div className="modal-body">
                  <div className="order-info-mini">
                    <span>Đơn hàng #{currentOrderForAction.id.toString().slice(-8)}</span>
                    <span>{currentOrderForAction.items?.length} sản phẩm</span>
                  </div>
                  
                  <form onSubmit={handleSubmitReview}>
                    <div className="form-group">
                      <label>Đánh giá của bạn</label>
                      <div className="rating-stars">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            className={`star ${star <= reviewData.rating ? 'active' : ''}`}
                            onClick={() => setReviewData({ ...reviewData, rating: star })}
                          >
                            ★
                          </button>
                        ))}
                        <span className="rating-text">
                          {reviewData.rating === 5 ? 'Tuyệt vời' : 
                           reviewData.rating === 4 ? 'Hài lòng' :
                           reviewData.rating === 3 ? 'Bình thường' :
                           reviewData.rating === 2 ? 'Không hài lòng' : 'Rất tệ'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Nhận xét của bạn *</label>
                      <textarea
                        value={reviewData.comment}
                        onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                        placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                        rows="4"
                        required
                      />
                    </div>
                    
                    <div className="modal-actions">
                      <button type="button" className="btn-cancel-modal" onClick={() => setShowReviewModal(false)}>Hủy</button>
                      <button type="submit" className="btn-submit-modal">Gửi đánh giá</button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modal Hỗ trợ */}
      {showSupportModal && currentOrderForAction && (
        <div className="modal-overlay">
          <div className="modal-content">
            {submitSuccess ? (
              <div className="modal-success">
                <div className="success-icon">✅</div>
                <h3>Gửi yêu cầu thành công!</h3>
                <p>Chúng tôi sẽ phản hồi trong vòng 24 giờ.</p>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h3>💬 Liên hệ hỗ trợ</h3>
                  <button className="modal-close" onClick={() => setShowSupportModal(false)}>×</button>
                </div>
                <div className="modal-body">
                  <div className="order-info-mini">
                    <span>Đơn hàng #{currentOrderForAction.id.toString().slice(-8)}</span>
                    <span>Trạng thái: {currentOrderForAction.status}</span>
                  </div>
                  
                  <form onSubmit={handleSubmitSupport}>
                    <div className="form-group">
                      <label>Chủ đề hỗ trợ *</label>
                      <select
                        value={supportData.subject}
                        onChange={(e) => setSupportData({ ...supportData, subject: e.target.value })}
                        required
                      >
                        <option value="">-- Chọn chủ đề --</option>
                        <option value="Thay đổi địa chỉ giao hàng">Thay đổi địa chỉ giao hàng</option>
                        <option value="Thay đổi sản phẩm">Thay đổi sản phẩm/size/màu</option>
                        <option value="Hủy đơn hàng">Hủy đơn hàng</option>
                        <option value="Kiểm tra tình trạng đơn">Kiểm tra tình trạng đơn hàng</option>
                        <option value="Khiếu nại sản phẩm">Khiếu nại sản phẩm</option>
                        <option value="Đổi/trả hàng">Yêu cầu đổi/trả hàng</option>
                        <option value="Khác">Vấn đề khác</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Mô tả chi tiết *</label>
                      <textarea
                        value={supportData.message}
                        onChange={(e) => setSupportData({ ...supportData, message: e.target.value })}
                        placeholder="Mô tả chi tiết vấn đề bạn cần hỗ trợ..."
                        rows="4"
                        required
                      />
                    </div>
                    
                    <div className="support-contact-info">
                      <p>📞 Hotline: <strong>0983592506</strong></p>
                      <p>✉️ Email: <strong>nguyenduyphat2019@gmail.com</strong></p>
                    </div>
                    
                    <div className="modal-actions">
                      <button type="button" className="btn-cancel-modal" onClick={() => setShowSupportModal(false)}>Hủy</button>
                      <button type="submit" className="btn-submit-modal">Gửi yêu cầu</button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TheoDoiDonHang;
