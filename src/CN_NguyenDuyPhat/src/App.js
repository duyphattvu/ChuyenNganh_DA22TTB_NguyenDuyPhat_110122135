import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { InventoryProvider, useInventory } from './context/InventoryContext';
import { saleProducts } from './data/products';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ContextConnector from './components/ContextConnector';
import ScrollToTop from './components/ScrollToTop';
import TrangChu from './pages/TrangChu';
import GiayAdidas from './pages/GiayAdidas';
import GiayNike from './pages/GiayNike';
import GioHang from './pages/GioHang';
import DangNhap from './pages/DangNhap';
import DangKy from './pages/DangKy';
import ThanhToan from './pages/ThanhToan';
import ProductDetail from './pages/ProductDetail';
import SearchResults from './pages/SearchResults';
import HoTroKhachHang from './pages/HoTroKhachHang';
import QuanLyDonHang from './pages/QuanLyDonHang';
import QuanLyTaiKhoan from './pages/QuanLyTaiKhoan';
import QuanLyYeuCauHoTro from './pages/QuanLyYeuCauHoTro';
import QuanLyChat from './pages/QuanLyChat';
import About from './pages/About';
import Stores from './pages/Stores';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import Warranty from './pages/Warranty';
import TheoDoiDonHang from './pages/TheoDoiDonHang';
import SizeColorSelector from './components/SizeColorSelector';
import AddToCartSuccessModal from './components/AddToCartSuccessModal';
import ChatWidget from './components/ChatWidget';

// Component Sale với dữ liệu đầy đủ
const Sale = () => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { getAvailableStock, isInStock, getStockStatus, reserveProduct } = useInventory();
  const navigate = useNavigate();
  const [showSelector, setShowSelector] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  const handleViewDetail = (product) => {
    if (!product.id) return;
    navigate(`/san-pham/${product.id}`);
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      const goToLogin = window.confirm('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!\n\nBấm OK để đăng nhập ngay.');
      if (goToLogin) {
        navigate('/dang-nhap');
      }
      return;
    }

    // Kiểm tra tồn kho bằng id sản phẩm
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
      price: selectedProduct.salePrice,
      image: selectedProduct.image,
      size: size,
      color: color
    });
    
    setShowSelector(false);
    setAddedItem({ name: selectedProduct.name, size, color });
    setShowSuccessModal(true);
    setSelectedProduct(null);
  };

  // Sử dụng dữ liệu từ file products.js
  const products = saleProducts;

  const styles = {
    page: { background: '#fff', minHeight: '100vh' },
    header: { background: '#fff', color: '#000', padding: '50px 5% 30px', textAlign: 'center', borderBottom: '1px solid #e5e5e5' },
    title: { fontSize: '28px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' },
    subtitle: { fontSize: '14px', color: '#666' },
    content: { padding: '60px 5%', maxWidth: '1200px', margin: '0 auto' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
    card: { background: '#fff', border: '1px solid #e5e5e5', position: 'relative' },
    badge: { position: 'absolute', top: '12px', left: '12px', background: '#000', color: '#fff', padding: '6px 12px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', zIndex: 5 },
    imgWrap: { width: '100%', height: '280px', overflow: 'hidden', background: '#f5f5f5' },
    img: { width: '100%', height: '100%', objectFit: 'cover' },
    info: { padding: '20px' },
    name: { fontSize: '14px', fontWeight: '500', color: '#000', marginBottom: '8px' },
    oldPrice: { fontSize: '13px', color: '#999', textDecoration: 'line-through', marginBottom: '4px' },
    newPrice: { fontSize: '18px', fontWeight: '700', color: '#000', marginBottom: '15px' },
    stock: { fontSize: '12px', color: '#666', marginBottom: '15px' },
    btnRow: { display: 'flex', gap: '10px' },
    btnPrimary: { flex: 1, background: '#000', color: '#fff', border: 'none', padding: '12px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', cursor: 'pointer' },
    btnOutline: { flex: 1, background: '#fff', color: '#000', border: '1px solid #000', padding: '12px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', cursor: 'pointer' }
  };

  return (
    <div style={styles.page}>
      {showSelector && selectedProduct && (
        <SizeColorSelector productName={selectedProduct.name} onConfirm={handleConfirmSizeColor} onCancel={() => { setShowSelector(false); setSelectedProduct(null); }} />
      )}
      <AddToCartSuccessModal show={showSuccessModal} productName={addedItem?.name} size={addedItem?.size} color={addedItem?.color} onClose={() => setShowSuccessModal(false)} />
      
      <div style={styles.header}>
        <h1 style={styles.title}>Khuyến Mãi</h1>
        <p style={styles.subtitle}>Giảm giá lên đến 30% - {products.length} sản phẩm</p>
      </div>

      <div style={styles.content}>
        <div style={styles.grid}>
          {products.map(product => (
            <div key={product.id} style={styles.card}>
              <div style={styles.badge}>{product.discount}% OFF</div>
              <div style={styles.imgWrap}>
                <img src={product.image} alt={product.name} style={styles.img} />
              </div>
              <div style={styles.info}>
                <h3 style={styles.name}>{product.name}</h3>
                <p style={styles.stock}>Còn {getAvailableStock(product.id)} sản phẩm</p>
                <div style={styles.oldPrice}>{product.originalPriceFormatted}</div>
                <div style={styles.newPrice}>{product.salePriceFormatted}</div>
                <div style={styles.btnRow}>
                  <button onClick={() => handleViewDetail(product)} style={styles.btnOutline}>Chi tiết</button>
                  <button onClick={() => handleAddToCart(product)} disabled={!isInStock(product.id)} 
                    style={{ ...styles.btnPrimary, opacity: isInStock(product.id) ? 1 : 0.5 }}>
                    {isInStock(product.id) ? 'Thêm giỏ' : 'Hết hàng'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <AuthProvider>
        <CartProvider>
          <InventoryProvider>
            <ScrollToTop />
            <ContextConnector />
            <Header />
            <Routes>
            <Route path="/" element={<TrangChu />} />
            <Route path="/trang-chu" element={<TrangChu />} />
            <Route path="/giay-adidas" element={<GiayAdidas />} />
            <Route path="/giay-nike" element={<GiayNike />} />
            <Route path="/khuyen-mai" element={<Sale />} />
            <Route path="/gio-hang" element={<GioHang />} />
            <Route path="/thanh-toan" element={<ThanhToan />} />
            <Route path="/dang-nhap" element={<DangNhap />} />
            <Route path="/dang-ky" element={<DangKy />} />
            <Route path="/san-pham/:id" element={<ProductDetail />} />
            <Route path="/tim-kiem" element={<SearchResults />} />
            <Route path="/ho-tro" element={<HoTroKhachHang />} />
            <Route path="/contact" element={<HoTroKhachHang />} />
            <Route path="/quan-ly-don-hang" element={<QuanLyDonHang />} />
            <Route path="/quan-ly-tai-khoan" element={<QuanLyTaiKhoan />} />
            <Route path="/quan-ly-yeu-cau-ho-tro" element={<QuanLyYeuCauHoTro />} />
            <Route path="/quan-ly-chat" element={<QuanLyChat />} />
            <Route path="/about" element={<About />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/warranty" element={<Warranty />} />
            <Route path="/don-hang-cua-toi" element={<TheoDoiDonHang />} />
          </Routes>
          <Footer />
          <ChatWidget />
          </InventoryProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
