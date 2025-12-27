import React from 'react';
import './InfoPage.css';

function Stores() {
  const stores = [
    {
      city: 'Hà Nội',
      locations: [
        { name: 'Shop NDP Tràng Tiền', address: '123 Tràng Tiền, Hoàn Kiếm, Hà Nội', phone: '024.1234.5678', hours: '8:00 - 22:00' },
        { name: 'Shop NDP Láng Hạ', address: '456 Láng Hạ, Đống Đa, Hà Nội', phone: '024.2345.6789', hours: '8:00 - 22:00' },
        { name: 'Shop NDP Cầu Giấy', address: '789 Cầu Giấy, Cầu Giấy, Hà Nội', phone: '024.3456.7890', hours: '8:00 - 22:00' }
      ]
    },
    {
      city: 'TP. Hồ Chí Minh',
      locations: [
        { name: 'Shop NDP Nguyễn Huệ', address: '321 Nguyễn Huệ, Quận 1, TP.HCM', phone: '028.1234.5678', hours: '8:00 - 22:00' },
        { name: 'Shop NDP Đinh Tiên Hoàng', address: '654 Đinh Tiên Hoàng, Bình Thạnh, TP.HCM', phone: '028.2345.6789', hours: '8:00 - 22:00' },
        { name: 'Shop NDP Phạm Văn Đồng', address: '987 Phạm Văn Đồng, Thủ Đức, TP.HCM', phone: '028.3456.7890', hours: '8:00 - 22:00' }
      ]
    },
    {
      city: 'Đà Nẵng',
      locations: [
        { name: 'Shop NDP Lê Duẩn', address: '147 Lê Duẩn, Hải Châu, Đà Nẵng', phone: '0236.1234.567', hours: '8:00 - 22:00' }
      ]
    }
  ];

  return (
    <div className="info-page">
      <div className="info-container">
        <h1 className="info-title">Hệ thống cửa hàng</h1>
        <div className="info-content">
          <section className="info-section">
            <p>
              Shop NDP hiện có hệ thống cửa hàng trải dài trên toàn quốc với hơn 20 điểm bán hàng tại các thành phố lớn. 
              Tất cả cửa hàng đều được trang bị đầy đủ cơ sở vật chất hiện đại, đội ngũ nhân viên chuyên nghiệp sẵn sàng tư vấn và phục vụ khách hàng.
            </p>
          </section>

          {stores.map((cityGroup, index) => (
            <section key={index} className="info-section">
              <h2>📍 {cityGroup.city}</h2>
              <div className="stores-grid">
                {cityGroup.locations.map((store, storeIndex) => (
                  <div key={storeIndex} className="store-card">
                    <h3>{store.name}</h3>
                    <div className="store-info">
                      <p><strong>Địa chỉ:</strong> {store.address}</p>
                      <p><strong>Điện thoại:</strong> {store.phone}</p>
                      <p><strong>Giờ mở cửa:</strong> {store.hours}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section className="info-section">
            <h2>Dịch vụ tại cửa hàng</h2>
            <ul className="info-list">
              <li>🛍️ Mua sắm trực tiếp với đầy đủ mẫu mã, size số</li>
              <li>👟 Thử giày miễn phí, tư vấn chọn size phù hợp</li>
              <li>📦 Đổi trả sản phẩm trực tiếp tại cửa hàng</li>
              <li>🔧 Bảo hành và sửa chữa sản phẩm</li>
              <li>💳 Thanh toán đa dạng: tiền mặt, thẻ, ví điện tử</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Stores;

