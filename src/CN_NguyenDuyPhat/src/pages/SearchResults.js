import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { allProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useInventory } from '../context/InventoryContext';
import SizeColorSelector from '../components/SizeColorSelector';
import AddToCartSuccessModal from '../components/AddToCartSuccessModal';
import './Pages.css';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { getAvailableStock, isInStock, reserveProduct } = useInventory();
  const navigate = useNavigate();
  const [showSelector, setShowSelector] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  // Tìm kiếm sản phẩm
  const searchResults = useMemo(() => {
    if (!query || query.trim() === '') {
      return [];
    }
    
    const searchTerm = query.toLowerCase().trim();
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }, [query]);

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
      alert('❌ Sản phẩm này hiện đã hết hàng!');
      return;
    }

    setSelectedProduct(product);
    setShowSelector(true);
  };

  const handleConfirmSizeColor = ({ size, color }) => {
    if (!selectedProduct) return;

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
    page: { background: '#fff', minHeight: '100vh' },
    header: { background: '#fff', color: '#000', padding: '50px 5% 30px', textAlign: 'center', borderBottom: '1px solid #e5e5e5' },
    title: { fontSize: '28px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' },
    subtitle: { fontSize: '14px', color: '#666' },
    content: { padding: '60px 5%', maxWidth: '1200px', margin: '0 auto', background: '#f5f5f5' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
    card: { background: '#fff', border: '1px solid #e5e5e5', transition: 'all 0.3s' },
    imgWrap: { width: '100%', height: '280px', overflow: 'hidden', background: '#f5f5f5' },
    img: { width: '100%', height: '100%', objectFit: 'cover' },
    info: { padding: '20px' },
    name: { fontSize: '14px', fontWeight: '500', color: '#000', marginBottom: '8px' },
    stock: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', marginBottom: '15px' },
    price: { fontSize: '16px', fontWeight: '700', color: '#000', marginBottom: '15px' },
    btnRow: { display: 'flex', gap: '10px' },
    btnPrimary: { flex: 1, background: '#000', color: '#fff', border: 'none', padding: '12px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', cursor: 'pointer' },
    btnOutline: { flex: 1, background: '#fff', color: '#000', border: '1px solid #000', padding: '12px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', cursor: 'pointer' }
  };

  return (
    <div style={styles.page}>
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

      {query ? (
        <>
          <div style={styles.header}>
            <h1 style={styles.title}>🔍 Kết quả tìm kiếm</h1>
            <p style={styles.subtitle}>Tìm thấy {searchResults.length} sản phẩm cho "{query}"</p>
          </div>
          
          {searchResults.length > 0 ? (
            <div style={styles.content}>
              <div style={styles.grid}>
                {searchResults.map(product => (
                  <div key={product.id} style={styles.card}>
                    <div style={styles.imgWrap}>
                      <img src={product.image} alt={product.name} style={styles.img} />
                    </div>
                    <div style={styles.info}>
                      <h3 style={styles.name}>{product.name}</h3>
                      <div style={styles.stock}>
                        <span>Còn {getAvailableStock(product.id)} sản phẩm</span>
                      </div>
                      <div style={styles.price}>{product.priceFormatted}</div>
                      <div style={styles.btnRow}>
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
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#f8f9fa', marginTop: '40px' }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔍</div>
              <h3 style={{ fontSize: '24px', color: '#2d3748', marginBottom: '10px' }}>Không tìm thấy sản phẩm</h3>
              <p style={{ fontSize: '16px', color: '#666', marginBottom: '30px' }}>Không có sản phẩm nào phù hợp với từ khóa "{query}"</p>
              <button onClick={() => navigate('/')} style={{ ...styles.btnPrimary, padding: '15px 30px' }}>Về trang chủ</button>
            </div>
          )}
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#f8f9fa', marginTop: '40px' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔍</div>
          <h3 style={{ fontSize: '24px', color: '#2d3748', marginBottom: '10px' }}>Nhập từ khóa tìm kiếm</h3>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '30px' }}>Vui lòng nhập từ khóa để tìm kiếm sản phẩm</p>
          <button onClick={() => navigate('/')} style={{ ...styles.btnPrimary, padding: '15px 30px' }}>Về trang chủ</button>
        </div>
      )}
    </div>
  );
}

export default SearchResults;

