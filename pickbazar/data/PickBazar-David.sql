-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 28, 2020 at 04:00 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pickbazar`
--
CREATE DATABASE IF NOT EXISTS `pickbazar` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `pickbazar`;

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
CREATE TABLE IF NOT EXISTS `brands` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- RELATIONSHIPS FOR TABLE `brands`:
--

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `name`, `created_at`) VALUES
(1, 'Sukà', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cartitems`
--

DROP TABLE IF EXISTS `cartitems`;
CREATE TABLE IF NOT EXISTS `cartitems` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `units` int(10) UNSIGNED NOT NULL,
  `subtotal` decimal(10,2) UNSIGNED NOT NULL,
  `discount` int(10) UNSIGNED NOT NULL,
  `cart_id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- RELATIONSHIPS FOR TABLE `cartitems`:
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
CREATE TABLE IF NOT EXISTS `carts` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(10) UNSIGNED NOT NULL,
  `total` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- RELATIONSHIPS FOR TABLE `carts`:
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET latin1 NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- RELATIONSHIPS FOR TABLE `categories`:
--

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`) VALUES
(1, 'Cocina', '2020-06-27 01:57:34'),
(2, 'Baño', '2020-06-27 01:57:34'),
(3, 'Decoración', '2020-06-27 01:57:34'),
(4, 'Limpieza', '2020-06-27 01:57:34');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE IF NOT EXISTS `images` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8_bin NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- RELATIONSHIPS FOR TABLE `images`:
--

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `name`, `product_id`, `created_at`) VALUES
(1, 'sarten-antiadherente-28cm.jpg', 1, '2019-06-27 13:40:32'),
(2, 'cesto-negro.jpg', 2, '2019-06-27 13:40:32'),
(3, 'frasco-vidrio-decal-22cm.jpg', 3, '2019-06-27 13:40:32'),
(4, 'canasto-laundry-bamboo-marron.jpg', 4, '2019-06-27 13:40:32'),
(5, 'cacerola-enlozada-x3.jpg', 5, '2019-06-27 13:40:32'),
(6, 'mopa.jpg', 6, '2019-06-27 13:40:32'),
(7, 'cubiertero.jpg', 7, '2019-06-27 13:40:32'),
(8, 'pava-silvadora-acero.jpg', 8, '2019-06-27 13:40:32'),
(9, 'cacerola-antiadherente-x3.jpg', 9, '2020-06-28 12:58:07'),
(10, 'canasto-laundry-tela-max.jpg', 10, '2020-06-27 13:40:32'),
(11, 'cesto-elegance.jpg', 11, '2020-06-27 13:40:32'),
(12, 'bandeja-cama.jpg', 12, '2020-06-27 13:40:32');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `description` varchar(250) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` int(10) UNSIGNED DEFAULT NULL,
  `tax` int(10) UNSIGNED DEFAULT NULL,
  `state` tinyint(1) UNSIGNED NOT NULL,
  `onsale` tinyint(1) UNSIGNED NOT NULL,
  `provider_id` int(10) UNSIGNED DEFAULT NULL,
  `brand_id` int(10) UNSIGNED NOT NULL,
  `subcategory_id` int(10) UNSIGNED NOT NULL,
  `mainimage_id` int(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `products`:
--

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `discount`, `tax`, `state`, `onsale`, `provider_id`, `brand_id`, `subcategory_id`, `mainimage_id`, `created_at`, `updated_at`) VALUES
(1, 'Sarten antiadherente de 28cm', 'Sarten cerámico antiadherente de 28cm de diámetro. Colores \'Black\' o \'Aqua\'', '5000.00', 10, 21, 1, 1, NULL, 1, 5, 0, '2020-06-28 11:44:31', '2020-06-28 11:44:31'),
(2, 'Cesto de residuos Black&Gold', 'Cesto de residuos con pedal Black&Gold, 3 litros de capacidad', '5000.00', 10, 21, 1, 1, NULL, 1, 7, 0, '2019-06-27 13:31:06', '2020-06-27 20:46:20'),
(3, 'Frasco de vidrio de 22cm', 'Frasco de vidrio con tapa Simple Home de 22cm. de alto', '5000.00', 10, 21, 1, 1, NULL, 1, 4, 0, '2019-06-27 13:31:06', '2020-06-27 20:46:20'),
(4, 'Canasto laundry de 40cm', 'Canasto laundry color chocolate de 40cm. de diámetro', '5000.00', 10, 21, 1, 1, NULL, 1, 8, 0, '2020-06-28 11:44:31', '2020-06-28 11:44:31'),
(5, 'Cacerolas enlozadas - set de 3 piezas', 'Cacerolas enlozadas con tapa de vidrio - 3 piezas de 20, 22 y 24cm', '5000.00', 10, 21, 1, 1, NULL, 1, 1, 0, '2019-06-27 13:31:06', '2020-06-27 20:46:20'),
(6, 'Mopa con balde centrífugo', 'Mopa con brazo extensible y balde centrífugo', '5000.00', 10, 21, 1, 1, NULL, 1, 17, 0, '2020-06-28 11:45:05', '2020-06-28 11:45:05'),
(7, 'Cubiertero de bamboo', 'Cubiertero de bamboo con 5 divisiones - 30cm. x  40cm', '5000.00', 0, 21, 1, 0, NULL, 1, 6, 0, '2019-06-27 13:31:06', '2020-06-27 20:46:20'),
(8, 'Pava silvadora acero', 'Pava silvadora acero color cobre - 3 litros de capacidad', '5000.00', 0, 21, 1, 0, NULL, 1, 2, 0, '2019-06-27 13:31:06', '2020-06-27 20:46:20'),
(9, 'Cacerolas antiadherentes - set de 3 piezas', 'Set cacerolas antiadherentes con tapa de vidrio - 3 de piezas 20, 22 y 24cm', '5000.00', 0, 21, 1, 0, NULL, 1, 1, 0, '2020-06-27 13:35:38', '2020-06-27 20:46:20'),
(10, 'Canasto laundry de tela', 'Canasto laundry de tela de 58cm de diámetro', '5000.00', 0, 21, 1, 0, NULL, 1, 8, 0, '2020-06-28 11:45:05', '2020-06-28 11:45:05'),
(11, 'Cesto de residuos Elegance', 'Cesto de residuos Elegance con pedal - capacidad 3 litros', '5000.00', 0, 21, 1, 0, NULL, 1, 7, 0, '2020-06-27 13:35:38', '2020-06-27 20:46:20'),
(12, 'Bandeja desayunador', 'Bandeja desayunador de bamboo con patas rebatibles', '5000.00', 0, 21, 1, 0, NULL, 1, 6, 0, '2020-06-27 13:35:38', '2020-06-27 20:46:20');

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
CREATE TABLE IF NOT EXISTS `subcategories` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- RELATIONSHIPS FOR TABLE `subcategories`:
--

--
-- Dumping data for table `subcategories`
--

INSERT INTO `subcategories` (`id`, `name`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'Cacerola', 1, '2020-06-27 02:00:11', '2020-06-27 20:47:22'),
(2, 'Pava', 1, '2020-06-27 02:00:11', '2020-06-27 20:47:22'),
(3, 'Jarro', 1, '2020-06-27 02:00:11', '2020-06-27 20:47:22'),
(4, 'Frasco', 1, '2020-06-27 02:00:11', '2020-06-27 20:47:22'),
(5, 'Sarten', 1, '2020-06-27 02:00:11', '2020-06-27 20:47:22'),
(6, 'Accesorio', 1, '2020-06-27 02:00:11', '2020-06-27 20:47:22'),
(7, 'Cesto', 2, '2020-06-27 02:00:11', '2020-06-27 20:47:22'),
(8, 'Canasto', 2, '2020-06-27 02:00:11', '2020-06-27 20:47:22'),
(9, 'Alfombra', 2, '2020-06-27 02:00:11', '2020-06-27 20:47:22'),
(10, 'Lima', 2, '2020-06-27 02:00:11', '2020-06-27 20:47:22'),
(11, 'Esponja', 2, '2020-06-27 02:00:11', '2020-06-27 20:47:22'),
(12, 'Reloj', 3, '2020-06-27 02:00:11', '2020-06-27 20:47:22'),
(13, 'Espejo', 3, '2020-06-27 02:00:11', '2020-06-27 20:47:22'),
(14, 'Cuadro', 3, '2020-06-27 02:00:11', '2020-06-27 20:47:22'),
(15, 'Vela', 3, '2020-06-27 02:00:11', '2020-06-27 20:47:22'),
(16, 'Farol', 3, '2020-06-27 02:00:11', '2020-06-27 20:47:22'),
(17, 'Mopa', 4, '2020-06-27 02:00:11', '2020-06-27 20:47:22');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) CHARACTER SET latin1 NOT NULL,
  `lastName` varchar(45) CHARACTER SET latin1 NOT NULL,
  `email` varchar(105) CHARACTER SET latin1 NOT NULL,
  `password` varchar(45) CHARACTER SET latin1 NOT NULL,
  `user` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `phone` varchar(45) CHARACTER SET latin1 NOT NULL,
  `address` varchar(200) CHARACTER SET latin1 NOT NULL,
  `userType` varchar(45) CHARACTER SET latin1 NOT NULL,
  `state` tinyint(1) UNSIGNED NOT NULL,
  `avatar` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- RELATIONSHIPS FOR TABLE `users`:
--
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
