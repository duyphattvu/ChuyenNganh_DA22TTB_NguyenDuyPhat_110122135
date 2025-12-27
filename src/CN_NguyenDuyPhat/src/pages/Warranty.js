import './InfoPage.css';

function Warranty() {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1 className="info-title">Chính sách bảo hành</h1>
        <div className="info-content">
          <section className="info-section">
            <h2>Thời gian bảo hành</h2>
            <div className="highlight-box">
              <p><strong>🛡️ Tất cả sản phẩm tại Shop NDP đều được bảo hành chính hãng từ 6-12 tháng tùy theo từng thương hiệu.</strong></p>
            </div>
            <div className="warranty-table">
              <div className="table-row">
                <div className="table-cell"><strong>Thương hiệu</strong></div>
                <div className="table-cell"><strong>Thời gian bảo hành</strong></div>
              </div>
              <div className="table-row">
                <div className="table-cell">Adidas</div>
                <div className="table-cell">12 tháng</div>
              </div>
              <div className="table-row">
                <div className="table-cell">Nike</div>
                <div className="table-cell">12 tháng</div>
              </div>
              <div className="table-row">
                <div className="table-cell">Các thương hiệu khác</div>
                <div className="table-cell">6-12 tháng (theo chính sách hãng)</div>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2>Phạm vi bảo hành</h2>
            <h3>✅ Các lỗi được bảo hành:</h3>
            <ul className="info-list">
              <li>🔧 Bong tróc đế, nứt đế do lỗi sản xuất</li>
              <li>🧵 Đứt chỉ, bung chỉ tại các đường may</li>
              <li>🔒 Hỏng khóa, khóa kéo không hoạt động</li>
              <li>🎨 Phai màu, bong tróc lớp phủ do lỗi sản xuất</li>
              <li>💥 Nứt, vỡ các bộ phận do lỗi chất liệu</li>
            </ul>

            <h3>❌ Các trường hợp không được bảo hành:</h3>
            <ul className="info-list">
              <li>⚠️ Hư hỏng do sử dụng không đúng cách</li>
              <li>⚠️ Mài mòn tự nhiên do quá trình sử dụng</li>
              <li>⚠️ Hư hỏng do tai nạn, va đập mạnh</li>
              <li>⚠️ Sản phẩm đã hết thời gian bảo hành</li>
              <li>⚠️ Không có hóa đơn mua hàng hoặc tem bảo hành</li>
            </ul>
          </section>

          <section className="info-section">
            <h2>Quy trình bảo hành</h2>
            <ol className="info-list ordered">
              <li><strong>Liên hệ:</strong> Gọi hotline hoặc đến trực tiếp cửa hàng</li>
              <li><strong>Kiểm tra:</strong> Nhân viên kiểm tra sản phẩm và xác định lỗi</li>
              <li><strong>Xác nhận:</strong> Xác nhận có thuộc phạm vi bảo hành hay không</li>
              <li><strong>Xử lý:</strong> 
                <ul>
                  <li>Sửa chữa tại chỗ (nếu có thể)</li>
                  <li>Gửi về trung tâm bảo hành (7-14 ngày)</li>
                  <li>Đổi mới (nếu không thể sửa chữa)</li>
                </ul>
              </li>
              <li><strong>Nhận lại:</strong> Thông báo khi sản phẩm đã được xử lý xong</li>
            </ol>
          </section>

          <section className="info-section">
            <h2>Địa điểm bảo hành</h2>
            <ul className="info-list">
              <li>🏪 <strong>Tất cả cửa hàng trong hệ thống Shop NDP</strong> - Miễn phí kiểm tra và bảo hành</li>
              <li>📦 <strong>Gửi về trung tâm:</strong> Nếu không thể đến cửa hàng, có thể gửi qua bưu điện</li>
              <li>📞 <strong>Hotline hỗ trợ:</strong> 0983592506 để được tư vấn và hướng dẫn</li>
            </ul>
          </section>

          <section className="info-section">
            <h2>Giấy tờ cần thiết</h2>
            <ul className="info-list">
              <li>📄 Hóa đơn mua hàng hoặc chứng từ thanh toán</li>
              <li>🏷️ Tem bảo hành (nếu có)</li>
              <li>🆔 CMND/CCCD để xác nhận thông tin</li>
            </ul>
          </section>

          <section className="info-section">
            <h2>Lưu ý quan trọng</h2>
            <ul className="info-list">
              <li>⏰ Thời gian bảo hành được tính từ ngày mua hàng</li>
              <li>🔍 Sản phẩm sẽ được kiểm tra kỹ lưỡng trước khi chấp nhận bảo hành</li>
              <li>💼 Giữ lại hóa đơn và tem bảo hành để thuận tiện khi cần</li>
              <li>📞 Liên hệ sớm khi phát hiện lỗi để được xử lý nhanh chóng</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Warranty;

