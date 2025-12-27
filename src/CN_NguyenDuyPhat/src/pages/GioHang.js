import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './GioHang.css';

function GioHang() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Chưa đăng nhập
  if (!isAuthenticated) {
    return (
      <div className="cart-page">
        <div className="cart-empty-state">
          <div className="empty-icon">🔐</div>
          <h2>Vui lòng đăng nhập</h2>
          <p>Đăng nhập để xem và quản lý giỏ hàng của bạn</p>
          <button className="btn-primary" onClick={() => navigate('/dang-nhap')}>
            Đăng nhập ngay
          </button>
        </div>
      </div>
    );
  }

  // Giỏ hàng trống
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty-state">
          <div className="empty-icon">🛒</div>
          <h2>Giỏ hàng trống</h2>
          <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
          <button className="btn-primary" onClick={() => navigate('/')}>
            Khám phá sản phẩm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Giỏ hàng</h1>
        <p>{totalItems} sản phẩm</p>
      </div>

      <div className="cart-content">
        {/* Danh sách sản phẩm */}
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div 
              key={`${item.id}-${item.size || ''}-${item.color?.value || ''}-${index}`} 
              className="cart-item"
            >
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>
              
              <div className="cart-item-details">
                <h4 className="cart-item-name">{item.name}</h4>
                <div className="cart-item-variant">
                  {item.size && <span>Size: {item.size}</span>}
                  {item.color && (
                    <span>
                      <span 
                        className="color-dot" 
                        style={{ backgroundColor: item.color.hex }}
                      />
                      {item.color.name}
                    </span>
                  )}
                </div>
                <div className="cart-item-price">
                  {formatPrice(item.salePrice || item.price)}
                </div>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-control">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1, item.size, item.color)}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.size, item.color)}
                  >
                    +
                  </button>
                </div>
                <button 
                  className="btn-remove"
                  onClick={() => removeFromCart(item.id, item.size, item.color)}
                >
                  🗑️ Xóa
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tổng kết đơn hàng */}
        <div className="cart-summary">
          <h3>Tóm tắt đơn hàng</h3>
          
          <div className="summary-row">
            <span>Tạm tính ({totalItems} sản phẩm)</span>
            <span>{formatPrice(getTotalPrice())}</span>
          </div>
          <div className="summary-row">
            <span>Phí vận chuyển</span>
            <span style={{ color: '#28a745' }}>Miễn phí</span>
          </div>
          <div className="summary-row total">
            <span>Tổng cộng</span>
            <span className="price">{formatPrice(getTotalPrice())}</span>
          </div>

          <div className="cart-summary-actions">
            <button className="btn-checkout" onClick={() => navigate('/thanh-toan')}>
              Tiến hành thanh toán
            </button>
            <button className="btn-clear" onClick={clearCart}>
              Xóa tất cả
            </button>
            <button className="btn-continue" onClick={() => navigate('/')}>
              ← Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GioHang;
