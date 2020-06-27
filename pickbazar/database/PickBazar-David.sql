-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2020 at 04:09 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

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
USE pickbazar;

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
CREATE TABLE IF NOT EXISTS `brand` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) BINARY NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;

--
-- RELATIONSHIPS FOR TABLE `brand`:
--

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`id`, `name`, `created_at`) VALUES
(1, 'Sukà', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cartitems`
--

DROP TABLE IF EXISTS `cartitems`;
CREATE TABLE IF NOT EXISTS `cartitems` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `cart_id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `units` int(10) UNSIGNED NOT NULL,
  `subtotal` decimal(10,2) UNSIGNED NOT NULL,
  `discount` int(10) UNSIGNED NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ;

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
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ;

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
  `category` varchar(100) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ;

--
-- RELATIONSHIPS FOR TABLE `categories`:
--

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category`, `created_date`) VALUES
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
  `image` varchar(150) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `product_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`)
) ;

--
-- RELATIONSHIPS FOR TABLE `images`:
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) BINARY NOT NULL,
  `description` varchar(250) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` int(10) UNSIGNED DEFAULT NULL,
  `tax` int(10) UNSIGNED DEFAULT NULL,
  `state` tinyint(1) UNSIGNED NOT NULL,
  `onsale` tinyint(1) UNSIGNED NOT NULL,
  `provider_id` int(10) UNSIGNED DEFAULT NULL,
  `brand_id` int(10) UNSIGNED NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `subcategory_id` int(10) UNSIGNED NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ;

--
-- RELATIONSHIPS FOR TABLE `products`:
--

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
CREATE TABLE IF NOT EXISTS `subcategories` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `subcategory` varchar(100) BINARY NOT NULL,
  `id_category` int(10) UNSIGNED NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ;

--
-- RELATIONSHIPS FOR TABLE `subcategories`:
--

--
-- Dumping data for table `subcategories`
--

INSERT INTO `subcategories` (`id`, `subcategory`, `id_category`, `created_date`) VALUES
(1, 'Cacerola', 1, '2020-06-27 02:00:11'),
(2, 'Pava', 1, '2020-06-27 02:00:11'),
(3, 'Jarro', 1, '2020-06-27 02:00:11'),
(4, 'Frasco', 1, '2020-06-27 02:00:11'),
(5, 'Sarten', 1, '2020-06-27 02:00:11'),
(6, 'Accesorio', 1, '2020-06-27 02:00:11'),
(7, 'Cesto', 2, '2020-06-27 02:00:11'),
(8, 'Canasto', 2, '2020-06-27 02:00:11'),
(9, 'Alfombra', 2, '2020-06-27 02:00:11'),
(10, 'Lima', 2, '2020-06-27 02:00:11'),
(11, 'Esponja', 2, '2020-06-27 02:00:11'),
(12, 'Reloj', 3, '2020-06-27 02:00:11'),
(13, 'Espejo', 3, '2020-06-27 02:00:11'),
(14, 'Cuadro', 3, '2020-06-27 02:00:11'),
(15, 'Vela', 3, '2020-06-27 02:00:11'),
(16, 'Farol', 3, '2020-06-27 02:00:11'),
(17, 'Mopa', 4, '2020-06-27 02:00:11');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `avatar` varchar(45) BINARY DEFAULT NULL,
  `user` varchar(45) BINARY DEFAULT NULL,
  `password` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `email` varchar(105) NOT NULL,
  `address` varchar(200) NOT NULL,
  `userType` varchar(45) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `state` tinyint(1) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`)
) ;

--
-- RELATIONSHIPS FOR TABLE `users`:
--
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
