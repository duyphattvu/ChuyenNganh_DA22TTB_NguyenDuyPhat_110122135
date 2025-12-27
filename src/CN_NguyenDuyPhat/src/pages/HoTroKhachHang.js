import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HoTroKhachHang.css';

function HoTroKhachHang() {
  const navigate = useNavigate();
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const faqs = [
    {
      id: 1,
      question: 'Làm thế nào để đặt hàng?',
      answer: 'Bạn có thể đặt hàng bằng cách: 1) Chọn sản phẩm yêu thích, 2) Thêm vào giỏ hàng, 3) Điền thông tin thanh toán, 4) Xác nhận đơn hàng. Đơn hàng của bạn sẽ được xử lý trong vòng 24h.'
    },
    {
      id: 2,
      question: 'Phí vận chuyển là bao nhiêu?',
      answer: 'Chúng tôi miễn phí vận chuyển cho đơn hàng trên 1.000.000₫. Với đơn hàng dưới 1.000.000₫, phí vận chuyển là 30.000₫ cho toàn quốc. Thời gian giao hàng từ 2-5 ngày làm việc.'
    },
    {
      id: 3,
      question: 'Tôi có thể đổi/trả sản phẩm không?',
      answer: 'Có, bạn có thể đổi/trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng nếu sản phẩm còn nguyên vẹn, chưa qua sử dụng, còn đầy đủ tem mác và hộp. Vui lòng liên hệ hotline hoặc email để được hướng dẫn chi tiết.'
    },
    {
      id: 4,
      question: 'Sản phẩm có bảo hành không?',
      answer: 'Tất cả sản phẩm chính hãng đều được bảo hành từ nhà sản xuất. Thời gian bảo hành tùy theo từng thương hiệu (thường từ 6-12 tháng). Vui lòng giữ hóa đơn để được bảo hành.'
    },
    {
      id: 5,
      question: 'Làm sao để theo dõi đơn hàng?',
      answer: 'Sau khi đặt hàng thành công, bạn sẽ nhận được email xác nhận kèm mã đơn hàng. Bạn có thể liên hệ hotline 1900-xxxx hoặc chat trực tuyến với mã đơn hàng để theo dõi tình trạng vận chuyển.'
    },
    {
      id: 6,
      question: 'Các phương thức thanh toán nào được chấp nhận?',
      answer: 'Chúng tôi chấp nhận thanh toán bằng: 1) Tiền mặt khi nhận hàng (COD), 2) Chuyển khoản ngân hàng, 3) Ví điện tử (MoMo, ZaloPay), 4) Thẻ tín dụng/ghi nợ.'
    }
  ];

  const toggleFAQ = (id) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus('error');
      return;
    }

    // Mô phỏng gửi yêu cầu hỗ trợ
    const supportRequest = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString()
    };

    // Lưu vào localStorage (trong thực tế sẽ gửi lên server)
    const requests = JSON.parse(localStorage.getItem('supportRequests') || '[]');
    requests.push(supportRequest);
    localStorage.setItem('supportRequests', JSON.stringify(requests));

    setSubmitStatus('success');
    setShowSuccessModal(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });

    setTimeout(() => setSubmitStatus(null), 3000);
  };

  return (
    <div className="ho-tro-container">
      {/* Modal thông báo thành công */}
      {showSuccessModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            maxWidth: '420px',
            width: '100%',
            textAlign: 'center',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              padding: '36px 28px',
              color: 'white'
            }}>
              <div style={{
                width: '72px',
                height: '72px',
                background: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '36px',
                color: '#10b981'
              }}>
                ✓
              </div>
              <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '700' }}>Gửi yêu cầu thành công!</h2>
            </div>
            <div style={{ padding: '28px' }}>
              <p style={{ color: '#6b7280', fontSize: '15px', marginBottom: '24px', lineHeight: '1.6' }}>
                Cảm ơn bạn đã liên hệ với chúng tôi!<br/>
                Chúng tôi sẽ phản hồi trong vòng <strong style={{color: '#1a1a2e'}}>24 giờ</strong>.
              </p>
              <div style={{
                background: '#f8f9fa',
                padding: '16px',
                borderRadius: '10px',
                marginBottom: '24px',
                textAlign: 'left'
              }}>
                <p style={{ margin: '6px 0', fontSize: '14px', color: '#6b7280' }}>
                  📞 Hotline: <strong style={{color: '#1a1a2e'}}>0983592506</strong>
                </p>
                <p style={{ margin: '6px 0', fontSize: '14px', color: '#6b7280' }}>
                  ✉️ Email: <strong style={{color: '#1a1a2e'}}>duyphat@gmail.com</strong>
                </p>
              </div>
              <button
                onClick={() => setShowSuccessModal(false)}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="support-hero">
        <div className="hero-content">
          <h1>🛠️ Trung Tâm Hỗ Trợ Khách Hàng</h1>
          <p>Chúng tôi luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi</p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="contact-cards">
        <div className="contact-card">
          <div className="contact-icon">📞</div>
          <h3>Hotline</h3>
          <p className="contact-value">0983592506</p>
          <p className="contact-hours">8:00 - 22:00 hàng ngày</p>
        </div>
        <div className="contact-card">
          <div className="contact-icon">✉️</div>
          <h3>Email</h3>
          <p className="contact-value">duyphat@gmail.com</p>
          <p className="contact-hours">Phản hồi trong 24h</p>
        </div>
        <div className="contact-card">
          <div className="contact-icon">💬</div>
          <h3>Chat Trực Tuyến</h3>
          <p className="contact-value">8:00 - 22:00</p>
          <p className="contact-hours">Hỗ trợ nhanh chóng</p>
        </div>
        <div className="contact-card">
          <div className="contact-icon">📍</div>
          <h3>Địa Chỉ</h3>
          <p className="contact-value">Đường đồng khởi, Trà Vinh, Vĩnh Long</p>
          <p className="contact-hours">TP. Vĩnh Long</p>
        </div>
      </div>    

      {/* FAQ Section */}
      <div className="faq-section">
        <h2 className="section-title">❓ Câu Hỏi Thường Gặp (FAQ)</h2>
        <div className="faq-list">
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className={`faq-item ${activeFAQ === faq.id ? 'active' : ''}`}
            >
              <div 
                className="faq-question"
                onClick={() => toggleFAQ(faq.id)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">{activeFAQ === faq.id ? '−' : '+'}</span>
              </div>
              {activeFAQ === faq.id && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Support Form */}
      <div className="support-form-section">
        <h2 className="section-title">📝 Gửi Yêu Cầu Hỗ Trợ</h2>
        <p className="form-description">
          Bạn cần hỗ trợ? Hãy điền form bên dưới, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất!
        </p>
        <form className="support-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Họ và tên *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập họ và tên của bạn"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0123-456-789"
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Chủ đề *</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Chọn chủ đề hỗ trợ</option>
                <option value="order">Đặt hàng & Thanh toán</option>
                <option value="shipping">Vận chuyển & Giao hàng</option>
                <option value="return">Đổi trả sản phẩm</option>
                <option value="warranty">Bảo hành</option>
                <option value="product">Thông tin sản phẩm</option>
                <option value="other">Khác</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Nội dung yêu cầu *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Mô tả chi tiết vấn đề bạn cần hỗ trợ..."
              rows="6"
              required
            />
          </div>

          <button 
            type="submit" 
            className={`submit-btn ${submitStatus === 'success' ? 'success' : ''} ${submitStatus === 'error' ? 'error' : ''}`}
          >
            {submitStatus === 'success' ? '✅ Đã gửi thành công!' : 'Gửi yêu cầu hỗ trợ'}
          </button>
        </form>
      </div>

      {/* Quick Links */}
      <div className="quick-links-section">
        <h2 className="section-title">🔗 Liên Kết Nhanh</h2>
        <div className="quick-links">
          <button className="quick-link-btn" onClick={() => navigate('/gio-hang')}>
            🛒 Xem giỏ hàng
          </button>
          <button className="quick-link-btn" onClick={() => navigate('/')}>
            🏠 Về trang chủ
          </button>
          <button className="quick-link-btn" onClick={() => navigate('/khuyen-mai')}>
            🔥 Sản phẩm khuyến mãi
          </button>
          <button className="quick-link-btn" onClick={() => window.open('https://www.facebook.com/share/14Ma6iuzj6w/?mibextid=wwXIfr', '_blank')}>
            📘 Facebook
          </button>
        </div>
      </div>
    </div>
  );
}

export default HoTroKhachHang;

