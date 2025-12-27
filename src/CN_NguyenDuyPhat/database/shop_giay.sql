-- phpMyAdmin SQL Dump
-- Database: shop_giay
-- Tạo ngày: 20/11/2025

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------

-- Tạo database
CREATE DATABASE IF NOT EXISTS `shop_giay` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `shop_giay`;

-- --------------------------------------------------------

-- Bảng users - Quản lý người dùng
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dữ liệu mẫu users
INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `address`, `role`, `created_at`) VALUES
(1, 'Admin', 'admin@shopgiay.com', 'admin123', '0123456789', 'Hà Nội', 'admin', NOW()),
(2, 'Nguyễn Văn A', 'nguyenvana@gmail.com', '123456', '0987654321', 'TP.HCM', 'user', NOW());

-- --------------------------------------------------------

-- Bảng categories - Danh mục sản phẩm
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dữ liệu categories
INSERT INTO `categories` (`id`, `name`, `slug`, `description`) VALUES
(1, 'Giày Adidas', 'giay-adidas', 'Bộ sưu tập giày Adidas chính hãng'),
(2, 'Giày Puma', 'giay-puma', 'Bộ sưu tập giày Puma chính hãng'),
(3, 'Giày Nike', 'giay-nike', 'Bộ sưu tập giày Nike chính hãng');

-- --------------------------------------------------------

-- Bảng products - Sản phẩm
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,0) NOT NULL,
  `sale_price` decimal(10,0) DEFAULT NULL,
  `image` varchar(500) NOT NULL,
  `stock` int(11) DEFAULT 100,
  `featured` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dữ liệu products - Adidas
