import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductsByCategory } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useInventory } from '../context/InventoryContext';
import SizeColorSelector from '../components/SizeColorSelector';
import AddToCartSuccessModal from '../components/AddToCartSuccessModal';
import './Pages.css';

function GiayAdidas() {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { getAvailableStock, isInStock, reserveProduct } = useInventory();
  const navigate = useNavigate();
  const [showSelector, setShowSelector] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  const adidasProducts = getProductsByCategory('Adidas');

  const handleViewDetail = (productId) => {
    navigate(`/san-pham/${productId}`);
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      const goToLogin = window.confirm('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!\n\nBấm OK để đăng nhập ngay.');
      if (goToLogin) {
        navigate('/dang-nhap');
      }
      return;
    }

    // Kiểm tra tồn kho
    if (!isInStock(product.id)) {
      alert('❌ Sản phẩm này hiện đã hết hàng!');
      return;
    }

    // Hiển thị modal chọn size và màu
    setSelectedProduct(product);
    setShowSelector(true);
  };

  const handleConfirmSizeColor = ({ size, color }) => {
    if (!selectedProduct) return;

    // Reserve sản phẩm trong kho
    const success = reserveProduct(selectedProduct.id, 1);
    if (!success) {
      alert('❌ Không đủ hàng trong kho!');
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

  const styles = {
    productsSection: { padding: '80px 5%', background: '#f5f5f5' },
    sectionTitle: { 
      fontSize: '24px', fontWeight: '700', color: '#000', textAlign: 'center', 
      marginBottom: '40px', textTransform: 'uppercase', letterSpacing: '2px' 
    },
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

      <section style={styles.productsSection}>
        <h2 style={styles.sectionTitle}>👟 Giày Adidas</h2>
        <div style={styles.productGrid}>
          {adidasProducts.map(product => (
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

export default GiayAdidas;