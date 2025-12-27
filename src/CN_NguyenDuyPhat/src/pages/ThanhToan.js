import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useInventory } from '../context/InventoryContext';
import { useNavigate } from 'react-router-dom';
import './ThanhToan.css';

// Dữ liệu tỉnh/thành phố và quận/huyện theo quy định chính thức
const PROVINCES_AND_DISTRICTS = {
  'Hà Nội': {
    fee: 30000,
    days: '1-2',
    districts: [
      'Quận Ba Đình', 'Quận Hoàn Kiếm', 'Quận Tây Hồ', 'Quận Long Biên', 'Quận Cầu Giấy',
      'Quận Đống Đa', 'Quận Hai Bà Trưng', 'Quận Hoàng Mai', 'Quận Thanh Xuân', 'Quận Sóc Sơn',
      'Quận Đông Anh', 'Quận Gia Lâm', 'Quận Nam Từ Liêm', 'Quận Bắc Từ Liêm', 'Quận Mê Linh',
      'Quận Hà Đông', 'Quận Sơn Tây', 'Quận Ba Vì', 'Quận Phúc Thọ', 'Quận Đan Phượng',
      'Quận Hoài Đức', 'Quận Quốc Oai', 'Quận Thạch Thất', 'Quận Chương Mỹ', 'Quận Thanh Oai',
      'Quận Thường Tín', 'Quận Phú Xuyên', 'Quận Ứng Hòa', 'Quận Mỹ Đức'
    ]
  },
  'Hồ Chí Minh': {
    fee: 20000,
    days: '1-2',
    districts: [
      'Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8',
      'Quận 9', 'Quận 10', 'Quận 11', 'Quận 12', 'Quận Bình Thạnh', 'Quận Tân Bình',
      'Quận Tân Phú', 'Quận Phú Nhuận', 'Quận Gò Vấp', 'Quận Bình Tân', 'Quận Thủ Đức',
      'Huyện Củ Chi', 'Huyện Hóc Môn', 'Huyện Bình Chánh', 'Huyện Nhà Bè', 'Huyện Cần Giờ'
    ]
  },
  'Đà Nẵng': {
    fee: 30000,
    days: '2-3',
    districts: [
      'Quận Hải Châu', 'Quận Thanh Khê', 'Quận Sơn Trà', 'Quận Ngũ Hành Sơn',
      'Quận Liên Chiểu', 'Quận Cẩm Lệ', 'Huyện Hòa Vang', 'Huyện Hoàng Sa'
    ]
  },
  'Hải Phòng': {
    fee: 35000,
    days: '2-3',
    districts: [
      'Quận Hồng Bàng', 'Quận Ngô Quyền', 'Quận Lê Chân', 'Quận Hải An', 'Quận Kiến An',
      'Quận Đồ Sơn', 'Quận Dương Kinh', 'Huyện Thuỷ Nguyên', 'Huyện An Dương', 'Huyện An Lão',
      'Huyện Kiến Thuỵ', 'Huyện Tiên Lãng', 'Huyện Vĩnh Bảo', 'Huyện Cát Hải', 'Huyện Bạch Long Vĩ'
    ]
  },
  'Cần Thơ': {
    fee: 25000,
    days: '2-3',
    districts: [
      'Quận Ninh Kiều', 'Quận Ô Môn', 'Quận Bình Thuỷ', 'Quận Cái Răng', 'Quận Thốt Nốt',
      'Huyện Vĩnh Thạnh', 'Huyện Cờ Đỏ', 'Huyện Phong Điền', 'Huyện Thới Lai'
    ]
  },
  'An Giang': {
    fee: 30000,
    days: '2-3',
    districts: [
      'Thành phố Long Xuyên', 'Thành phố Châu Đốc', 'Thị xã Tân Châu',
      'Huyện An Phú', 'Huyện Châu Phú', 'Huyện Châu Thành', 'Huyện Chợ Mới',
      'Huyện Phú Tân', 'Huyện Thoại Sơn', 'Huyện Tịnh Biên', 'Huyện Tri Tôn'
    ]
  },
  'Bà Rịa - Vũng Tàu': {
    fee: 25000,
    days: '2-3',
    districts: [
      'Thành phố Vũng Tàu', 'Thành phố Bà Rịa', 'Thị xã Phú Mỹ',
      'Huyện Châu Đức', 'Huyện Côn Đảo', 'Huyện Đất Đỏ', 'Huyện Long Điền', 'Huyện Tân Thành', 'Huyện Xuyên Mộc'
    ]
  },
  'Bạc Liêu': {
    fee: 35000,
    days: '3-4',
    districts: [
      'Thành phố Bạc Liêu', 'Huyện Hồng Dân', 'Huyện Phước Long', 'Huyện Vĩnh Lợi',
      'Huyện Giá Rai', 'Huyện Đông Hải', 'Huyện Hoà Bình'
    ]
  },
  'Bắc Giang': {
    fee: 38000,
    days: '3-4',
    districts: [
      'Thành phố Bắc Giang', 'Huyện Yên Thế', 'Huyện Tân Yên', 'Huyện Lạng Giang',
      'Huyện Lục Nam', 'Huyện Lục Ngạn', 'Huyện Sơn Động', 'Huyện Yên Dũng', 'Huyện Việt Yên', 'Huyện Hiệp Hoà'
    ]
  },
  'Bắc Kạn': {
    fee: 45000,
    days: '4-5',
    districts: [
      'Thành phố Bắc Kạn', 'Huyện Pác Nặm', 'Huyện Ba Bể', 'Huyện Ngân Sơn',
      'Huyện Bạch Thông', 'Huyện Chợ Đồn', 'Huyện Chợ Mới', 'Huyện Na Rì'
    ]
  },
  'Bắc Ninh': {
    fee: 35000,
    days: '2-3',
    districts: [
      'Thành phố Bắc Ninh', 'Thị xã Từ Sơn', 'Huyện Yên Phong', 'Huyện Quế Võ',
      'Huyện Tiên Du', 'Huyện Từ Sơn', 'Huyện Gia Bình', 'Huyện Lương Tài'
    ]
  },
  'Bến Tre': {
    fee: 28000,
    days: '2-3',
    districts: [
      'Thành phố Bến Tre', 'Huyện Châu Thành', 'Huyện Chợ Lách', 'Huyện Mỏ Cày Bắc',
      'Huyện Mỏ Cày Nam', 'Huyện Giồng Trôm', 'Huyện Bình Đại', 'Huyện Ba Tri', 'Huyện Thạnh Phú'
    ]
  },
  'Bình Định': {
    fee: 35000,
    days: '3-4',
    districts: [
      'Thành phố Quy Nhon', 'Thị xã An Nhơn', 'Huyện Hoài Nhơn', 'Huyện Hoài Ân',
      'Huyện Phù Mỹ', 'Huyện Vĩnh Thạnh', 'Huyện Tây Sơn', 'Huyện Phù Cát', 'Huyện Tuy Phước'
    ]
  },
  'Bình Dương': {
    fee: 20000,
    days: '1-2',
    districts: [
      'Thành phố Thủ Dầu Một', 'Thị xã Dĩ An', 'Thị xã Tân Uyên', 'Thị xã Thuận An',
      'Huyện Bến Cát', 'Huyện Dầu Tiếng', 'Huyện Bàu Bàng', 'Huyện Phú Giáo', 'Huyện Bắc Tân Uyên'
    ]
  },
  'Bình Phước': {
    fee: 28000,
    days: '2-3',
    districts: [
      'Thị xã Đồng Xoài', 'Thị xã Bình Long', 'Huyện Bù Đăng', 'Huyện Bù Gia Mập',
      'Huyện Bù Đốp', 'Huyện Hớn Quản', 'Huyện Đồng Phú', 'Huyện Chơn Thành', 'Huyện Lộc Ninh'
    ]
  },
  'Bình Thuận': {
    fee: 30000,
    days: '2-3',
    districts: [
      'Thành phố Phan Thiết', 'Thị xã La Gi', 'Huyện Tuy Phong', 'Huyện Bắc Bình',
      'Huyện Hàm Thuận Bắc', 'Huyện Hàm Thuận Nam', 'Huyện Tánh Linh', 'Huyện Đức Linh', 'Huyện Hàm Tân', 'Huyện Phú Quí'
    ]
  },
  'Cà Mau': {
    fee: 38000,
    days: '3-4',
    districts: [
      'Thành phố Cà Mau', 'Huyện U Minh', 'Huyện Thới Bình', 'Huyện Trần Văn Thời',
      'Huyện Cái Nước', 'Huyện Đầm Dơi', 'Huyện Ngọc Hiển', 'Huyện Năm Căn', 'Huyện Phú Tân'
    ]
  },
  'Cao Bằng': {
    fee: 45000,
    days: '4-5',
    districts: [
      'Thành phố Cao Bằng', 'Huyện Bảo Lâm', 'Huyện Bảo Lạc', 'Huyện Hà Quảng',
      'Huyện Trùng Khánh', 'Huyện Hạ Lang', 'Huyện Quảng Uyên', 'Huyện Phục Hoà', 'Huyện Hoà An', 'Huyện Nguyên Bình', 'Huyện Thạch An'
    ]
  },
  'Đắk Lắk': {
    fee: 40000,
    days: '3-4',
    districts: [
      'Thành phố Buôn Ma Thuột', 'Thị xã Buôn Hồ', 'Huyện Ea H\'leo', 'Huyện Ea Súp',
      'Huyện Buôn Đôn', 'Huyện Cư M\'gar', 'Huyện Krông Búk', 'Huyện Krông Năng', 'Huyện Ea Kar', 'Huyện M\'Đrắk', 'Huyện Krông Bông', 'Huyện Krông Pắk', 'Huyện Krông A Na', 'Huyện Lắk', 'Huyện Cư Kuin'
    ]
  },
  'Đắk Nông': {
    fee: 42000,
    days: '3-4',
    districts: [
      'Thị xã Gia Nghĩa', 'Huyện Đăk Glong', 'Huyện Cư Jút', 'Huyện Đắk Mil',
      'Huyện Krông Nô', 'Huyện Đắk Song', 'Huyện Đắk R\'Lấp', 'Huyện Tuy Đức'
    ]
  },
  'Điện Biên': {
    fee: 50000,
    days: '4-5',
    districts: [
      'Thành phố Điện Biên Phủ', 'Thị xã Mường Lay', 'Huyện Mường Nhé', 'Huyện Mường Chà',
      'Huyện Tủa Chùa', 'Huyện Tuần Giáo', 'Huyện Điện Biên', 'Huyện Điện Biên Đông', 'Huyện Mường Ảng', 'Huyện Nậm Pồ'
    ]
  },
  'Đồng Nai': {
    fee: 20000,
    days: '1-2',
    districts: [
      'Thành phố Biên Hòa', 'Thị xã Long Khánh', 'Huyện Vĩnh Cửu', 'Huyện Định Quán',
      'Huyện Thống Nhất', 'Huyện Cẩm Mỹ', 'Huyện Long Thành', 'Huyện Xuân Lộc', 'Huyện Nhơn Trạch', 'Huyện Trảng Bom', 'Huyện Tân Phú'
    ]
  },
  'Đồng Tháp': {
    fee: 28000,
    days: '2-3',
    districts: [
      'Thành phố Cao Lãnh', 'Thành phố Sa Đéc', 'Thị xã Hồng Ngự', 'Huyện Tân Hồng',
      'Huyện Tân Hưng', 'Huyện Tam Nông', 'Huyện Thanh Bình', 'Huyện Tháp Mười', 'Huyện Cao Lãnh', 'Huyện Lấp Vò', 'Huyện Lai Vung', 'Huyện Châu Thành'
    ]
  },
  'Gia Lai': {
    fee: 40000,
    days: '3-4',
    districts: [
      'Thành phố Pleiku', 'Thị xã An Khê', 'Thị xã Ayun Pa', 'Huyện KBang',
      'Huyện Đăk Đoa', 'Huyện Chư Păh', 'Huyện Ia Grai', 'Huyện Mang Yang', 'Huyện Kông Chro', 'Huyện Đức Cơ', 'Huyện Chư Prông', 'Huyện Chư Sê', 'Huyện Đăk Pơ', 'Huyện Ia Pa', 'Huyện Krông Pa', 'Huyện Phú Thiện', 'Huyện Chư Pưh'
    ]
  },
  'Hà Giang': {
    fee: 45000,
    days: '4-5',
    districts: [
      'Thành phố Hà Giang', 'Huyện Đồng Văn', 'Huyện Mèo Vạc', 'Huyện Yên Minh',
      'Huyện Quản Bạ', 'Huyện Vị Xuyên', 'Huyện Bắc Mê', 'Huyện Hoàng Su Phì', 'Huyện Xín Mần', 'Huyện Bắc Quang', 'Huyện Quang Bình'
    ]
  },
  'Hà Nam': {
    fee: 35000,
    days: '2-3',
    districts: [
      'Thành phố Phủ Lý', 'Huyện Duy Tiên', 'Huyện Kim Bảng', 'Huyện Thanh Liêm',
      'Huyện Bình Lục', 'Huyện Lý Nhân'
    ]
  },
  'Hà Tĩnh': {
    fee: 38000,
    days: '3-4',
    districts: [
      'Thành phố Hà Tĩnh', 'Thị xã Hồng Lĩnh', 'Huyện Hương Sơn', 'Huyện Đức Thọ',
      'Huyện Vũ Quang', 'Huyện Nghi Xuân', 'Huyện Can Lộc', 'Huyện Hương Khê', 'Huyện Thạch Hà', 'Huyện Cẩm Xuyên', 'Huyện Kỳ Anh', 'Huyện Lộc Hà', 'Huyện Kỳ Anh'
    ]
  },
  'Hải Dương': {
    fee: 35000,
    days: '2-3',
    districts: [
      'Thành phố Hải Dương', 'Thị xã Chí Linh', 'Huyện Nam Sách', 'Huyện Kinh Môn',
      'Huyện Kim Thành', 'Huyện Thanh Hà', 'Huyện Cẩm Giàng', 'Huyện Bình Giang', 'Huyện Gia Lộc', 'Huyện Tứ Kỳ', 'Huyện Ninh Giang', 'Huyện Thanh Miện'
    ]
  },
  'Hậu Giang': {
    fee: 30000,
    days: '2-3',
    districts: [
      'Thành phố Vị Thanh', 'Thị xã Ngã Bảy', 'Huyện Châu Thành A', 'Huyện Châu Thành',
      'Huyện Phụng Hiệp', 'Huyện Vị Thủy', 'Huyện Long Mỹ', 'Thị xã Long Mỹ'
    ]
  },
  'Hòa Bình': {
    fee: 40000,
    days: '3-4',
    districts: [
      'Thành phố Hòa Bình', 'Huyện Đà Bắc', 'Huyện Lương Sơn', 'Huyện Kim Bôi',
      'Huyện Cao Phong', 'Huyện Tân Lạc', 'Huyện Mai Châu', 'Huyện Đà Bắc', 'Huyện Lạc Sơn', 'Huyện Lạc Thủy', 'Huyện Yên Thủy'
    ]
  },
  'Hưng Yên': {
    fee: 35000,
    days: '2-3',
    districts: [
      'Thành phố Hưng Yên', 'Huyện Văn Lâm', 'Huyện Văn Giang', 'Huyện Yên Mỹ',
      'Huyện Mỹ Hào', 'Huyện Ân Thi', 'Huyện Khoái Châu', 'Huyện Kim Động', 'Huyện Tiên Lữ', 'Huyện Phù Cừ'
    ]
  },
  'Khánh Hòa': {
    fee: 32000,
    days: '3-4',
    districts: [
      'Thành phố Nha Trang', 'Thành phố Cam Ranh', 'Thị xã Cam Lâm', 'Huyện Cam Lâm',
      'Huyện Vạn Ninh', 'Huyện Ninh Hòa', 'Huyện Khánh Vĩnh', 'Huyện Diên Khánh', 'Huyện Khánh Sơn', 'Huyện Trường Sa'
    ]
  },
  'Kiên Giang': {
    fee: 32000,
    days: '3-4',
    districts: [
      'Thành phố Rạch Giá', 'Thành phố Hà Tiên', 'Thị xã Hòn Đất', 'Huyện Kiên Lương',
      'Huyện Hòn Đất', 'Huyện Tân Hiệp', 'Huyện Châu Thành', 'Huyện Giồng Riềng', 'Huyện Gò Quao', 'Huyện An Biên', 'Huyện An Minh', 'Huyện Vĩnh Thuận', 'Huyện Phú Quốc', 'Huyện Kiên Hải', 'Huyện U Minh Thượng', 'Huyện Giang Thành'
    ]
  },
  'Kon Tum': {
    fee: 42000,
    days: '3-4',
    districts: [
      'Thành phố Kon Tum', 'Huyện Đắk Glei', 'Huyện Ngọc Hồi', 'Huyện Đắk Tô',
      'Huyện Kon Plông', 'Huyện Kon Rẫy', 'Huyện Đắk Hà', 'Huyện Sa Thầy', 'Huyện Tu Mơ Rông', 'Huyện Ia H\' Drai'
    ]
  },
  'Lai Châu': {
    fee: 50000,
    days: '4-5',
    districts: [
      'Thành phố Lai Châu', 'Huyện Tam Đường', 'Huyện Mường Tè', 'Huyện Sìn Hồ',
      'Huyện Phong Thổ', 'Huyện Than Uyên', 'Huyện Tân Uyên', 'Huyện Nậm Nhùn'
    ]
  },
  'Lâm Đồng': {
    fee: 35000,
    days: '3-4',
    districts: [
      'Thành phố Đà Lạt', 'Thành phố Bảo Lộc', 'Huyện Đam Rông', 'Huyện Lạc Dương',
      'Huyện Lâm Hà', 'Huyện Đơn Dương', 'Huyện Đức Trọng', 'Huyện Đạ Tẻh', 'Huyện Cát Tiên', 'Huyện Bảo Lâm', 'Huyện Đạ Huoai'
    ]
  },
  'Lạng Sơn': {
    fee: 42000,
    days: '3-4',
    districts: [
      'Thành phố Lạng Sơn', 'Huyện Tràng Định', 'Huyện Bình Gia', 'Huyện Văn Lãng',
      'Huyện Cao Lộc', 'Huyện Văn Quan', 'Huyện Bắc Sơn', 'Huyện Hữu Lũng', 'Huyện Chi Lăng', 'Huyện Lộc Bình', 'Huyện Đình Lập'
    ]
  },
  'Lào Cai': {
    fee: 45000,
    days: '4-5',
    districts: [
      'Thành phố Lào Cai', 'Thị xã Sa Pa', 'Huyện Bát Xát', 'Huyện Mường Khương',
      'Huyện Si Ma Cai', 'Huyện Bắc Hà', 'Huyện Bảo Thắng', 'Huyện Bảo Yên', 'Huyện Sa Pa', 'Huyện Văn Bàn'
    ]
  },
  'Long An': {
    fee: 22000,
    days: '1-2',
    districts: [
      'Thành phố Tân An', 'Thị xã Kiến Tường', 'Huyện Tân Hưng', 'Huyện Vĩnh Hưng',
      'Huyện Mộc Hóa', 'Huyện Tân Thạnh', 'Huyện Thạnh Hóa', 'Huyện Đức Huệ', 'Huyện Đức Hòa', 'Huyện Bến Lức', 'Huyện Thủ Thừa', 'Huyện Tân Trụ', 'Huyện Cần Đước', 'Huyện Cần Giuộc', 'Huyện Châu Thành', 'Huyện Tân Phước'
    ]
  },
  'Nam Định': {
    fee: 35000,
    days: '2-3',
    districts: [
      'Thành phố Nam Định', 'Huyện Mỹ Lộc', 'Huyện Vụ Bản', 'Huyện Ý Yên',
      'Huyện Nghĩa Hưng', 'Huyện Nam Trực', 'Huyện Trực Ninh', 'Huyện Xuân Trường', 'Huyện Giao Thủy', 'Huyện Hải Hậu'
    ]
  },
  'Nghệ An': {
    fee: 38000,
    days: '3-4',
    districts: [
      'Thành phố Vinh', 'Thị xã Cửa Lò', 'Thị xã Thái Hòa', 'Thị xã Hoàng Mai',
      'Huyện Quế Phong', 'Huyện Quỳ Châu', 'Huyện Kỳ Sơn', 'Huyện Tương Dương', 'Huyện Nghĩa Đàn', 'Huyện Quỳ Hợp', 'Huyện Quỳnh Lưu', 'Huyện Con Cuông', 'Huyện Tân Kỳ', 'Huyện Anh Sơn', 'Huyện Diễn Châu', 'Huyện Yên Thành', 'Huyện Đô Lương', 'Huyện Thanh Chương', 'Huyện Nghi Lộc', 'Huyện Nam Đàn', 'Huyện Hưng Nguyên'
    ]
  },
  'Ninh Bình': {
    fee: 35000,
    days: '2-3',
    districts: [
      'Thành phố Ninh Bình', 'Thị xã Tam Điệp', 'Huyện Nho Quan', 'Huyện Gia Viễn',
      'Huyện Hoa Lư', 'Huyện Yên Khánh', 'Huyện Kim Sơn', 'Huyện Yên Mô'
    ]
  },
  'Ninh Thuận': {
    fee: 32000,
    days: '3-4',
    districts: [
      'Thành phố Phan Rang - Tháp Chàm', 'Huyện Bác Ái', 'Huyện Ninh Sơn',
      'Huyện Ninh Hải', 'Huyện Ninh Phước', 'Huyện Thuận Bắc', 'Huyện Thuận Nam'
    ]
  },
  'Phú Thọ': {
    fee: 38000,
    days: '3-4',
    districts: [
      'Thành phố Việt Trì', 'Thị xã Phú Thọ', 'Huyện Đoan Hùng', 'Huyện Hạ Hòa',
      'Huyện Thanh Ba', 'Huyện Phù Ninh', 'Huyện Yên Lập', 'Huyện Cẩm Khê', 'Huyện Tam Nông', 'Huyện Lâm Thao', 'Huyện Thanh Sơn', 'Huyện Thanh Thủy', 'Huyện Tân Sơn', 'Huyện Đoan Hùng'
    ]
  },
  'Phú Yên': {
    fee: 35000,
    days: '3-4',
    districts: [
      'Thành phố Tuy Hòa', 'Thị xã Sông Cầu', 'Huyện Đồng Xuân', 'Huyện Tuy An',
      'Huyện Sơn Hòa', 'Huyện Sông Hinh', 'Huyện Tây Hòa', 'Huyện Phú Hòa', 'Huyện Đông Hòa'
    ]
  },
  'Quảng Bình': {
    fee: 38000,
    days: '3-4',
    districts: [
      'Thành phố Đồng Hới', 'Thị xã Ba Đồn', 'Huyện Minh Hóa', 'Huyện Tuyên Hóa',
      'Huyện Quảng Trạch', 'Huyện Bố Trạch', 'Huyện Quảng Ninh', 'Huyện Lệ Thủy'
    ]
  },
  'Quảng Nam': {
    fee: 32000,
    days: '3-4',
    districts: [
      'Thành phố Tam Kỳ', 'Thành phố Hội An', 'Huyện Tây Giang', 'Huyện Đông Giang',
      'Huyện Đại Lộc', 'Huyện Điện Bàn', 'Huyện Duy Xuyên', 'Huyện Quế Sơn', 'Huyện Nam Giang', 'Huyện Phước Sơn', 'Huyện Hiệp Đức', 'Huyện Thăng Bình', 'Huyện Tiên Phước', 'Huyện Bắc Trà My', 'Huyện Nam Trà My', 'Huyện Phú Ninh', 'Huyện Núi Thành'
    ]
  },
  'Quảng Ngãi': {
    fee: 35000,
    days: '3-4',
    districts: [
      'Thành phố Quảng Ngãi', 'Huyện Bình Sơn', 'Huyện Trà Bồng', 'Huyện Sơn Tịnh',
      'Huyện Tư Nghĩa', 'Huyện Sơn Hà', 'Huyện Sơn Tây', 'Huyện Minh Long', 'Huyện Nghĩa Hành', 'Huyện Mộ Đức', 'Huyện Đức Phổ', 'Huyện Ba Tơ', 'Huyện Lý Sơn', 'Huyện Tây Trà'
    ]
  },
  'Quảng Ninh': {
    fee: 38000,
    days: '3-4',
    districts: [
      'Thành phố Hạ Long', 'Thành phố Móng Cái', 'Thành phố Cẩm Phả', 'Thành phố Uông Bí',
      'Thị xã Bình Liêu', 'Thị xã Tiên Yên', 'Thị xã Quảng Yên', 'Thị xã Đông Triều', 'Huyện Vân Đồn', 'Huyện Hoành Bồ', 'Huyện Cô Tô', 'Huyện Đầm Hà', 'Huyện Hải Hà', 'Huyện Ba Chẽ'
    ]
  },
  'Quảng Trị': {
    fee: 38000,
    days: '3-4',
    districts: [
      'Thành phố Đông Hà', 'Thị xã Quảng Trị', 'Huyện Vĩnh Linh', 'Huyện Hướng Hóa',
      'Huyện Gio Linh', 'Huyện Đa Krông', 'Huyện Cam Lộ', 'Huyện Triệu Phong', 'Huyện Hải Lăng', 'Huyện Cồn Cỏ'
    ]
  },
  'Sóc Trăng': {
    fee: 32000,
    days: '3-4',
    districts: [
      'Thành phố Sóc Trăng', 'Huyện Châu Thành', 'Huyện Kế Sách', 'Huyện Mỹ Tú',
      'Huyện Cù Lao Dung', 'Huyện Long Phú', 'Huyện Mỹ Xuyên', 'Huyện Ngã Năm', 'Huyện Thạnh Trị', 'Huyện Vĩnh Châu', 'Huyện Trần Đề'
    ]
  },
  'Sơn La': {
    fee: 45000,
    days: '4-5',
    districts: [
      'Thành phố Sơn La', 'Huyện Quỳnh Nhai', 'Huyện Mường La', 'Huyện Thuận Châu',
      'Huyện Mường Tè', 'Huyện Mường Chà', 'Huyện Sông Mã', 'Huyện Sốp Cộp', 'Huyện Yên Châu', 'Huyện Mai Sơn', 'Huyện Mộc Châu', 'Huyện Mường Khương', 'Huyện Vân Hồ'
    ]
  },
  'Tây Ninh': {
    fee: 25000,
    days: '2-3',
    districts: [
      'Thành phố Tây Ninh', 'Huyện Tân Biên', 'Huyện Tân Châu', 'Huyện Dương Minh Châu',
      'Huyện Châu Thành', 'Thị xã Hòa Thành', 'Huyện Gò Dầu', 'Huyện Bến Cầu', 'Thị xã Trảng Bàng', 'Huyện Tân Phú'
    ]
  },
  'Thái Bình': {
    fee: 35000,
    days: '2-3',
    districts: [
      'Thành phố Thái Bình', 'Huyện Quỳnh Phụ', 'Huyện Hưng Hà', 'Huyện Đông Hưng',
      'Huyện Thái Thụy', 'Huyện Tiền Hải', 'Huyện Kiến Xương', 'Huyện Vũ Thư'
    ]
  },
  'Thái Nguyên': {
    fee: 40000,
    days: '3-4',
    districts: [
      'Thành phố Thái Nguyên', 'Thành phố Sông Công', 'Thị xã Phổ Yên', 'Huyện Định Hóa',
      'Huyện Phú Lương', 'Huyện Đồng Hỷ', 'Huyện Võ Nhai', 'Huyện Đại Từ', 'Huyện Phú Bình', 'Huyện Phú Lương'
    ]
  },
  'Thanh Hóa': {
    fee: 38000,
    days: '3-4',
    districts: [
      'Thành phố Thanh Hóa', 'Thị xã Bỉm Sơn', 'Thị xã Sầm Sơn', 'Huyện Mường Lát',
      'Huyện Quan Hóa', 'Huyện Bá Thước', 'Huyện Quan Sơn', 'Huyện Lang Chánh', 'Huyện Ngọc Lặc', 'Huyện Cẩm Thủy', 'Huyện Thạch Thành', 'Huyện Hà Trung', 'Huyện Vĩnh Lộc', 'Huyện Yên Định', 'Huyện Thọ Xuân', 'Huyện Thường Xuân', 'Huyện Tĩnh Gia', 'Huyện Thiệu Hóa', 'Huyện Hoằng Hóa', 'Huyện Hậu Lộc', 'Huyện Nga Sơn', 'Huyện Như Xuân', 'Huyện Như Thanh', 'Huyện Nông Cống', 'Huyện Đông Sơn', 'Huyện Quảng Xương', 'Huyện Tĩnh Gia', 'Huyện Triệu Sơn', 'Huyện Thọ Xuân'
    ]
  },
  'Thừa Thiên Huế': {
    fee: 35000,
    days: '3-4',
    districts: [
      'Thành phố Huế', 'Thị xã Hương Thủy', 'Thị xã Hương Trà', 'Huyện Phong Điền',
      'Huyện Quảng Điền', 'Huyện Phú Vang', 'Huyện Phú Lộc', 'Huyện A Lưới', 'Huyện Nam Đông'
    ]
  },
  'Tiền Giang': {
    fee: 25000,
    days: '2-3',
    districts: [
      'Thành phố Mỹ Tho', 'Thị xã Gò Công', 'Thị xã Cai Lậy', 'Huyện Tân Phú Đông',
      'Huyện Cái Bè', 'Huyện Cai Lậy', 'Huyện Châu Thành', 'Huyện Chợ Gạo', 'Huyện Gò Công Tây', 'Huyện Gò Công Đông', 'Huyện Tân Phước', 'Huyện Tân Phú Đông'
    ]
  },
  'Trà Vinh': {
    fee: 30000,
    days: '2-3',
    districts: [
      'Thành phố Trà Vinh', 'Huyện Càng Long', 'Huyện Cầu Kè', 'Huyện Tiểu Cần',
      'Huyện Châu Thành', 'Huyện Trà Cú', 'Huyện Cầu Ngang', 'Huyện Duyên Hải', 'Thị xã Duyên Hải'
    ]
  },
  'Tuyên Quang': {
    fee: 42000,
    days: '3-4',
    districts: [
      'Thành phố Tuyên Quang', 'Huyện Lâm Bình', 'Huyện Na Hang', 'Huyện Chiêm Hóa',
      'Huyện Hàm Yên', 'Huyện Yên Sơn', 'Huyện Sơn Dương'
    ]
  },
  'Vĩnh Long': {
    fee: 28000,
    days: '2-3',
    districts: [
      'Thành phố Vĩnh Long', 'Huyện Long Hồ', 'Huyện Mang Thít', 'Huyện Vũng Liêm',
      'Huyện Tam Bình', 'Thị xã Bình Minh', 'Huyện Trà Ôn', 'Huyện Bình Tân'
    ]
  },
  'Vĩnh Phúc': {
    fee: 35000,
    days: '2-3',
    districts: [
      'Thành phố Vĩnh Yên', 'Thị xã Phúc Yên', 'Huyện Lập Thạch', 'Huyện Tam Dương',
      'Huyện Tam Đảo', 'Huyện Bình Xuyên', 'Huyện Yên Lạc', 'Huyện Vĩnh Tường', 'Huyện Sông Lô'
    ]
  },
  'Yên Bái': {
    fee: 42000,
    days: '3-4',
    districts: [
      'Thành phố Yên Bái', 'Thị xã Nghĩa Lộ', 'Huyện Lục Yên', 'Huyện Văn Yên',
      'Huyện Mù Cang Chải', 'Huyện Trấn Yên', 'Huyện Trạm Tấu', 'Huyện Văn Chấn', 'Huyện Yên Bình'
    ]
  }
};

