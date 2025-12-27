import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getProductById } from '../data/products';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const product = getProductById(id);

  const handleAddToCart = () => {
    if (!product) return;

    if (!isAuthenticated) {
      const goToLogin = window.confirm(
        'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!\n\nBấm OK để đăng nhập ngay.'
      );
      if (goToLogin) navigate('/dang-nhap');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });

    const viewCart = window.confirm(
      `✅ Đã thêm "${product.name}" vào giỏ hàng!\n\nBấm OK để xem giỏ hàng, Cancel để tiếp tục mua sắm.`
    );
    if (viewCart) navigate('/gio-hang');
  };

  if (!product) {
    return (
      <div className="product-detail">
        <div className="detail-card not-found">
          <h2>Không tìm thấy sản phẩm</h2>
          <p>Sản phẩm bạn yêu cầu không tồn tại hoặc đã bị xóa.</p>
          <button className="btn" onClick={() => navigate(-1)}>
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Quay lại
      </button>
      <div className="detail-card">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="detail-info">
          <div className="detail-meta">
            <span className="detail-category">{product.category}</span>
            {product.inStock ? (
              <span className="detail-stock in-stock">Còn hàng</span>
            ) : (
              <span className="detail-stock out-stock">Hết hàng</span>
            )}
          </div>
          <h1>{product.name}</h1>
          <p className="detail-description">{product.description}</p>
          <div className="detail-price">{product.priceFormatted}</div>
          <div className="detail-actions">
            <button className="btn secondary" onClick={() => navigate('/gio-hang')}>
              Xem giỏ hàng
            </button>
            <button className="btn" onClick={handleAddToCart}>
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

