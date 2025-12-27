import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const { getTotalItems, clearCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    clearCart(); // Xóa giỏ hàng trước
    logout();    // Sau đó đăng xuất
  };

  // Inline styles
  const styles = {
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: '#ffffff',
      width: '100%',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    headerTop: {
      backgroundColor: '#ffffff',
      color: '#000000',
      textAlign: 'center',
      padding: '10px 20px',
      fontSize: '12px',
      fontWeight: 600,
      letterSpacing: '0.3px',
      borderBottom: '1px solid #e5e5e5'
    },
    nav: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '0 40px',
      height: '60px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e5e5',
      gap: '0'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      marginRight: '30px',
      flexShrink: 0
    },
    logoText: {
      fontSize: '32px',
      fontWeight: 900,
      color: '#000000',
      letterSpacing: '-1px',
      fontStyle: 'italic'
    },
    navLinks: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: '60px',
      gap: '0'
    },
    navLink: {
      display: 'flex',
      alignItems: 'center',
      height: '60px',
      padding: '0 18px',
      color: '#000000',
      textDecoration: 'none',
      fontSize: '15px',
      fontWeight: 600,
      borderBottom: '3px solid transparent',
      background: 'none',
      margin: '0'
    },
    headerRight: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 'auto',
      gap: '12px'
    },
    searchContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      border: '1px solid #e5e5e5',
      borderRadius: '4px',
      padding: '8px 12px',
      width: '180px'
    },
    searchIcon: {
      fontSize: '14px',
      marginRight: '8px',
      opacity: 0.6
    },
    searchInput: {
      flex: 1,
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: '#000000',
      fontSize: '13px',
      width: '100%'
    },
    headerIcons: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '8px'
    },
    iconLink: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      color: '#000000',
      textDecoration: 'none',
      fontSize: '18px',
      borderRadius: '4px',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer'
    },
    cartBadge: {
      position: 'absolute',
      top: '2px',
      right: '2px',
      backgroundColor: '#000000',
      color: '#ffffff',
      fontSize: '10px',
      fontWeight: 700,
      minWidth: '16px',
      height: '16px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 4px'
    },
    userDropdown: {
      position: 'absolute',
      top: '50px',
      right: '0',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e5e5',
      borderRadius: '4px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      padding: '16px',
      minWidth: '160px',
      zIndex: 1001
    },
    userName: {
      display: 'block',
      color: '#000000',
      fontWeight: 600,
      fontSize: '14px',
      paddingBottom: '12px',
      marginBottom: '12px',
      borderBottom: '1px solid #e5e5e5'
    },
    logoutBtn: {
      width: '100%',
      backgroundColor: '#000000',
      color: '#ffffff',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '4px',
      fontSize: '13px',
      fontWeight: 600,
      cursor: 'pointer'
    }
  };

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header style={styles.header}>
      <div style={styles.headerTop}>
        MIỄN PHÍ VẬN CHUYỂN CHO ĐƠN HÀNG TRÊN 1.000.000 VND
      </div>
      
      <nav style={styles.nav}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoText}>NDP</span>
        </Link>
        
        <div style={styles.navLinks}>
          <Link to="/" style={styles.navLink}>Trang Chủ</Link>
          <Link to="/giay-adidas" style={styles.navLink}>Giày Adidas</Link>
          <Link to="/giay-nike" style={styles.navLink}>Giày Nike</Link>
          <Link to="/khuyen-mai" style={styles.navLink}>Khuyến Mãi</Link>
        </div>

        <div style={styles.headerRight}>
          <form style={styles.searchContainer} onSubmit={handleSearch}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              style={styles.searchInput}
              placeholder="Tìm kiếm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <div style={styles.headerIcons}>
            <Link to="/gio-hang" style={styles.iconLink}>
              🛒
              {getTotalItems() > 0 && <span style={styles.cartBadge}>{getTotalItems()}</span>}
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/don-hang-cua-toi" style={styles.iconLink} title="Đơn hàng của tôi">📦</Link>
                <div 
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <span style={styles.iconLink}>👤</span>
                  {showDropdown && (
                    <div style={styles.userDropdown}>
                      <span style={styles.userName}>{user.name}</span>
                      <button onClick={handleLogout} style={styles.logoutBtn}>Đăng xuất</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link to="/dang-nhap" style={styles.iconLink}>👤</Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
