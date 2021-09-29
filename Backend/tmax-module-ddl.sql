-- --------------------------------------------------------
-- 호스트:                          10.10.20.95
-- 서버 버전:                        10.6.4-MariaDB-1:10.6.4+maria~focal - mariadb.org binary distribution
-- 서버 OS:                        debian-linux-gnu
-- HeidiSQL 버전:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- mydb 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `mydb`;

-- 테이블 mydb.carts 구조 내보내기
CREATE TABLE IF NOT EXISTS `carts` (
  `cart_id` bigint NOT NULL AUTO_INCREMENT,
  `product_id` bigint NOT NULL,
  `qty` int NOT NULL DEFAULT 0,
  `unit_price` int NOT NULL DEFAULT 0,
  `total_price` int NOT NULL DEFAULT 0,
  `user_id` bigint NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`cart_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 mydb.catalog 구조 내보내기
CREATE TABLE IF NOT EXISTS `catalog` (
  `product_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `writer` varchar(100) NOT NULL,
  `translator` varchar(100) DEFAULT NULL,
  `publishing_company` varchar(50) NOT NULL,
  `publish_date` datetime NOT NULL,
  `content` varchar(1000) NOT NULL,
  `delivery_fee` int(11) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `pages` int DEFAULT NULL,
  `weight` int DEFAULT NULL,
  `size` varchar(100) DEFAULT NULL,
  `isbn10` varchar(15) NOT NULL,
  `isbn13` varchar(15) NOT NULL,
  `creater` varchar(50) DEFAULT NULL,
  `modifer` varchar(50) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT current_timestamp(6),
  `modified_at` datetime(6) DEFAULT current_timestamp(6),
  `unit_price` int NOT NULL,
  PRIMARY KEY (`product_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 mydb.orders 구조 내보내기
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` bigint NOT NULL AUTO_INCREMENT,
  `order_uuid` varchar(100) NOT NULL,
  `user_id` bigint NOT NULL DEFAULT 0,
  `product_id` bigint NOT NULL DEFAULT 0,
  `product_name` varchar(100) NOT NULL,
  `qty` int NOT NULL DEFAULT 0,
  `unit_price` int NOT NULL DEFAULT 0,
  `total_price` int NOT NULL DEFAULT 0,
  `recipient_name` varchar(10) NOT NULL,
  `recipient_address` varchar(100) NOT NULL,
  `recipient_phone` varchar(20) NOT NULL,
  `sender_name` varchar(10) NOT NULL,
  `sender_phone` varchar(20) NOT NULL,
  `sender_password` varchar(20) DEFAULT NULL,
  `payment_plan` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `order_state` int not null,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 mydb.users 구조 내보내기
CREATE TABLE IF NOT EXISTS `users` (
  `email` varchar(30) NOT NULL,
  `encrypted_pwd` varchar(200) NOT NULL,
  `name` varchar(20) NOT NULL,
  `tel` varchar(20) NOT NULL,
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

ALTER TABLE carts AUTO_INCREMENT = 1;
ALTER TABLE catalog AUTO_INCREMENT = 1;
ALTER TABLE orders AUTO_INCREMENT = 1;
ALTER TABLE users AUTO_INCREMENT = 1;
