import React from 'react';
import './InfoPage.css';

function About() {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1 className="info-title">Giới thiệu về Shop NDP</h1>
        <div className="info-content">
          <section className="info-section">
            <h2>Về chúng tôi</h2>
            <p>
              Shop NDP là địa chỉ uy tín chuyên cung cấp các sản phẩm giày thể thao chính hãng từ các thương hiệu nổi tiếng như Adidas, Nike. 
              Với hơn 5 năm kinh nghiệm trong ngành, chúng tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng cao với giá cả hợp lý nhất.
            </p>
          </section>

          <section className="info-section">
            <h2>Sứ mệnh</h2>
            <p>
              Sứ mệnh của Shop NDP là trở thành địa chỉ tin cậy hàng đầu cho mọi khách hàng yêu thích giày thể thao. 
              Chúng tôi không chỉ bán sản phẩm mà còn mang đến trải nghiệm mua sắm tuyệt vời, dịch vụ chăm sóc khách hàng tận tâm.
            </p>
          </section>

          <section className="info-section">
            <h2>Cam kết</h2>
            <ul className="info-list">
              <li>✅ 100% sản phẩm chính hãng, có giấy tờ chứng minh nguồn gốc</li>
              <li>✅ Giá cả cạnh tranh nhất thị trường</li>
              <li>✅ Dịch vụ giao hàng nhanh chóng, an toàn</li>
              <li>✅ Chính sách đổi trả linh hoạt, hỗ trợ 24/7</li>
              <li>✅ Đội ngũ nhân viên chuyên nghiệp, nhiệt tình</li>
            </ul>
          </section>

          <section className="info-section">
            <h2>Thương hiệu</h2>
            <p>
              Shop NDP tự hào là đối tác chính thức của các thương hiệu giày thể thao hàng đầu thế giới. 
              Chúng tôi cung cấp đầy đủ các dòng sản phẩm từ Adidas, Nike với đa dạng mẫu mã, size số để đáp ứng mọi nhu cầu của khách hàng.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;

