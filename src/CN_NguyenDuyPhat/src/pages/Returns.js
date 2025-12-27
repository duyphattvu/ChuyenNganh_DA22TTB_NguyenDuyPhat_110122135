import './InfoPage.css';

function Returns() {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1 className="info-title">Chính sách đổi trả</h1>
        <div className="info-content">
          <section className="info-section">
            <h2>Thời gian đổi trả</h2>
            <div className="highlight-box">
              <p><strong>⏰ Chúng tôi chấp nhận đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng.</strong></p>
            </div>
          </section>

          <section className="info-section">
            <h2>Điều kiện đổi trả</h2>
            <ul className="info-list">
              <li>✅ Sản phẩm còn nguyên tem, nhãn mác</li>
              <li>✅ Chưa qua sử dụng, còn nguyên vẹn</li>
              <li>✅ Không bị hư hỏng, bẩn, có mùi lạ</li>
              <li>✅ Còn đầy đủ hộp, phụ kiện đi kèm (nếu có)</li>
              <li>✅ Có hóa đơn mua hàng hoặc chứng từ thanh toán</li>
            </ul>
          </section>

          <section className="info-section">
            <h2>Các trường hợp được đổi trả</h2>
            <div className="return-cases">
              <div className="return-case">
                <h3>🔄 Đổi size</h3>
                <p>Đổi sang size lớn hơn hoặc nhỏ hơn nếu size hiện tại không vừa. Miễn phí đổi 1 lần.</p>
              </div>
              <div className="return-case">
                <h3>🎨 Đổi màu</h3>
                <p>Đổi sang màu khác nếu còn hàng. Miễn phí đổi 1 lần.</p>
              </div>
              <div className="return-case">
                <h3>💰 Hoàn tiền</h3>
                <p>Hoàn tiền 100% nếu không hài lòng về chất lượng sản phẩm hoặc lỗi từ nhà sản xuất.</p>
              </div>
              <div className="return-case">
                <h3>❌ Lỗi sản phẩm</h3>
                <p>Đổi mới hoặc hoàn tiền nếu sản phẩm bị lỗi do nhà sản xuất (bong tróc, nứt đế, hỏng khóa...).</p>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2>Quy trình đổi trả</h2>
            <ol className="info-list ordered">
              <li><strong>Liên hệ:</strong> Gọi hotline hoặc gửi email yêu cầu đổi trả</li>
              <li><strong>Xác nhận:</strong> Nhân viên sẽ xác nhận và hướng dẫn quy trình</li>
              <li><strong>Gửi hàng:</strong> Đóng gói sản phẩm và gửi về địa chỉ Shop NDP</li>
              <li><strong>Kiểm tra:</strong> Chúng tôi kiểm tra sản phẩm trong 1-2 ngày</li>
              <li><strong>Xử lý:</strong> Đổi hàng mới hoặc hoàn tiền theo yêu cầu</li>
            </ol>
          </section>

          <section className="info-section">
            <h2>Phí đổi trả</h2>
            <ul className="info-list">
              <li>🆓 <strong>Miễn phí:</strong> Đổi trả do lỗi sản phẩm, lỗi từ Shop NDP</li>
              <li>💵 <strong>Khách hàng chịu phí:</strong> Đổi do không vừa size, không thích màu (30.000đ phí vận chuyển)</li>
            </ul>
          </section>

          <section className="info-section">
            <h2>Lưu ý</h2>
            <ul className="info-list">
              <li>⚠️ Sản phẩm đã qua sử dụng, có dấu hiệu mài mòn sẽ không được chấp nhận đổi trả</li>
              <li>📸 Vui lòng chụp ảnh sản phẩm trước khi gửi để làm bằng chứng</li>
              <li>📦 Đóng gói cẩn thận để tránh hư hỏng trong quá trình vận chuyển</li>
              <li>⏱️ Thời gian xử lý đổi trả: 3-5 ngày làm việc sau khi nhận được hàng</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Returns;

