import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const styles = {
    footer: { background: '#000', color: '#fff', padding: '0' },
    topSection: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '60px 5%', maxWidth: '1200px', margin: '0 auto', gap: '40px', flexWrap: 'wrap' },
    logoSection: { flex: '0 0 200px' },
    logo: { fontSize: '36px', fontWeight: '900', fontStyle: 'italic', color: '#fff', marginBottom: '20px' },
    tagline: { fontSize: '12px', color: '#888', lineHeight: '1.6' },
    linksSection: { display: 'flex', gap: '60px', flexWrap: 'wrap' },
    column: { minWidth: '150px' },
    columnTitle: { fontSize: '12px', fontWeight: '700', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' },
    linkList: { listStyle: 'none', padding: 0, margin: 0 },
    linkItem: { marginBottom: '12px' },
    link: { color: '#888', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' },
    socialSection: { display: 'flex', gap: '15px', marginTop: '20px' },
    socialIcon: { width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', fontSize: '16px', transition: 'all 0.2s' },
    bottomSection: { borderTop: '1px solid #222', padding: '20px 5%' },
    bottomContent: { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' },
    copyright: { fontSize: '11px', color: '#666' },
    bottomLinks: { display: 'flex', gap: '20px' },
    bottomLink: { fontSize: '11px', color: '#666', textDecoration: 'none' }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.topSection}>
        {/* Logo Section */}
        <div style={styles.logoSection}>
          <div style={styles.logo}>NDP</div>
          <p style={styles.tagline}>Shop giày thể thao chính hãng. Chất lượng - Uy tín - Giá tốt.</p>
          <div style={styles.socialSection}>
            <a href="https://www.facebook.com/share/1G26gBvUtx/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>f</a>
            <a href="https://www.instagram.com/duyphatttt/?igsh=MmkzNnF3dW9kMGk3&utm_source=qr" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>📷</a>
          </div>
        </div>

        {/* Links Section */}
        <div style={styles.linksSection}>
          <div style={styles.column}>
            <h4 style={styles.columnTitle}>Hỗ Trợ</h4>
            <ul style={styles.linkList}>
              <li style={styles.linkItem}><Link to="/ho-tro" style={styles.link}>Liên hệ</Link></li>
              <li style={styles.linkItem}><Link to="/shipping" style={styles.link}>Vận chuyển</Link></li>
              <li style={styles.linkItem}><Link to="/returns" style={styles.link}>Đổi trả</Link></li>
              <li style={styles.linkItem}><Link to="/warranty" style={styles.link}>Bảo hành</Link></li>
            </ul>
          </div>

          <div style={styles.column}>
            <h4 style={styles.columnTitle}>Về Chúng Tôi</h4>
            <ul style={styles.linkList}>
              <li style={styles.linkItem}><Link to="/about" style={styles.link}>Giới thiệu</Link></li>
              <li style={styles.linkItem}><Link to="/stores" style={styles.link}>Cửa hàng</Link></li>
            </ul>
          </div>

          <div style={styles.column}>
            <h4 style={styles.columnTitle}>Danh Mục</h4>
            <ul style={styles.linkList}>
              <li style={styles.linkItem}><Link to="/giay-adidas" style={styles.link}>Giày Adidas</Link></li>
              <li style={styles.linkItem}><Link to="/giay-nike" style={styles.link}>Giày Nike</Link></li>
              <li style={styles.linkItem}><Link to="/khuyen-mai" style={styles.link}>Khuyến mãi</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={styles.bottomSection}>
        <div style={{ textAlign: 'center' }}>
          <span style={styles.copyright}> © Copyright by Chuyên Ngành Nguyễn Duy Phát</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