INSERT INTO `products` (`category_id`, `name`, `slug`, `description`, `price`, `sale_price`, `image`, `featured`) VALUES
(1, 'Adidas Ultraboost 20', 'adidas-ultraboost-20', 'Giày chạy bộ cao cấp với công nghệ Boost', 2500000, NULL, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/0ae41968d69f49f5b912aafc0106d84a_9366/ultraboost-20-shoes.jpg', 1),
(1, 'Adidas NMD R1', 'adidas-nmd-r1', 'Thiết kế đường phố hiện đại', 3100000, NULL, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/nmd_r1-shoes.jpg', 0),
(1, 'Adidas Superstar', 'adidas-superstar', 'Biểu tượng thời trang kinh điển', 2200000, NULL, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/12365dbc7c424288b7fdabc500fd146e_9366/superstar-shoes.jpg', 1),
(1, 'Adidas Stan Smith', 'adidas-stan-smith', 'Giày tennis cổ điển', 2400000, 1680000, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/0c9b1a93e0e84b6c9d0aad5500db31e2_9366/stan-smith-shoes.jpg', 1),
(1, 'Adidas Gazelle', 'adidas-gazelle', 'Phong cách retro năng động', 2300000, 1610000, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/0c82a91336c6424e9c5aad5500db0d8e_9366/gazelle-shoes.jpg', 0),
(1, 'Adidas Samba', 'adidas-samba', 'Giày bóng đá trong nhà huyền thoại', 2600000, NULL, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/3bbecbdf584e40398446a8bf0117cf62_9366/samba-og-shoes.jpg', 0);

-- Dữ liệu products - Puma
INSERT INTO `products` (`category_id`, `name`, `slug`, `description`, `price`, `sale_price`, `image`, `featured`) VALUES
(2, 'Puma Deviate NITRO 3', 'puma-deviate-nitro-3', 'Giày chạy bộ chuyên nghiệp', 3160000, NULL, 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/310195/01/sv01/fnd/VNM/fmt/png', 1),
(2, 'Puma Suede Classic', 'puma-suede-classic', 'Biểu tượng văn hóa hip-hop', 1800000, 1260000, 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/374915/01/sv01/fnd/VNM/fmt/png', 1),
(2, 'Puma RS-X', 'puma-rs-x', 'Phong cách chunky sneaker', 2500000, 1750000, 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/380462/01/sv01/fnd/VNM/fmt/png', 1),
(2, 'Puma Cali Sport', 'puma-cali-sport', 'Phong cách California thoải mái', 2200000, NULL, 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/380517/01/sv01/fnd/VNM/fmt/png', 0),
(2, 'Puma Mayze', 'puma-mayze', 'Đế platform nổi bật', 2400000, 1680000, 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/384271/01/sv01/fnd/VNM/fmt/png', 0);

-- Dữ liệu products - Nike
INSERT INTO `products` (`category_id`, `name`, `slug`, `description`, `price`, `sale_price`, `image`, `featured`) VALUES
(3, 'Nike Air Max 90', 'nike-air-max-90', 'Biểu tượng Air Max huyền thoại', 2500000, 1875000, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8439f823-86cf-4086-81d2-4f9ff9a66866/air-max-90-shoes-kRsBnD.png', 1),
(3, 'Nike Air Force 1 07', 'nike-air-force-1-07', 'Giày bóng rổ kinh điển nhất', 3519000, NULL, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WrLlWX.png', 1),
(3, 'Nike Dunk Low Retro', 'nike-dunk-low-retro', 'Phong cách skateboard cổ điển', 2929000, 2050000, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/af53d53d-561f-450a-a483-70a7ceee380f/dunk-low-retro-shoes-66RGqF.png', 1),
(3, 'Nike Blazer Mid 77', 'nike-blazer-mid-77', 'Phong cách vintage cao cổ', 2869000, 2008000, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/389b709e-5102-4e55-aa5d-07099b500831/blazer-mid-77-vintage-shoes-nw30B2.png', 0),
(3, 'Nike Cortez', 'nike-cortez', 'Thiết kế retro vượt thời gian', 2199000, NULL, 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/af0c0ab0-62eb-4037-8b90-785f2a7de60d/NIKE+CORTEZ.png', 0);

-- --------------------------------------------------------

-- Bảng orders - Đơn hàng
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `order_code` varchar(50) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` text NOT NULL,
  `city` varchar(100) NOT NULL,
  `district` varchar(100) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `payment_method` enum('cod','bank') DEFAULT 'cod',
  `total_amount` decimal(10,0) NOT NULL,
  `status` enum('pending','processing','shipping','completed','cancelled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_code` (`order_code`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

-- Bảng order_items - Chi tiết đơn hàng
CREATE TABLE `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_image` varchar(500) DEFAULT NULL,
  `price` decimal(10,0) NOT NULL,
  `quantity` int(11) NOT NULL,
  `subtotal` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

-- Bảng cart - Giỏ hàng
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

-- Bảng reviews - Đánh giá sản phẩm
CREATE TABLE `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` int(1) NOT NULL CHECK (`rating` >= 1 AND `rating` <= 5),
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

-- Bảng banners - Quản lý banner
CREATE TABLE `banners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(500) DEFAULT NULL,
  `image` varchar(500) NOT NULL,
  `link` varchar(500) DEFAULT NULL,
  `position` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dữ liệu banners mẫu
INSERT INTO `banners` (`title`, `subtitle`, `image`, `link`, `position`, `is_active`) VALUES
('Nike Air Max Collection', 'Khám phá bộ sưu tập mới nhất', 'https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/a9c5b264-96a6-4e0c-8576-c6c3673e4667/nike-just-do-it.jpg', '/giay-nike', 1, 1),
('Adidas Originals', 'Phong cách đường phố đích thực', 'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/viVN/Images/originals-fw24-samba-hp-mh-d_tcm337-1089837.jpg', '/giay-adidas', 2, 1),
('Sale Up To 50%', 'Giảm giá sốc cuối năm', 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200', '/khuyen-mai', 3, 1);

-- --------------------------------------------------------

-- Bảng support_requests - Yêu cầu hỗ trợ
CREATE TABLE `support_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `subject` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `status` enum('pending','processing','resolved') DEFAULT 'pending',
  `admin_reply` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

COMMIT;
