import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/Banner.css';
import './Pages.css';
import { getFeaturedProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useInventory } from '../context/InventoryContext';
import SizeColorSelector from '../components/SizeColorSelector';
import AddToCartSuccessModal from '../components/AddToCartSuccessModal';

function TrangChu() {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { getAvailableStock, isInStock, getStockStatus, reserveProduct } = useInventory();
  const navigate = useNavigate();
  const [showSelector, setShowSelector] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  const featuredProducts = getFeaturedProducts();

  const handleViewDetail = (productId) => {
    navigate(`/san-pham/${productId}`);
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      const goToLogin = window.confirm('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!\n\nBấm OK để đăng nhập ngay.');
      if (goToLogin) navigate('/dang-nhap');
      return;
    }
    if (!isInStock(product.id)) {
      alert('Sản phẩm này hiện đã hết hàng!');
      return;
    }
    setSelectedProduct(product);
    setShowSelector(true);
  };

  const handleConfirmSizeColor = ({ size, color }) => {
    if (!selectedProduct) return;
    const success = reserveProduct(selectedProduct.id, 1);
    if (!success) {
      alert('Không đủ hàng trong kho!');
      setShowSelector(false);
      return;
    }
    addToCart({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      size: size,
      color: color
    });
    setShowSelector(false);
    setAddedItem({ name: selectedProduct.name, size, color });
    setShowSuccessModal(true);
    setSelectedProduct(null);
  };

  // Styles
  const styles = {
    section: { padding: '60px 5%', maxWidth: '1200px', margin: '0 auto' },
    sectionTitle: { 
      fontSize: '24px', fontWeight: '700', color: '#000', textAlign: 'center', 
      marginBottom: '40px', textTransform: 'uppercase', letterSpacing: '2px' 
    },
    categoryGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' },
    categoryCard: { 
      position: 'relative', height: '400px', overflow: 'hidden', 
      background: '#000', cursor: 'pointer' 
    },
    categoryImg: { width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, transition: 'all 0.4s' },
    categoryOverlay: { 
      position: 'absolute', bottom: '30px', left: '30px', color: '#fff' 
    },
    categoryTitle: { fontSize: '28px', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase' },
    categoryLink: { fontSize: '14px', textDecoration: 'underline' },
    productsSection: { padding: '80px 5%', background: '#f5f5f5' },
    productGrid: { 
      display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
      gap: '20px', maxWidth: '1200px', margin: '0 auto' 
    },
    productCard: { background: '#fff', border: '1px solid #e5e5e5', transition: 'all 0.3s' },
    productImg: { width: '100%', height: '280px', overflow: 'hidden', background: '#f5f5f5' },
    productInfo: { padding: '20px' },
    productTitle: { fontSize: '14px', fontWeight: '500', color: '#000', marginBottom: '8px' },
    productPrice: { fontSize: '16px', fontWeight: '700', color: '#000', marginBottom: '15px' },
    stockInfo: { 
      display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', marginBottom: '15px' 
    },
    btnPrimary: { 
      flex: 1, background: '#000', color: '#fff', border: 'none', padding: '12px', 
      fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', cursor: 'pointer' 
    },
    btnOutline: { 
      flex: 1, background: '#fff', color: '#000', border: '1px solid #000', padding: '12px', 
      fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', cursor: 'pointer' 
    }
  };

  return (
    <div style={{ background: '#fff' }}>
      {showSelector && selectedProduct && (
        <SizeColorSelector
          productName={selectedProduct.name}
          onConfirm={handleConfirmSizeColor}
          onCancel={() => { setShowSelector(false); setSelectedProduct(null); }}
        />
      )}
      <AddToCartSuccessModal
        show={showSuccessModal}
        productName={addedItem?.name}
        size={addedItem?.size}
        color={addedItem?.color}
        onClose={() => setShowSuccessModal(false)}
      />

      {/* Banner */}
      <section className="banner">
        <div className="banner-content">
          <h1>BỘ SƯU TẬP MỚI NHẤT</h1>
          <p>Khám phá các mẫu giày thể thao hot nhất 2025</p>
          <Link to="/giay-adidas" className="btn">XEM NGAY</Link>
        </div>
      </section>

      {/* Danh mục */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Danh Mục Sản Phẩm</h2>
        <div style={styles.categoryGrid}>
          <Link to="/giay-adidas" style={{ textDecoration: 'none' }}>
            <div style={styles.categoryCard}>
              <img src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/0ae41968d69f49f5b912aafc0106d84a_9366/ultraboost-20-shoes.jpg" 
                   alt="Adidas" style={styles.categoryImg} />
              <div style={styles.categoryOverlay}>
                <h3 style={styles.categoryTitle}>Adidas</h3>
                <span style={styles.categoryLink}>Xem tất cả</span>
              </div>
            </div>
          </Link>
          <Link to="/giay-nike" style={{ textDecoration: 'none' }}>
            <div style={styles.categoryCard}>
              <img src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WrLlWX.png" 
                   alt="Nike" style={styles.categoryImg} />
              <div style={styles.categoryOverlay}>
                <h3 style={styles.categoryTitle}>Nike</h3>
                <span style={styles.categoryLink}>Xem tất cả</span>
              </div>
            </div>
          </Link>
          <Link to="/khuyen-mai" style={{ textDecoration: 'none' }}>
            <div style={styles.categoryCard}>
              <img src="https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/310195/01/sv01/fnd/VNM/fmt/png" 
                   alt="Sale" style={styles.categoryImg} />
              <div style={styles.categoryOverlay}>
                <h3 style={styles.categoryTitle}>Khuyến mãi</h3>
                <span style={styles.categoryLink}>Giảm đến 30%</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Sản phẩm nổi bật */}
      <section style={styles.productsSection}>
        <h2 style={styles.sectionTitle}>Sản Phẩm Nổi Bật</h2>
        <div style={styles.productGrid}>
          {featuredProducts.map(product => (
            <div key={product.id} style={styles.productCard}>
              <div style={styles.productImg}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={styles.productInfo}>
                <h3 style={styles.productTitle}>{product.name}</h3>
                <div style={styles.stockInfo}>
                  <span>Còn {getAvailableStock(product.id)} sản phẩm</span>
                </div>
                <div style={styles.productPrice}>{product.priceFormatted}</div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => handleViewDetail(product.id)} style={styles.btnOutline}>Chi tiết</button>
                  <button 
                    onClick={() => handleAddToCart(product)} 
                    disabled={!isInStock(product.id)}
                    style={{ ...styles.btnPrimary, opacity: isInStock(product.id) ? 1 : 0.5, cursor: isInStock(product.id) ? 'pointer' : 'not-allowed' }}
                  >
                    {isInStock(product.id) ? 'Thêm giỏ' : 'Hết hàng'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default TrangChu;