// Tạo SHIPPING_REGIONS từ PROVINCES_AND_DISTRICTS để tương thích với code cũ
const SHIPPING_REGIONS = Object.keys(PROVINCES_AND_DISTRICTS).reduce((acc, province) => {
  acc[province] = {
    fee: PROVINCES_AND_DISTRICTS[province].fee,
    days: PROVINCES_AND_DISTRICTS[province].days
  };
  return acc;
}, {});

const BANK_INFO = {
  bankId: 'MB',
  bankName: 'MB Bank',
  accountNumber: '6699990318',
  accountName: 'NGUYEN DUY PHAT',
};

const FREE_SHIPPING_THRESHOLD = 1000000;

function ThanhToan() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { confirmSale } = useInventory();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: '',
    email: user?.email || '',
    address: '',
    city: '',
    district: '',
    note: '',
    paymentMethod: 'cod'
  });

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'city') {
      // Reset district khi đổi tỉnh
      setFormData({ ...formData, city: value, district: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
  };

  const subtotal = getTotalPrice();
  const selectedRegion = SHIPPING_REGIONS[formData.city];
  const baseShippingFee = selectedRegion ? selectedRegion.fee : 0;
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : baseShippingFee;
  const deliveryDays = selectedRegion ? selectedRegion.days : '';
  const totalWithShipping = subtotal + shippingFee;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }

    const order = {
      id: Date.now(),
      user: user.name,
      items: cartItems,
      subtotal: subtotal,
      shippingFee: shippingFee,
      total: totalWithShipping,
      shippingInfo: formData,
      status: formData.paymentMethod === 'bank' ? 'Chờ thanh toán' : 'Đang xử lý',
      paymentStatus: formData.paymentMethod === 'bank' ? 'Chờ thanh toán' : 'Đã thanh toán',
      paymentMethod: formData.paymentMethod,
      createdAt: new Date().toISOString()
    };

    setCurrentOrder(order);
    setShowOrderModal(true);
  };

  const confirmOrder = () => {
    if (!currentOrder) return;
    cartItems.forEach(item => confirmSale(item.id, item.quantity));
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(currentOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    clearCart(true);
    setShowOrderModal(false);
    setShowSuccessModal(true);
  };

  const generateQRUrl = (amount, orderId) => {
    return `https://img.vietqr.io/image/${BANK_INFO.bankId}-${BANK_INFO.accountNumber}-compact2.png?amount=${amount}&addInfo=DH${orderId}&accountName=${encodeURIComponent(BANK_INFO.accountName)}`;
  };

  // Empty cart
  if (cartItems.length === 0 && !showSuccessModal) {
    return (
      <div className="checkout-page">
        <div className="checkout-empty">
          <div className="empty-icon">🛒</div>
          <h2>Giỏ hàng trống</h2>
          <p>Vui lòng thêm sản phẩm trước khi thanh toán</p>
          <button className="btn-back-shop" onClick={() => navigate('/')}>
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      {/* Progress Steps */}
      <div className="checkout-progress">
        <div className="progress-step completed">
          <div className="step-number">✓</div>
          <span>Giỏ hàng</span>
        </div>
        <div className="progress-line active"></div>
        <div className="progress-step active">
          <div className="step-number">2</div>
          <span>Thanh toán</span>
        </div>
        <div className="progress-line"></div>
        <div className="progress-step">
          <div className="step-number">3</div>
          <span>Hoàn tất</span>
        </div>
      </div>

      <div className="checkout-content">
        {/* Left Column - Form */}
        <div className="checkout-left">
          {/* Shipping Info */}
          <div className="checkout-section">
            <div className="section-header">
              <span className="section-icon">📍</span>
              <h3>Thông tin giao hàng</h3>
            </div>
            
            <form id="checkout-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Họ và tên <span className="required">*</span></label>
                <input 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  placeholder="Nhập họ và tên"
                  required 
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Số điện thoại <span className="required">*</span></label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="0xxx xxx xxx"
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Địa chỉ <span className="required">*</span></label>
                <input 
                  type="text" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  placeholder="Số nhà, tên đường, phường/xã"
                  required 
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tỉnh/Thành phố <span className="required">*</span></label>
                  <select name="city" value={formData.city} onChange={handleChange} required>
                    <option value="">-- Chọn tỉnh/TP --</option>
                    {Object.keys(PROVINCES_AND_DISTRICTS).sort().map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Quận/Huyện <span className="required">*</span></label>
                  <select 
                    name="district" 
                    value={formData.district} 
                    onChange={handleChange}
                    required
                    disabled={!formData.city}
                  >
                    <option value="">
                      {formData.city ? '-- Chọn quận/huyện --' : '-- Chọn tỉnh/TP trước --'}
                    </option>
                    {formData.city && PROVINCES_AND_DISTRICTS[formData.city]?.districts.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
              </div>

              {formData.city && (
                <div className="shipping-estimate">
                  <div className="estimate-icon">🚚</div>
                  <div className="estimate-info">
                    <div className="estimate-location">{formData.city}</div>
                    <div className="estimate-time">Dự kiến giao trong {deliveryDays} ngày</div>
                  </div>
                  <div className="estimate-fee">
                    {shippingFee === 0 ? (
                      <span className="free">Miễn phí</span>
                    ) : (
                      <span className="paid">{formatPrice(baseShippingFee)}</span>
                    )}
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>Ghi chú đơn hàng</label>
                <textarea 
                  name="note" 
                  value={formData.note} 
                  onChange={handleChange} 
                  placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn"
                  rows="3"
                />
              </div>
            </form>
          </div>

          {/* Payment Method */}
          <div className="checkout-section">
            <div className="section-header">
              <span className="section-icon">💳</span>
              <h3>Phương thức thanh toán</h3>
            </div>
            
            <div className="payment-options">
              <label className={`payment-card ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="cod" 
                  checked={formData.paymentMethod === 'cod'} 
                  onChange={handleChange} 
                />
                <div className="payment-icon">💵</div>
                <div className="payment-info">
                  <div className="payment-title">Thanh toán khi nhận hàng</div>
                  <div className="payment-desc">Thanh toán bằng tiền mặt khi nhận hàng</div>
                </div>
                <div className="payment-check">✓</div>
              </label>

              <label className={`payment-card ${formData.paymentMethod === 'bank' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="bank" 
                  checked={formData.paymentMethod === 'bank'} 
                  onChange={handleChange} 
                />
                <div className="payment-icon">🏦</div>
                <div className="payment-info">
                  <div className="payment-title">Chuyển khoản ngân hàng</div>
                  <div className="payment-desc">Quét mã QR để thanh toán nhanh chóng</div>
                </div>
                <div className="payment-check">✓</div>
              </label>
            </div>

            {formData.paymentMethod === 'bank' && (
              <div className="bank-info-preview">
                <div className="bank-name">{BANK_INFO.bankName}</div>
                <div className="bank-account">{BANK_INFO.accountNumber}</div>
                <div className="bank-holder">{BANK_INFO.accountName}</div>
              </div>
            )}
          </div>

          {/* Free Shipping Notice */}
          {subtotal < FREE_SHIPPING_THRESHOLD && (
            <div className="free-shipping-notice">
              <span className="notice-icon">🎁</span>
              <span>Mua thêm <strong>{formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)}</strong> để được miễn phí vận chuyển!</span>
            </div>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div className="checkout-right">
          <div className="order-summary-card">
            <h3>Đơn hàng của bạn</h3>
            
            {/* Product List */}
            <div className="order-products">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${item.size}-${index}`} className="order-product-item">
                  <div className="product-image">
                    <img src={item.image} alt={item.name} />
                    <span className="product-qty">{item.quantity}</span>
                  </div>
                  <div className="product-details">
                    <div className="product-name">{item.name}</div>
                    <div className="product-variant">
                      {item.size && <span>Size: {item.size}</span>}
                      {item.color && <span> • {item.color.name}</span>}
                    </div>
                  </div>
                  <div className="product-price">
                    {formatPrice((item.salePrice || item.price) * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="order-calculations">
              <div className="calc-row">
                <span>Tạm tính ({totalItems} sản phẩm)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="calc-row">
                <span>Phí vận chuyển</span>
                <span className={shippingFee === 0 ? 'free-text' : ''}>
                  {formData.city ? (shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)) : 'Chọn địa chỉ'}
                </span>
              </div>
              {shippingFee === 0 && subtotal >= FREE_SHIPPING_THRESHOLD && (
                <div className="calc-row discount">
                  <span>🎉 Ưu đãi miễn phí ship</span>
                  <span>-{formatPrice(baseShippingFee)}</span>
                </div>
              )}
            </div>

            <div className="order-total">
              <span>Tổng cộng</span>
              <span className="total-price">{formatPrice(totalWithShipping)}</span>
            </div>

            <button type="submit" form="checkout-form" className="btn-place-order">
              Đặt hàng ngay
            </button>

            <button type="button" className="btn-back" onClick={() => navigate('/gio-hang')}>
              ← Quay lại giỏ hàng
            </button>

            <div className="secure-checkout">
              <span>🔒</span> Thanh toán an toàn & bảo mật
            </div>
          </div>
        </div>
      </div>


      {/* Order Confirmation Modal */}
      {showOrderModal && currentOrder && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <div className="modal-header">
              <h2>Xác nhận đơn hàng</h2>
              <p>Mã đơn: #{currentOrder.id}</p>
            </div>
            
            <div className="modal-body">
              {/* Customer Info */}
              <div className="confirm-section">
                <h4>📍 Thông tin giao hàng</h4>
                <div className="confirm-info">
                  <p><strong>{currentOrder.shippingInfo.fullName}</strong></p>
                  <p>{currentOrder.shippingInfo.phone}</p>
                  <p>{currentOrder.shippingInfo.address}, {currentOrder.shippingInfo.district && `${currentOrder.shippingInfo.district}, `}{currentOrder.shippingInfo.city}</p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="confirm-section">
                <h4>💳 Phương thức thanh toán</h4>
                <div className="confirm-payment">
                  {currentOrder.shippingInfo.paymentMethod === 'cod' ? (
                    <span className="payment-badge cod">💵 Thanh toán khi nhận hàng</span>
                  ) : (
                    <span className="payment-badge bank">🏦 Chuyển khoản ngân hàng</span>
                  )}
                </div>
              </div>

              {/* QR Code for Bank Transfer */}
              {currentOrder.shippingInfo.paymentMethod === 'bank' && (
                <div className="qr-section">
                  <img src={generateQRUrl(currentOrder.total, currentOrder.id)} alt="QR Code" className="qr-image" />
                  <div className="qr-info">
                    <p><span>Ngân hàng:</span> {BANK_INFO.bankName}</p>
                    <p><span>Số TK:</span> {BANK_INFO.accountNumber}</p>
                    <p><span>Chủ TK:</span> {BANK_INFO.accountName}</p>
                    <p><span>Nội dung:</span> DH{currentOrder.id}</p>
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="confirm-summary">
                <div className="summary-line">
                  <span>Tạm tính</span>
                  <span>{formatPrice(currentOrder.subtotal)}</span>
                </div>
                <div className="summary-line">
                  <span>Phí vận chuyển</span>
                  <span>{currentOrder.shippingFee === 0 ? 'Miễn phí' : formatPrice(currentOrder.shippingFee)}</span>
                </div>
                <div className="summary-line total">
                  <span>Tổng thanh toán</span>
                  <span>{formatPrice(currentOrder.total)}</span>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowOrderModal(false)}>
                Quay lại
              </button>
              <button className="btn-confirm" onClick={confirmOrder}>
                Xác nhận đặt hàng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && currentOrder && (
        <div className="modal-overlay">
          <div className="success-modal">
            <div className="success-icon">
              <div className="checkmark">✓</div>
            </div>
            <h2>Đặt hàng thành công!</h2>
            <p className="success-message">Cảm ơn bạn đã mua hàng tại Shop NDP</p>
            
            <div className="order-code">
              <span>Mã đơn hàng</span>
              <strong>#{currentOrder.id}</strong>
            </div>

            <div className="success-details">
              <div className="detail-item">
                <span className="label">Tổng tiền:</span>
                <span className="value">{formatPrice(currentOrder.total)}</span>
              </div>
              <div className="detail-item">
                <span className="label">Giao đến:</span>
                <span className="value">{currentOrder.shippingInfo.city}</span>
              </div>
              <div className="detail-item">
                <span className="label">Dự kiến:</span>
                <span className="value">{SHIPPING_REGIONS[currentOrder.shippingInfo.city]?.days || '2-3'} ngày</span>
              </div>
            </div>

            <div className="success-actions">
              <button className="btn-track" onClick={() => { setShowSuccessModal(false); navigate('/don-hang-cua-toi'); }}>
                📦 Theo dõi đơn hàng
              </button>
              <button className="btn-continue-shopping" onClick={() => { setShowSuccessModal(false); navigate('/'); }}>
                Tiếp tục mua sắm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ThanhToan;
