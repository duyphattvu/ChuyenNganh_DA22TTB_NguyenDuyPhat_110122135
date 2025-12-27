import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuanLyDonHang.css';

function QuanLyDonHang() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showRevenueModal, setShowRevenueModal] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Load đơn hàng từ localStorage
  useEffect(() => {
    loadOrders();
  }, []);

  // Filter orders khi search hoặc status thay đổi
  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(order => 
        order.id.toString().includes(term) ||
        order.user?.toLowerCase().includes(term) ||
        order.shippingInfo?.fullName?.toLowerCase().includes(term) ||
        order.shippingInfo?.phone?.includes(term) ||
        order.shippingInfo?.email?.toLowerCase().includes(term)
      );
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredOrders(filtered);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(price);
  };

  const formatDate = (dateString) => {
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
      'Chờ thanh toán': { label: 'Chờ thanh toán', class: 'status-pending' },
      'Đang xử lý': { label: 'Đang xử lý', class: 'status-processing' },
      'Đang giao hàng': { label: 'Đang giao hàng', class: 'status-shipping' },
      'Đã hoàn thành': { label: 'Đã hoàn thành', class: 'status-completed' },
      'Đã hủy': { label: 'Đã hủy', class: 'status-cancelled' }
    };

    const statusInfo = statusMap[status] || { label: status, class: 'status-default' };
    return (
      <span className={`status-badge ${statusInfo.class}`}>
        {statusInfo.label}
      </span>
    );
  };

  const confirmPayment = (orderId) => {
    if (window.confirm('Xác nhận đã nhận được thanh toán từ khách hàng?')) {
      const updatedOrders = orders.map(order => 
        order.id === orderId
          ? { 
              ...order, 
              status: 'Đang xử lý',
              paymentStatus: 'Đã thanh toán'
            }
          : order
      );
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: 'Đang xử lý', paymentStatus: 'Đã thanh toán' });
      }
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    // Cập nhật selected order nếu đang mở
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const viewOrderDetail = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedOrder(null);
  };

  const deleteOrder = (orderId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      const updatedOrders = orders.filter(order => order.id !== orderId);
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      if (selectedOrder && selectedOrder.id === orderId) {
        closeDetailModal();
      }
    }
  };

  // Tính toán thống kê
  const totalRevenue = orders
    .filter(order => order.status === 'Đã hoàn thành')
    .reduce((sum, order) => sum + order.total, 0);

  // Doanh thu tháng này
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyRevenue = orders
    .filter(order => {
      const orderDate = new Date(order.createdAt);
      return order.status === 'Đã hoàn thành' && 
             orderDate.getMonth() === currentMonth && 
             orderDate.getFullYear() === currentYear;
    })
    .reduce((sum, order) => sum + order.total, 0);

  // Doanh thu tháng trước
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const lastMonthRevenue = orders
    .filter(order => {
      const orderDate = new Date(order.createdAt);
      return order.status === 'Đã hoàn thành' && 
             orderDate.getMonth() === lastMonth && 
             orderDate.getFullYear() === lastMonthYear;
    })
    .reduce((sum, order) => sum + order.total, 0);

  // Tính phần trăm tăng trưởng
  const growthRate = lastMonthRevenue > 0 
    ? ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1)
    : monthlyRevenue > 0 ? 100 : 0;

  const totalOrders = orders.length;
  const pendingPaymentOrders = orders.filter(o => o.status === 'Chờ thanh toán').length;
  const pendingOrders = orders.filter(o => o.status === 'Đang xử lý').length;
  const shippingOrders = orders.filter(o => o.status === 'Đang giao hàng').length;
  const completedOrders = orders.filter(o => o.status === 'Đã hoàn thành').length;

  // Tính doanh thu theo khoảng thời gian
  const getRevenueByDateRange = () => {
    let filtered = orders.filter(order => order.status === 'Đã hoàn thành');
    
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      fromDate.setHours(0, 0, 0, 0);
      filtered = filtered.filter(order => new Date(order.createdAt) >= fromDate);
    }
    
    if (dateTo) {
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(order => new Date(order.createdAt) <= toDate);
    }
    
    return filtered;
  };

  const filteredRevenueOrders = getRevenueByDateRange();
  const filteredRevenue = filteredRevenueOrders.reduce((sum, order) => sum + order.total, 0);
  const filteredOrderCount = filteredRevenueOrders.length;

  // Thống kê doanh thu theo sản phẩm
  const getProductRevenue = () => {
    const productStats = {};
    
    filteredRevenueOrders.forEach(order => {
      order.items?.forEach(item => {
        const productId = item.id;
        const price = item.salePrice || item.price;
        const revenue = price * item.quantity;
        
        if (productStats[productId]) {
          productStats[productId].quantity += item.quantity;
          productStats[productId].revenue += revenue;
          productStats[productId].orderCount += 1;
        } else {
          productStats[productId] = {
            id: productId,
            name: item.name,
            image: item.image,
            quantity: item.quantity,
            revenue: revenue,
            orderCount: 1,
            price: price
          };
        }
      });
    });
    
    // Sắp xếp theo doanh thu giảm dần
    return Object.values(productStats).sort((a, b) => b.revenue - a.revenue);
  };

  const productRevenueList = getProductRevenue();

  return (
    <div className="quan-ly-don-hang">
      <div className="admin-header">
        <h1>📦 Quản Lý Đơn Hàng</h1>
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Về trang chủ
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>Tổng đơn hàng</h3>
            <p className="stat-value">{totalOrders}</p>
            <span className="stat-subtitle">Tất cả thời gian</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>Đã hoàn thành</h3>
            <p className="stat-value success">{completedOrders}</p>
            <span className="stat-subtitle">Đơn thành công</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Chờ thanh toán</h3>
            <p className="stat-value warning">{pendingPaymentOrders}</p>
            <span className="stat-subtitle">Cần xác nhận</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>Đang xử lý</h3>
            <p className="stat-value info">{pendingOrders}</p>
            <span className="stat-subtitle">Đã thanh toán</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚚</div>
          <div className="stat-info">
            <h3>Đang giao</h3>
            <p className="stat-value success">{shippingOrders}</p>
            <span className="stat-subtitle">Đang vận chuyển</span>
          </div>
        </div>
      </div>

      {/* Revenue Cards */}
      <div className="revenue-cards">
        <div className="revenue-card">
          <div className="revenue-header">
            <div className="revenue-icon">💰</div>
            <div className="revenue-info">
              <h3>Tổng doanh thu</h3>
              <p className="revenue-value">{formatPrice(totalRevenue)}</p>
              <span className="revenue-subtitle">Tất cả thời gian</span>
            </div>
          </div>
        </div>
        <div className="revenue-card">
          <div className="revenue-header">
            <div className="revenue-icon">📅</div>
            <div className="revenue-info">
              <h3>Doanh thu tháng này</h3>
              <p className="revenue-value monthly">{formatPrice(monthlyRevenue)}</p>
              <span className="revenue-subtitle">
                Tháng {currentMonth + 1}/{currentYear}
              </span>
            </div>
          </div>
        </div>
        <div className="revenue-card clickable" onClick={() => setShowRevenueModal(true)}>
          <div className="revenue-header">
            <div className="revenue-icon">📊</div>
            <div className="revenue-info">
              <h3>Thống kê chi tiết</h3>
              <p className="revenue-value view-detail">Xem báo cáo</p>
              <span className="revenue-subtitle">
                Theo ngày & sản phẩm →
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Search & Filters */}
      <div className="search-filters-container">
        <div className="search-section">
          <h3>🔍 Tìm kiếm & Lọc đơn hàng</h3>
          <div className="filters-section">
            <div className="search-box">
              <input
                type="text"
                placeholder="Tìm kiếm theo mã đơn, tên khách hàng, email, số điện thoại..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
            <div className="filter-box">
              <label>Trạng thái:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">Tất cả ({totalOrders})</option>
                <option value="Chờ thanh toán">Chờ thanh toán ({pendingPaymentOrders})</option>
                <option value="Đang xử lý">Đang xử lý ({pendingOrders})</option>
                <option value="Đang giao hàng">Đang giao hàng ({shippingOrders})</option>
                <option value="Đã hoàn thành">Đã hoàn thành ({completedOrders})</option>
                <option value="Đã hủy">Đã hủy ({orders.filter(o => o.status === 'Đã hủy').length})</option>
              </select>
            </div>
          </div>
          {(searchTerm || statusFilter !== 'all') && (
            <div className="search-results-info">
              <span>Hiển thị {filteredOrders.length} / {totalOrders} đơn hàng</span>
              {searchTerm && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchTerm('')}
                >
                  Xóa tìm kiếm ✕
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-table-container">
        {filteredOrders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>Không có đơn hàng nào</h3>
            <p>Chưa có đơn hàng nào phù hợp với bộ lọc của bạn</p>
          </div>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>Sản phẩm</th>
                <th>Tổng tiền</th>
                <th>Ngày đặt</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td className="order-id">#{order.id}</td>
                  <td>
                    <div className="customer-info">
                      <strong>{order.shippingInfo?.fullName || order.user}</strong>
                      <span>{order.shippingInfo?.phone}</span>
                    </div>
                  </td>
                  <td>
                    <div className="products-count">
                      {order.items?.length || 0} sản phẩm
                    </div>
                  </td>
                  <td className="total-price">{formatPrice(order.total)}</td>
                  <td className="order-date">{formatDate(order.createdAt)}</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-view"
                        onClick={() => viewOrderDetail(order)}
                      >
                        Xem
                      </button>
                      {order.status === 'Chờ thanh toán' ? (
                        <button
                          className="btn-confirm-payment"
                          onClick={() => confirmPayment(order.id)}
                          style={{
                            background: '#28a745',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}
                        >
                          ✓ Xác nhận thanh toán
                        </button>
                      ) : (
                        <select
                          className="status-select"
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        >
                          <option value="Đang xử lý">Đang xử lý</option>
                          <option value="Đang giao hàng">Đang giao hàng</option>
                          <option value="Đã hoàn thành">Đã hoàn thành</option>
                          <option value="Đã hủy">Đã hủy</option>
                        </select>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Revenue Statistics Modal */}
      {showRevenueModal && (
        <div className="modal-overlay" onClick={() => setShowRevenueModal(false)}>
          <div className="modal-content revenue-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📊 Thống Kê Doanh Thu Chi Tiết</h2>
              <button className="close-btn" onClick={() => setShowRevenueModal(false)}>×</button>
            </div>
            <div className="modal-body">
              {/* Date Range Filter */}
              <div className="detail-section">
                <h3>📅 Chọn khoảng thời gian</h3>
                <div className="date-range-filter">
                  <div className="date-input-group">
                    <label>Từ ngày:</label>
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="date-input"
                    />
                  </div>
                  <div className="date-input-group">
                    <label>Đến ngày:</label>
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="date-input"
                    />
                  </div>
                  <button 
                    className="btn-clear-date"
                    onClick={() => { setDateFrom(''); setDateTo(''); }}
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              </div>

              {/* Revenue Summary */}
              <div className="detail-section">
                <h3>💰 Tổng quan doanh thu</h3>
                <div className="revenue-summary-cards">
                  <div className="summary-card">
                    <span className="summary-label">Tổng doanh thu</span>
                    <span className="summary-value">{formatPrice(filteredRevenue)}</span>
                  </div>
                  <div className="summary-card">
                    <span className="summary-label">Số đơn hoàn thành</span>
                    <span className="summary-value">{filteredOrderCount}</span>
                  </div>
                  <div className="summary-card">
                    <span className="summary-label">Trung bình/đơn</span>
                    <span className="summary-value">
                      {filteredOrderCount > 0 ? formatPrice(filteredRevenue / filteredOrderCount) : formatPrice(0)}
                    </span>
                  </div>
                </div>
                {(dateFrom || dateTo) && (
                  <p className="date-range-info">
                    📆 Thời gian: {dateFrom || 'Bắt đầu'} → {dateTo || 'Hiện tại'}
                  </p>
                )}
              </div>

              {/* Product Revenue */}
              <div className="detail-section">
                <h3>🏆 Doanh thu theo sản phẩm</h3>
                {productRevenueList.length === 0 ? (
                  <div className="empty-product-stats">
                    <p>Chưa có dữ liệu doanh thu trong khoảng thời gian này</p>
                  </div>
                ) : (
                  <div className="product-revenue-list">
                    <div className="product-revenue-header">
                      <span className="col-rank">#</span>
                      <span className="col-product">Sản phẩm</span>
                      <span className="col-qty">SL bán</span>
                      <span className="col-orders">Đơn hàng</span>
                      <span className="col-revenue">Doanh thu</span>
                    </div>
                    {productRevenueList.map((product, index) => (
                      <div key={product.id} className="product-revenue-item">
                        <span className="col-rank">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                        </span>
                        <div className="col-product">
                          <img src={product.image} alt={product.name} className="product-thumb" />
                          <div className="product-info">
                            <span className="product-name">{product.name}</span>
                            <span className="product-price">{formatPrice(product.price)}/sp</span>
                          </div>
                        </div>
                        <span className="col-qty">{product.quantity}</span>
                        <span className="col-orders">{product.orderCount}</span>
                        <span className="col-revenue">{formatPrice(product.revenue)}</span>
                      </div>
                    ))}
                    <div className="product-revenue-total">
                      <span>Tổng cộng:</span>
                      <span>{productRevenueList.reduce((sum, p) => sum + p.quantity, 0)} sản phẩm</span>
                      <span>{formatPrice(filteredRevenue)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-primary" onClick={() => setShowRevenueModal(false)}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="modal-overlay" onClick={closeDetailModal}>
          <div className="modal-content order-detail-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="order-modal-header">
              <div className="order-modal-title">
                <span className="order-number">Đơn hàng #{selectedOrder.id.toString().slice(-8)}</span>
                <span className={`order-status-tag ${selectedOrder.status === 'Đã hoàn thành' ? 'completed' : selectedOrder.status === 'Đang giao hàng' ? 'shipping' : selectedOrder.status === 'Đã hủy' ? 'cancelled' : 'processing'}`}>
                  {selectedOrder.status}
                </span>
              </div>
              <button className="close-btn" onClick={closeDetailModal}>×</button>
            </div>

            <div className="order-modal-body">
              {/* Two Column Layout */}
              <div className="order-detail-grid">
                {/* Left: Customer Info */}
                <div className="order-detail-card">
                  <h4>👤 Thông tin khách hàng</h4>
                  <div className="customer-detail">
                    <p className="customer-name-large">{selectedOrder.shippingInfo?.fullName || selectedOrder.user}</p>
                    <p><span>📞</span> {selectedOrder.shippingInfo?.phone || 'N/A'}</p>
                    <p><span>✉️</span> {selectedOrder.shippingInfo?.email || 'N/A'}</p>
                  </div>
                  <div className="address-detail">
                    <p className="address-label">Địa chỉ giao hàng:</p>
                    <p className="address-text">
                      {selectedOrder.shippingInfo?.address}, {selectedOrder.shippingInfo?.district}, {selectedOrder.shippingInfo?.city}
                    </p>
                  </div>
                  {selectedOrder.shippingInfo?.note && (
                    <div className="note-detail">
                      <p className="note-label">Ghi chú:</p>
                      <p className="note-text">{selectedOrder.shippingInfo.note}</p>
                    </div>
                  )}
                </div>

                {/* Right: Order Info */}
                <div className="order-detail-card">
                  <h4>📋 Thông tin đơn hàng</h4>
                  <div className="order-info-rows">
                    <div className="info-row">
                      <span>Ngày đặt</span>
                      <span>{formatDate(selectedOrder.createdAt)}</span>
                    </div>
                    <div className="info-row">
                      <span>Thanh toán</span>
                      <span>
                        {selectedOrder.shippingInfo?.paymentMethod === 'cod' ? '💵 COD' : '🏦 Chuyển khoản'}
                        {selectedOrder.paymentStatus && (
                          <span style={{ 
                            marginLeft: '8px', 
                            padding: '2px 8px', 
                            borderRadius: '4px',
                            fontSize: '11px',
                            background: selectedOrder.paymentStatus === 'Đã thanh toán' ? '#d4edda' : '#fff3cd',
                            color: selectedOrder.paymentStatus === 'Đã thanh toán' ? '#155724' : '#856404'
                          }}>
                            {selectedOrder.paymentStatus}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="info-row">
                      <span>Phí ship</span>
                      <span className={selectedOrder.shippingFee === 0 ? 'free-ship' : ''}>
                        {selectedOrder.shippingFee === 0 ? 'Miễn phí' : formatPrice(selectedOrder.shippingFee || 0)}
                      </span>
                    </div>
                    <div className="info-row total-row">
                      <span>Tổng cộng</span>
                      <span className="total-amount">{formatPrice(selectedOrder.total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products List */}
              <div className="order-products-section">
                <h4>🛍️ Sản phẩm ({selectedOrder.items?.length})</h4>
                <div className="products-table">
                  <div className="products-header">
                    <span>Sản phẩm</span>
                    <span>Đơn giá</span>
                    <span>SL</span>
                    <span>Thành tiền</span>
                  </div>
                  {selectedOrder.items?.map((item, index) => (
                    <div key={index} className="product-row">
                      <div className="product-cell">
                        <img src={item.image} alt={item.name} />
                        <div className="product-details">
                          <span className="product-name">{item.name}</span>
                          {item.size && <span className="product-variant">Size: {item.size}</span>}
                          {item.color && <span className="product-variant">Màu: {typeof item.color === 'object' ? item.color.name : item.color}</span>}
                        </div>
                      </div>
                      <div className="price-cell">{formatPrice(item.salePrice || item.price)}</div>
                      <div className="qty-cell">{item.quantity}</div>
                      <div className="subtotal-cell">{formatPrice((item.salePrice || item.price) * item.quantity)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="order-modal-footer">
              {selectedOrder.status === 'Chờ thanh toán' && (
                <button 
                  className="btn-confirm-payment-modal"
                  onClick={() => {
                    confirmPayment(selectedOrder.id);
                    closeDetailModal();
                  }}
                  style={{
                    background: '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginRight: 'auto'
                  }}
                >
                  ✓ Xác nhận đã nhận thanh toán
                </button>
              )}
              <button className="btn-delete" onClick={() => deleteOrder(selectedOrder.id)}>
                🗑️ Xóa đơn
              </button>
              <button className="btn-close" onClick={closeDetailModal}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuanLyDonHang;




