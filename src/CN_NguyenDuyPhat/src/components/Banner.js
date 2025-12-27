import { Link } from 'react-router-dom';
import './Banner.css';

function Banner() {
  return (
    <section className="banner">
      <div className="banner-content">
        <h1>Bộ Sưu Tập Mới Nhất</h1>
        <p>Khám phá các mẫu giày thể thao hot nhất 2025</p>
        <Link to="/giay-adidas" className="btn">Xem ngay</Link>
      </div>
    </section>
  );
}

export default Banner;
