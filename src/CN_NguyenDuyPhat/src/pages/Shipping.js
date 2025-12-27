import './InfoPage.css';

function Shipping() {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1 className="info-title">Chính sách vận chuyển</h1>
        <div className="info-content">
          <section className="info-section">
            <h2>Miễn phí vận chuyển</h2>
            <div className="highlight-box">
              <p><strong>🎉 Miễn phí vận chuyển cho đơn hàng trên 1 triệu đồng!</strong></p>
              <p>Áp dụng cho tất cả các đơn hàng trên toàn quốc, không giới hạn khoảng cách.</p>
            </div>
          </section>

          <section className="info-section">
            <h2>Phí vận chuyển</h2>
            <div className="shipping-table">
              <div className="table-row">
                <div className="table-cell"><strong>Khu vực</strong></div>
                <div className="table-cell"><strong>Thời gian</strong></div>
                <div className="table-cell"><strong>Phí vận chuyển</strong></div>
              </div>
              <div className="table-row">
                <div className="table-cell">Nội thành Hà Nội, TP.HCM</div>
                <div className="table-cell">24 giờ</div>
                <div className="table-cell">30.000đ</div>
              </div>
              <div className="table-row">
                <div className="table-cell">Các tỉnh thành khác</div>
                <div className="table-cell">2-5 ngày làm việc</div>
                <div className="table-cell">30.000đ</div>
              </div>
              <div className="table-row highlight">
                <div className="table-cell">Toàn quốc (đơn trên 1 triệu)</div>
                <div className="table-cell">2-5 ngày làm việc</div>
                <div className="table-cell">MIỄN PHÍ</div>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2>Hình thức vận chuyển</h2>
            <ul className="info-list">
              <li>🚚 Giao hàng nhanh (Express): Giao trong 24h cho nội thành</li>
              <li>📦 Giao hàng tiêu chuẩn (Standard): Giao trong 2-5 ngày làm việc</li>
              <li>🏪 Nhận tại cửa hàng: Miễn phí, nhận ngay trong ngày</li>
            </ul>
          </section>

          <section className="info-section">
            <h2>Quy trình giao hàng</h2>
            <ol className="info-list ordered">
              <li>Xác nhận đơn hàng: Sau khi đặt hàng, chúng tôi sẽ gọi điện xác nhận trong vòng 2 giờ</li>
              <li>Đóng gói: Sản phẩm được đóng gói cẩn thận, đảm bảo nguyên vẹn</li>
              <li>Vận chuyển: Giao cho đơn vị vận chuyển và cập nhật mã vận đơn</li>
              <li>Giao hàng: Nhân viên giao hàng sẽ liên hệ trước khi đến</li>
              <li>Nhận hàng: Kiểm tra sản phẩm trước khi thanh toán</li>
            </ol>
          </section>

          <section className="info-section">
            <h2>Lưu ý</h2>
            <ul className="info-list">
              <li>⏰ Thời gian giao hàng không tính thứ 7, Chủ nhật và các ngày lễ</li>
              <li>📞 Vui lòng cung cấp số điện thoại chính xác để nhân viên liên hệ</li>
              <li>📦 Kiểm tra kỹ sản phẩm trước khi ký nhận</li>
              <li>🔄 Nếu không nhận được hàng, vui lòng liên hệ hotline để được hỗ trợ</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Shipping;

