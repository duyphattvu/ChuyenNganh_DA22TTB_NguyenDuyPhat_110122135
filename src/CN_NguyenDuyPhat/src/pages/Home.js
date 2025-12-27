import React from 'react';
import Banner from '../components/Banner';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import './Home.css';

function Home() {
  const categories = [
    { title: 'Giày Adidas', image: 'https://supersports.com.vn/cdn/shop/files/GW9195-1_1200x1200.jpg?v=1702022941', link: '/Giay-Adidas' },
    { title: 'Giày Puma', image: 'https://bizweb.dktcdn.net/100/494/688/products/10deaad0-10a9-4592-9b22-5f86ed5c0770-1727679185197.jpg?v=1727679192677', link: '/Giay-Puma' },
    { title: 'Giày Thể Thao', image: 'https://media.istockphoto.com/id/1436061606/vi/anh/bay-gi%C3%A0y-th%E1%BB%83-thao-n%E1%BB%AF-%C4%91%E1%BA%A7y-m%C3%A0u-s%E1%BA%AFc-b%E1%BB%8B-c%C3%B4-l%E1%BA%ADp-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng-gi%C3%A0y-th%E1%BB%83-thao-th%E1%BB%9Di-trang-s%C3%A0nh-%C4%91i%E1%BB%87u.jpg?s=612x612&w=0&k=20&c=xaCiookdaKRynO2-IewN0j2OZO_gTV6VmUDi3HJPQMc=', link: '/Giay-The-Thao' },
  ];

  const products = [
    { title: "Nike Air Max", price: "2.500.000₫", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
    { title: "Adidas Ultra Boost", price: "3.200.000₫", image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111" },
    { title: "Nike Air Force 1 '07 LV8", price: "3.519.000₫", image: "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/ab49cd62-e261-4dee-8511-242148604889/AIR+FORCE+1+%2707+LV8.png" },
    { title: "Nike Zoom Vomero 5 SE", price: "3.999.000₫", image: "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/158136db-6a4c-48c2-adb5-30b688c038fa/NIKE+ZOOM+VOMERO+5+SE.png" },
  ];

  return (
    <div>
      <Banner />
      <section className="categories">
        <h2 className="section-title">Danh Mục Sản Phẩm</h2>
        <div className="category-grid">
          {categories.map((cat, index) => (
            <CategoryCard key={index} title={cat.title} image={cat.image} link={cat.link} />
          ))}
        </div>
      </section>

      <section className="products">
        <h2 className="section-title">Sản Phẩm Nổi Bật</h2>
        <div className="product-grid">
          {products.map((prod, index) => (
            <ProductCard key={index} title={prod.title} price={prod.price} image={prod.image} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
