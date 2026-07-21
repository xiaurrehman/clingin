-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 29, 2025 at 06:36 AM
-- Server version: 8.0.40
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `halo_ecom`
--

-- --------------------------------------------------------

--
-- Table structure for table `activations`
--

CREATE TABLE `activations` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  `completed_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `activations`
--

INSERT INTO `activations` (`id`, `user_id`, `code`, `completed`, `completed_at`, `created_at`, `updated_at`) VALUES
(1, 1, 'vMcgvmB1BlUxaU7C0rUlDrDctlWPvUbG', 1, '2025-12-10 12:53:21', '2025-12-10 12:53:21', '2025-12-10 12:53:21');

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` int UNSIGNED NOT NULL,
  `customer_id` int UNSIGNED NOT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_1` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zip` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attributes`
--

CREATE TABLE `attributes` (
  `id` int UNSIGNED NOT NULL,
  `attribute_set_id` int UNSIGNED NOT NULL,
  `is_filterable` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attribute_categories`
--

CREATE TABLE `attribute_categories` (
  `attribute_id` int UNSIGNED NOT NULL,
  `category_id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attribute_sets`
--

CREATE TABLE `attribute_sets` (
  `id` int UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attribute_set_translations`
--

CREATE TABLE `attribute_set_translations` (
  `id` int UNSIGNED NOT NULL,
  `attribute_set_id` int UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attribute_translations`
--

CREATE TABLE `attribute_translations` (
  `id` int UNSIGNED NOT NULL,
  `attribute_id` int UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attribute_values`
--

CREATE TABLE `attribute_values` (
  `id` int UNSIGNED NOT NULL,
  `attribute_id` int UNSIGNED NOT NULL,
  `position` int UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attribute_value_translations`
--

CREATE TABLE `attribute_value_translations` (
  `id` int UNSIGNED NOT NULL,
  `attribute_value_id` int UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog_categories`
--

CREATE TABLE `blog_categories` (
  `id` bigint UNSIGNED NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog_category_translations`
--

CREATE TABLE `blog_category_translations` (
  `id` int UNSIGNED NOT NULL,
  `blog_category_id` bigint UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog_posts`
--

CREATE TABLE `blog_posts` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `blog_category_id` bigint UNSIGNED DEFAULT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `publish_status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog_post_blog_tag`
--

CREATE TABLE `blog_post_blog_tag` (
  `blog_post_id` bigint UNSIGNED NOT NULL,
  `blog_tag_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog_post_translations`
--

CREATE TABLE `blog_post_translations` (
  `id` int UNSIGNED NOT NULL,
  `blog_post_id` bigint UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog_tags`
--

CREATE TABLE `blog_tags` (
  `id` bigint UNSIGNED NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog_tag_translations`
--

CREATE TABLE `blog_tag_translations` (
  `id` int UNSIGNED NOT NULL,
  `blog_tag_id` bigint UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` int UNSIGNED NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `brand_translations`
--

CREATE TABLE `brand_translations` (
  `id` int UNSIGNED NOT NULL,
  `brand_id` int NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int UNSIGNED NOT NULL,
  `parent_id` int UNSIGNED DEFAULT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` int UNSIGNED DEFAULT NULL,
  `is_searchable` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category_translations`
--

CREATE TABLE `category_translations` (
  `id` int UNSIGNED NOT NULL,
  `category_id` int UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` int UNSIGNED NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` decimal(18,4) UNSIGNED DEFAULT NULL,
  `is_percent` tinyint(1) NOT NULL,
  `free_shipping` tinyint(1) NOT NULL,
  `minimum_spend` decimal(18,4) UNSIGNED DEFAULT NULL,
  `maximum_spend` decimal(18,4) UNSIGNED DEFAULT NULL,
  `usage_limit_per_coupon` int UNSIGNED DEFAULT NULL,
  `usage_limit_per_customer` int UNSIGNED DEFAULT NULL,
  `used` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coupon_categories`
--

CREATE TABLE `coupon_categories` (
  `coupon_id` int UNSIGNED NOT NULL,
  `category_id` int UNSIGNED NOT NULL,
  `exclude` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coupon_products`
--

CREATE TABLE `coupon_products` (
  `coupon_id` int UNSIGNED NOT NULL,
  `product_id` int UNSIGNED NOT NULL,
  `exclude` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coupon_translations`
--

CREATE TABLE `coupon_translations` (
  `id` int UNSIGNED NOT NULL,
  `coupon_id` int UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cross_sell_products`
--

CREATE TABLE `cross_sell_products` (
  `product_id` int UNSIGNED NOT NULL,
  `cross_sell_product_id` int UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `currency_rates`
--

CREATE TABLE `currency_rates` (
  `id` int UNSIGNED NOT NULL,
  `currency` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` decimal(12,4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `currency_rates`
--

INSERT INTO `currency_rates` (`id`, `currency`, `rate`, `created_at`, `updated_at`) VALUES
(1, 'USD', 1.0000, '2025-12-10 12:53:21', '2025-12-10 12:53:21');

-- --------------------------------------------------------

--
-- Table structure for table `default_addresses`
--

CREATE TABLE `default_addresses` (
  `id` int UNSIGNED NOT NULL,
  `customer_id` int UNSIGNED NOT NULL,
  `address_id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `entity_files`
--

CREATE TABLE `entity_files` (
  `id` int UNSIGNED NOT NULL,
  `file_id` int UNSIGNED NOT NULL,
  `entity_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_id` bigint UNSIGNED NOT NULL,
  `zone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `filename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `disk` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `extension` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mime` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `flash_sales`
--

CREATE TABLE `flash_sales` (
  `id` int UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `flash_sale_products`
--

CREATE TABLE `flash_sale_products` (
  `id` int UNSIGNED NOT NULL,
  `flash_sale_id` int UNSIGNED NOT NULL,
  `product_id` int UNSIGNED NOT NULL,
  `end_date` date NOT NULL,
  `price` decimal(18,4) UNSIGNED NOT NULL,
  `qty` int NOT NULL,
  `position` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `flash_sale_product_orders`
--

CREATE TABLE `flash_sale_product_orders` (
  `flash_sale_product_id` int UNSIGNED NOT NULL,
  `order_id` int UNSIGNED NOT NULL,
  `qty` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `flash_sale_translations`
--

CREATE TABLE `flash_sale_translations` (
  `id` int UNSIGNED NOT NULL,
  `flash_sale_id` int UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `campaign_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` int UNSIGNED NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menu_items`
--

CREATE TABLE `menu_items` (
  `id` int UNSIGNED NOT NULL,
  `menu_id` int UNSIGNED NOT NULL,
  `parent_id` int UNSIGNED DEFAULT NULL,
  `category_id` int UNSIGNED DEFAULT NULL,
  `page_id` int UNSIGNED DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `target` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` int UNSIGNED DEFAULT NULL,
  `is_root` tinyint(1) NOT NULL DEFAULT '0',
  `is_fluid` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menu_item_translations`
--

CREATE TABLE `menu_item_translations` (
  `id` int UNSIGNED NOT NULL,
  `menu_item_id` int UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menu_translations`
--

CREATE TABLE `menu_translations` (
  `id` int UNSIGNED NOT NULL,
  `menu_id` int UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `meta_data`
--

CREATE TABLE `meta_data` (
  `id` int UNSIGNED NOT NULL,
  `entity_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `meta_data_translations`
--

CREATE TABLE `meta_data_translations` (
  `id` int UNSIGNED NOT NULL,
  `meta_data_id` int UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `meta_title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_07_02_230147_migration_cartalyst_sentinel', 1),
(2, '2014_10_14_200250_create_settings_table', 1),
(3, '2014_10_26_162751_create_files_table', 1),
(4, '2014_10_30_191858_create_pages_table', 1),
(5, '2014_11_31_125848_create_page_translations_table', 1),
(6, '2015_02_27_105241_create_entity_files_table', 1),
(7, '2015_11_20_184604486385_create_translations_table', 1),
(8, '2015_11_20_184604743083_create_translation_translations_table', 1),
(9, '2017_05_29_155126144426_create_products_table', 1),
(10, '2017_05_30_155126416338_create_product_translations_table', 1),
(11, '2017_08_02_153217_create_options_table', 1),
(12, '2017_08_02_153217_create_variations_table', 1),
(13, '2017_08_02_153348_create_option_translations_table', 1),
(14, '2017_08_02_153348_create_variation_translations_table', 1),
(15, '2017_08_02_153406_create_option_values_table', 1),
(16, '2017_08_02_153406_create_variation_values_table', 1),
(17, '2017_08_02_153736_create_option_value_translations_table', 1),
(18, '2017_08_02_153736_create_variation_value_translations_table', 1),
(19, '2017_08_03_156576_create_product_options_table', 1),
(20, '2017_08_17_170128_create_related_products_table', 1),
(21, '2017_08_17_175236_create_up_sell_products_table', 1),
(22, '2017_08_17_175828_create_cross_sell_products_table', 1),
(23, '2017_11_09_141332910964_create_categories_table', 1),
(24, '2017_11_09_141332931539_create_category_translations_table', 1),
(25, '2017_11_26_083614526622_create_meta_data_table', 1),
(26, '2017_11_26_083614526828_create_meta_data_translations_table', 1),
(27, '2018_01_24_125642_create_product_categories_table', 1),
(28, '2018_02_04_150917488267_create_coupons_table', 1),
(29, '2018_02_04_150917488698_create_coupon_translations_table', 1),
(30, '2018_03_11_181317_create_coupon_products_table', 1),
(31, '2018_03_15_091937_create_coupon_categories_table', 1),
(32, '2018_04_18_154028776225_create_reviews_table', 1),
(33, '2018_05_17_115822452977_create_currency_rates_table', 1),
(34, '2018_07_03_124153537506_create_sliders_table', 1),
(35, '2018_07_03_124153537695_create_slider_translations_table', 1),
(36, '2018_07_03_133107770172_create_slider_slides_table', 1),
(37, '2018_07_03_133107770486_create_slider_slide_translations_table', 1),
(38, '2018_07_28_190524758357_create_attribute_sets_table', 1),
(39, '2018_07_28_190524758497_create_attribute_set_translations_table', 1),
(40, '2018_07_28_190524758646_create_attributes_table', 1),
(41, '2018_07_28_190524758877_create_attribute_translations_table', 1),
(42, '2018_07_28_190524759461_create_product_attributes_table', 1),
(43, '2018_08_01_001919718631_create_tax_classes_table', 1),
(44, '2018_08_01_001919718935_create_tax_class_translations_table', 1),
(45, '2018_08_01_001919723551_create_tax_rates_table', 1),
(46, '2018_08_01_001919723781_create_tax_rate_translations_table', 1),
(47, '2018_08_03_195922206748_create_attribute_values_table', 1),
(48, '2018_08_03_195922207019_create_attribute_value_translations_table', 1),
(49, '2018_08_04_190524764275_create_product_attribute_values_table', 1),
(50, '2018_08_07_135631306565_create_orders_table', 1),
(51, '2018_08_07_135631309451_create_order_products_table', 1),
(52, '2018_08_07_135631309512_create_order_product_options_table', 1),
(53, '2018_08_07_135631309624_create_order_product_option_values_table', 1),
(54, '2018_09_11_213926106353_create_transactions_table', 1),
(55, '2018_09_19_081602135631_create_order_taxes_table', 1),
(56, '2018_09_19_103745_create_setting_translations_table', 1),
(57, '2018_10_01_224852175056_create_wish_lists_table', 1),
(58, '2018_10_04_185608_create_search_terms_table', 1),
(59, '2018_11_03_160015_create_menus_table', 1),
(60, '2018_11_03_160138_create_menu_translations_table', 1),
(61, '2018_11_03_160753_create_menu_items_table', 1),
(62, '2018_11_03_160804_create_menu_item_translation_table', 1),
(63, '2019_02_05_162605_add_position_to_slider_slides_table', 1),
(64, '2019_02_09_164343_remove_file_id_from_slider_slides_table', 1),
(65, '2019_02_09_164434_add_file_id_to_slider_slide_translations_table', 1),
(66, '2019_02_14_103408_create_attribute_categories_table', 1),
(67, '2019_08_09_164759_add_slug_column_to_attributes_table', 1),
(68, '2019_11_01_201511_add_special_price_type_column_to_products_table', 1),
(69, '2019_11_23_193101_add_value_column_to_order_product_options_table', 1),
(70, '2020_01_04_211424_add_icon_column_to_menu_items_table', 1),
(71, '2020_01_05_160502_add_direction_column_to_slider_slide_translations_table', 1),
(72, '2020_01_05_234014_add_speed_column_to_sliders_table', 1),
(73, '2020_01_05_235014_add_fade_column_to_sliders_table', 1),
(74, '2020_01_15_000346259038_create_flash_sales_table', 1),
(75, '2020_01_15_000346259349_create_flash_sale_translations_table', 1),
(76, '2020_01_23_011234_create_flash_sale_products_table', 1),
(77, '2020_01_30_015722_create_flash_sale_product_orders_table', 1),
(78, '2020_02_22_215943_delete_meta_keywords_column_from_meta_data_translations_table', 1),
(79, '2020_03_05_214602901973_create_brands_table', 1),
(80, '2020_03_05_214602902369_create_brand_translations_table', 1),
(81, '2020_03_06_234605_add_brand_id_column_to_products_table', 1),
(82, '2020_04_06_211526_add_note_column_to_orders_table', 1),
(83, '2020_04_28_034118164376_create_tags_table', 1),
(84, '2020_04_28_034118164618_create_tag_translations_table', 1),
(85, '2020_04_28_225657_create_product_tags_table', 1),
(86, '2020_05_10_041616_create_updater_scripts_table', 1),
(87, '2020_10_07_175000_create_addresses_table', 1),
(88, '2020_10_07_175004_create_default_addresses_table', 1),
(89, '2020_11_21_163822_add_downloads_columns_to_products_table', 1),
(90, '2021_01_08_203241_change_shipping_method_column_in_orders_table', 1),
(91, '2021_01_09_172744_add_phone_column_to_users_table', 1),
(92, '2021_01_11_170516_create_order_downloads_table', 1),
(93, '2023_05_04_194556_rename_column_virtual_to_is_virtual', 1),
(94, '2023_05_16_156576_create_product_variations_table', 1),
(95, '2023_05_16_170651_create_product_variants_table', 1),
(96, '2023_06_11_150030_create_order_product_variations_table', 1),
(97, '2023_06_11_150044_create_order_product_variation_values_table', 1),
(98, '2023_06_11_150456_add_product_variant_id_column_to_order_products_table', 1),
(99, '2023_11_06_084429_create_carts_table', 1),
(100, '2023_11_07_113308_add_timestamp_columns_to_related_products_table', 1),
(101, '2023_11_07_113325_add_timestamp_columns_to_up_sell_products_table', 1),
(102, '2023_11_07_113341_add_timestamp_columns_to_cross_sell_products_table', 1),
(103, '2023_11_21_164218_make_price_column_in_the_products_table_nullable', 1),
(104, '2024_02_12_115822452977_increase_currency_rate_decimal_total_digits', 1),
(105, '2024_03_13_100000_create_blog_categories_table', 1),
(106, '2024_03_13_100001_create_blog_category_translations_table', 1),
(107, '2024_03_13_100002_create_blog_tags_table', 1),
(108, '2024_03_13_100003_create_blog_tag_translations_table', 1),
(109, '2024_03_13_100004_create_blog_posts_table', 1),
(110, '2024_03_13_100005_create_blog_post_translations_table', 1),
(111, '2024_03_13_100006_create_blog_post_blog_tag_table', 1),
(112, '2025_05_19_0000001_add_tracking_reference_column_to_orders_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `id` int UNSIGNED NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_required` tinyint(1) NOT NULL,
  `is_global` tinyint(1) NOT NULL DEFAULT '1',
  `position` int UNSIGNED DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `option_translations`
--

CREATE TABLE `option_translations` (
  `id` int UNSIGNED NOT NULL,
  `option_id` int UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `option_values`
--

CREATE TABLE `option_values` (
  `id` int UNSIGNED NOT NULL,
  `option_id` int UNSIGNED NOT NULL,
  `price` decimal(18,4) UNSIGNED DEFAULT NULL,
  `price_type` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` int UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `option_value_translations`
--

CREATE TABLE `option_value_translations` (
  `id` int UNSIGNED NOT NULL,
  `option_value_id` int UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int UNSIGNED NOT NULL,
  `customer_id` int DEFAULT NULL,
  `customer_email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `billing_first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `billing_last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `billing_address_1` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `billing_address_2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billing_city` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `billing_state` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `billing_zip` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `billing_country` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_address_1` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_address_2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_city` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_state` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_zip` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_country` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sub_total` decimal(18,4) UNSIGNED NOT NULL,
  `shipping_method` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_cost` decimal(18,4) UNSIGNED NOT NULL,
  `coupon_id` int DEFAULT NULL,
  `discount` decimal(18,4) UNSIGNED NOT NULL,
  `total` decimal(18,4) UNSIGNED NOT NULL,
  `payment_method` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency_rate` decimal(18,4) NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `tracking_reference` text COLLATE utf8mb4_unicode_ci,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_downloads`
--

CREATE TABLE `order_downloads` (
  `id` int UNSIGNED NOT NULL,
  `order_id` int UNSIGNED NOT NULL,
  `file_id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_products`
--

CREATE TABLE `order_products` (
  `id` int UNSIGNED NOT NULL,
  `order_id` int UNSIGNED NOT NULL,
  `product_id` int UNSIGNED NOT NULL,
  `product_variant_id` bigint UNSIGNED DEFAULT NULL,
  `unit_price` decimal(18,4) UNSIGNED NOT NULL,
  `qty` int NOT NULL,
  `line_total` decimal(18,4) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_product_options`
--

CREATE TABLE `order_product_options` (
  `id` int UNSIGNED NOT NULL,
  `order_product_id` int UNSIGNED NOT NULL,
  `option_id` int UNSIGNED NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_product_option_values`
--

CREATE TABLE `order_product_option_values` (
  `order_product_option_id` int UNSIGNED NOT NULL,
  `option_value_id` int UNSIGNED NOT NULL,
  `price` decimal(18,4) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_product_variations`
--

CREATE TABLE `order_product_variations` (
  `id` int UNSIGNED NOT NULL,
  `order_product_id` int UNSIGNED NOT NULL,
  `variation_id` int UNSIGNED NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_product_variation_values`
--

CREATE TABLE `order_product_variation_values` (
  `order_product_variation_id` int UNSIGNED NOT NULL,
  `variation_value_id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_taxes`
--

CREATE TABLE `order_taxes` (
  `order_id` int UNSIGNED NOT NULL,
  `tax_rate_id` int UNSIGNED NOT NULL,
  `amount` decimal(15,4) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int UNSIGNED NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `page_translations`
--

CREATE TABLE `page_translations` (
  `id` int UNSIGNED NOT NULL,
  `page_id` int UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` longtext COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `persistences`
--

CREATE TABLE `persistences` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `persistences`
--

INSERT INTO `persistences` (`id`, `user_id`, `code`, `created_at`, `updated_at`) VALUES
(1, 1, '0qX7dYQmqCdHkkxU9wwELwU4OMmi97Po', '2025-12-10 18:53:55', '2025-12-10 18:53:55'),
(2, 1, 'G1Kh4LjaHibYDkQjDI2DYlABCt31cgiL', '2025-12-12 09:45:18', '2025-12-12 09:45:18'),
(3, 1, 'jxKlhi0eraZiFmsMAZ4I72le92qF0LV8', '2025-12-13 10:55:45', '2025-12-13 10:55:45'),
(4, 1, 'GGzgFA56KrtIaN8oQUz5DdClDMdALfop', '2025-12-24 02:45:21', '2025-12-24 02:45:21'),
(5, 1, 'cBdXYoftVv3WVTsJ6otKf5xhn89adrMa', '2025-12-29 00:50:11', '2025-12-29 00:50:11');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int UNSIGNED NOT NULL,
  `brand_id` int UNSIGNED DEFAULT NULL,
  `tax_class_id` int UNSIGNED DEFAULT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(18,4) DEFAULT NULL,
  `special_price` decimal(18,4) UNSIGNED DEFAULT NULL,
  `special_price_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `special_price_start` date DEFAULT NULL,
  `special_price_end` date DEFAULT NULL,
  `selling_price` decimal(18,4) UNSIGNED DEFAULT NULL,
  `sku` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manage_stock` tinyint(1) NOT NULL DEFAULT '0',
  `qty` int DEFAULT NULL,
  `in_stock` tinyint(1) NOT NULL DEFAULT '1',
  `viewed` int UNSIGNED NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL,
  `new_from` datetime DEFAULT NULL,
  `new_to` datetime DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_virtual` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_attributes`
--

CREATE TABLE `product_attributes` (
  `id` int UNSIGNED NOT NULL,
  `product_id` int UNSIGNED NOT NULL,
  `attribute_id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_attribute_values`
--

CREATE TABLE `product_attribute_values` (
  `product_attribute_id` int UNSIGNED NOT NULL,
  `attribute_value_id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE `product_categories` (
  `product_id` int UNSIGNED NOT NULL,
  `category_id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_options`
--

CREATE TABLE `product_options` (
  `product_id` int UNSIGNED NOT NULL,
  `option_id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_tags`
--

CREATE TABLE `product_tags` (
  `product_id` int UNSIGNED NOT NULL,
  `tag_id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_translations`
--

CREATE TABLE `product_translations` (
  `id` int UNSIGNED NOT NULL,
  `product_id` int UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `short_description` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `id` int UNSIGNED NOT NULL,
  `uid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uids` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` int UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(18,4) UNSIGNED DEFAULT NULL,
  `special_price` decimal(18,4) UNSIGNED DEFAULT NULL,
  `special_price_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `special_price_start` date DEFAULT NULL,
  `special_price_end` date DEFAULT NULL,
  `selling_price` decimal(18,4) UNSIGNED DEFAULT NULL,
  `sku` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manage_stock` tinyint(1) DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `in_stock` tinyint(1) DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `position` int UNSIGNED DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_variations`
--

CREATE TABLE `product_variations` (
  `product_id` int UNSIGNED NOT NULL,
  `variation_id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `related_products`
--

CREATE TABLE `related_products` (
  `product_id` int UNSIGNED NOT NULL,
  `related_product_id` int UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reminders`
--

CREATE TABLE `reminders` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  `completed_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int UNSIGNED NOT NULL,
  `reviewer_id` int UNSIGNED DEFAULT NULL,
  `product_id` int UNSIGNED NOT NULL,
  `rating` int NOT NULL,
  `reviewer_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_approved` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int UNSIGNED NOT NULL,
  `permissions` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `permissions`, `created_at`, `updated_at`) VALUES
(1, '{\"admin.users.index\":true,\"admin.users.create\":true,\"admin.users.edit\":true,\"admin.users.destroy\":true,\"admin.roles.index\":true,\"admin.roles.create\":true,\"admin.roles.edit\":true,\"admin.roles.destroy\":true,\"admin.products.index\":true,\"admin.products.create\":true,\"admin.products.edit\":true,\"admin.products.destroy\":true,\"admin.brands.index\":true,\"admin.brands.create\":true,\"admin.brands.edit\":true,\"admin.brands.destroy\":true,\"admin.attributes.index\":true,\"admin.attributes.create\":true,\"admin.attributes.edit\":true,\"admin.attributes.destroy\":true,\"admin.attribute_sets.index\":true,\"admin.attribute_sets.create\":true,\"admin.attribute_sets.edit\":true,\"admin.attribute_sets.destroy\":true,\"admin.variations.index\":true,\"admin.variations.create\":true,\"admin.variations.edit\":true,\"admin.variations.destroy\":true,\"admin.options.index\":true,\"admin.options.create\":true,\"admin.options.edit\":true,\"admin.options.destroy\":true,\"admin.filters.index\":true,\"admin.filters.create\":true,\"admin.filters.edit\":true,\"admin.filters.destroy\":true,\"admin.reviews.index\":true,\"admin.reviews.create\":true,\"admin.reviews.edit\":true,\"admin.reviews.destroy\":true,\"admin.categories.index\":true,\"admin.categories.create\":true,\"admin.categories.edit\":true,\"admin.categories.destroy\":true,\"admin.tags.index\":true,\"admin.tags.create\":true,\"admin.tags.edit\":true,\"admin.tags.destroy\":true,\"admin.orders.index\":true,\"admin.orders.show\":true,\"admin.orders.edit\":true,\"admin.flash_sales.index\":true,\"admin.flash_sales.create\":true,\"admin.flash_sales.edit\":true,\"admin.flash_sales.destroy\":true,\"admin.transactions.index\":true,\"admin.coupons.index\":true,\"admin.coupons.create\":true,\"admin.coupons.edit\":true,\"admin.coupons.destroy\":true,\"admin.menus.index\":true,\"admin.menus.create\":true,\"admin.menus.edit\":true,\"admin.menus.destroy\":true,\"admin.menu_items.index\":true,\"admin.menu_items.create\":true,\"admin.menu_items.edit\":true,\"admin.menu_items.destroy\":true,\"admin.blog_posts.index\":true,\"admin.blog_posts.create\":true,\"admin.blog_posts.edit\":true,\"admin.blog_posts.destroy\":true,\"admin.blog_categories.index\":true,\"admin.blog_categories.create\":true,\"admin.blog_categories.edit\":true,\"admin.blog_categories.destroy\":true,\"admin.blog_tags.index\":true,\"admin.blog_tags.create\":true,\"admin.blog_tags.edit\":true,\"admin.blog_tags.destroy\":true,\"admin.importer.import\":true,\"admin.media.index\":true,\"admin.media.create\":true,\"admin.media.destroy\":true,\"admin.pages.index\":true,\"admin.pages.create\":true,\"admin.pages.edit\":true,\"admin.pages.destroy\":true,\"admin.currency_rates.index\":true,\"admin.currency_rates.edit\":true,\"admin.taxes.index\":true,\"admin.taxes.create\":true,\"admin.taxes.edit\":true,\"admin.taxes.destroy\":true,\"admin.languages.index\":true,\"admin.languages.add\":true,\"admin.translations.index\":true,\"admin.translations.edit\":true,\"admin.sliders.index\":true,\"admin.sliders.create\":true,\"admin.sliders.edit\":true,\"admin.sliders.destroy\":true,\"admin.reports.index\":true,\"admin.settings.edit\":true,\"admin.storefront.edit\":true}', '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(2, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21');

-- --------------------------------------------------------

--
-- Table structure for table `role_translations`
--

CREATE TABLE `role_translations` (
  `id` int UNSIGNED NOT NULL,
  `role_id` int UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_translations`
--

INSERT INTO `role_translations` (`id`, `role_id`, `locale`, `name`) VALUES
(1, 1, 'en', 'Admin'),
(2, 2, 'en', 'Customer');

-- --------------------------------------------------------

--
-- Table structure for table `search_terms`
--

CREATE TABLE `search_terms` (
  `id` int UNSIGNED NOT NULL,
  `term` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `results` int UNSIGNED NOT NULL,
  `hits` int UNSIGNED NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int UNSIGNED NOT NULL,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_translatable` tinyint(1) NOT NULL DEFAULT '0',
  `plain_value` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `key`, `is_translatable`, `plain_value`, `created_at`, `updated_at`) VALUES
(1, 'store_name', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(2, 'store_email', 0, 's:21:\"halo@visibleangle.com\";', '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(3, 'store_phone', 0, 's:11:\"03095771211\";', '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(4, 'search_engine', 0, 's:5:\"mysql\";', '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(5, 'algolia_app_id', 0, 'N;', '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(6, 'algolia_secret', 0, 'N;', '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(7, 'meilisearch_host', 0, 'N;', '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(8, 'meilisearch_key', 0, 'N;', '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(9, 'supported_countries', 0, 'a:1:{i:0;s:2:\"GB\";}', '2025-12-10 12:53:21', '2025-12-10 18:57:17'),
(10, 'default_country', 0, 's:2:\"GB\";', '2025-12-10 12:53:21', '2025-12-10 18:57:17'),
(11, 'supported_locales', 0, 'a:1:{i:0;s:2:\"en\";}', '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(12, 'default_locale', 0, 's:2:\"en\";', '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(13, 'default_timezone', 0, 's:13:\"Europe/London\";', '2025-12-10 12:53:21', '2025-12-10 18:57:17'),
(14, 'customer_role', 0, 's:1:\"2\";', '2025-12-10 12:53:21', '2025-12-10 18:57:17'),
(15, 'reviews_enabled', 0, 's:1:\"1\";', '2025-12-10 12:53:21', '2025-12-10 18:57:17'),
(16, 'auto_approve_reviews', 0, 's:1:\"1\";', '2025-12-10 12:53:21', '2025-12-10 18:57:17'),
(17, 'cookie_bar_enabled', 0, 's:1:\"1\";', '2025-12-10 12:53:21', '2025-12-10 18:57:17'),
(18, 'supported_currencies', 0, 'a:1:{i:0;s:3:\"USD\";}', '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(19, 'default_currency', 0, 's:3:\"USD\";', '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(20, 'send_order_invoice_email', 0, 'b:0;', '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(21, 'newsletter_enabled', 0, 's:1:\"0\";', '2025-12-10 12:53:21', '2025-12-10 18:57:17'),
(22, 'local_pickup_cost', 0, 's:1:\"0\";', '2025-12-10 12:53:21', '2025-12-10 18:57:17'),
(23, 'flat_rate_cost', 0, 's:1:\"0\";', '2025-12-10 12:53:21', '2025-12-10 18:57:17'),
(24, 'pwa_direction', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(25, 'free_shipping_label', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(26, 'local_pickup_label', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(27, 'flat_rate_label', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(28, 'paypal_label', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(29, 'paypal_description', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(30, 'stripe_label', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(31, 'stripe_description', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(32, 'paytm_label', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(33, 'paytm_description', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(34, 'razorpay_label', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(35, 'razorpay_description', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(36, 'instamojo_label', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(37, 'instamojo_description', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(38, 'authorizenet_label', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(39, 'authorizenet_description', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(40, 'paystack_label', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(41, 'paystack_description', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(42, 'mercadopago_label', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(43, 'mercadopago_description', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(44, 'flutterwave_label', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(45, 'flutterwave_description', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(46, 'iyzico_label', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(47, 'iyzico_description', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(48, 'payfast_label', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(49, 'payfast_description', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(50, 'bkash_label', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(51, 'bkash_description', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(52, 'nagad_label', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(53, 'nagad_description', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(54, 'sslcommerz_label', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(55, 'sslcommerz_description', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(56, 'cod_label', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(57, 'cod_description', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(58, 'bank_transfer_label', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(59, 'bank_transfer_description', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(60, 'check_payment_label', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(61, 'check_payment_description', 1, NULL, '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(62, 'storefront_copyright_text', 0, 's:92:\"Copyright © <a href=\"{{ store_url }}\">{{ store_name }}</a> {{ year }}. All rights reserved.\";', '2025-12-10 12:53:21', '2025-12-10 12:53:21'),
(63, 'maintenance_mode', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-29 00:56:04'),
(64, 'store_tagline', 1, NULL, '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(65, 'store_description', 1, NULL, '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(66, 'bank_transfer_instructions', 1, NULL, '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(67, 'check_payment_instructions', 1, NULL, '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(68, 'store_address_1', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(69, 'store_address_2', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(70, 'store_city', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(71, 'store_country', 0, 's:2:\"GB\";', '2025-12-10 18:57:17', '2025-12-10 12:58:56'),
(72, 'store_state', 0, 's:6:\"London\";', '2025-12-10 18:57:17', '2025-12-10 12:58:56'),
(73, 'store_zip', 0, 's:6:\"E1 7DB\";', '2025-12-10 18:57:17', '2025-12-10 12:59:50'),
(74, 'store_phone_hide', 0, 's:1:\"1\";', '2025-12-10 18:57:17', '2025-12-10 12:59:50'),
(75, 'store_email_hide', 0, 's:1:\"1\";', '2025-12-10 18:57:17', '2025-12-10 12:59:50'),
(76, 'pwa_enabled', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(77, 'pwa_theme_color', 0, 's:7:\"#000000\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(78, 'pwa_background_color', 0, 's:7:\"#000000\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(79, 'pwa_status_bar', 0, 's:7:\"#000000\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(80, 'pwa_display', 0, 's:10:\"fullscreen\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(81, 'pwa_orientation', 0, 's:3:\"any\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(82, 'currency_rate_exchange_service', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(83, 'fixer_access_key', 0, 's:9:\"Hello@123\";', '2025-12-10 18:57:17', '2025-12-13 11:17:01'),
(84, 'forge_api_key', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(85, 'currency_data_feed_api_key', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(86, 'auto_refresh_currency_rates', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(87, 'auto_refresh_currency_rate_frequency', 0, 's:5:\"daily\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(88, 'sms_from', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(89, 'sms_service', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(90, 'vonage_key', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(91, 'vonage_secret', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(92, 'twilio_sid', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(93, 'twilio_token', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(94, 'welcome_sms', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(95, 'new_order_admin_sms', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(96, 'new_order_sms', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(97, 'mail_from_address', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(98, 'mail_from_name', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(99, 'mail_host', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(100, 'mail_port', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(101, 'mail_username', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(102, 'mail_password', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(103, 'mail_encryption', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(104, 'welcome_email', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(105, 'admin_order_email', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(106, 'invoice_email', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(107, 'mailchimp_api_key', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(108, 'mailchimp_list_id', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(109, 'google_recaptcha_enabled', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(110, 'google_recaptcha_site_key', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(111, 'google_recaptcha_secret_key', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(112, 'custom_header_assets', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(113, 'custom_footer_assets', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(114, 'facebook_login_enabled', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(115, 'facebook_login_app_id', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(116, 'facebook_login_app_secret', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(117, 'google_login_enabled', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(118, 'google_login_client_id', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(119, 'google_login_client_secret', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(120, 'free_shipping_enabled', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(121, 'free_shipping_min_amount', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(122, 'local_pickup_enabled', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(123, 'flat_rate_enabled', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(124, 'paypal_enabled', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(125, 'paypal_test_mode', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(126, 'paypal_client_id', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(127, 'paypal_secret', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(128, 'stripe_enabled', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(129, 'stripe_publishable_key', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(130, 'stripe_secret_key', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(131, 'stripe_integration_type', 0, 's:13:\"embedded_form\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(132, 'paytm_enabled', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(133, 'paytm_test_mode', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(134, 'paytm_merchant_id', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(135, 'paytm_merchant_key', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(136, 'razorpay_enabled', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(137, 'razorpay_key_id', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(138, 'razorpay_key_secret', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(139, 'instamojo_enabled', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(140, 'instamojo_test_mode', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(141, 'instamojo_api_key', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(142, 'instamojo_auth_token', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(143, 'paystack_enabled', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(144, 'paystack_test_mode', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(145, 'paystack_public_key', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(146, 'paystack_secret_key', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(147, 'authorizenet_enabled', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(148, 'authorizenet_test_mode', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(149, 'authorizenet_merchant_login_id', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(150, 'authorizenet_merchant_transaction_key', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(151, 'mercadopago_enabled', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(152, 'mercadopago_test_mode', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(153, 'mercadopago_supported_currency', 0, 's:3:\"UYU\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(154, 'mercadopago_public_key', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(155, 'mercadopago_access_token', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(156, 'flutterwave_enabled', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(157, 'flutterwave_test_mode', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(158, 'flutterwave_public_key', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(159, 'flutterwave_secret_key', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(160, 'flutterwave_encryption_key', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(161, 'iyzico_enabled', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(162, 'iyzico_test_mode', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(163, 'iyzico_api_key', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(164, 'iyzico_api_secret', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(165, 'payfast_enabled', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(166, 'payfast_test_mode', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(167, 'payfast_merchant_id', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(168, 'payfast_merchant_key', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(169, 'payfast_passphrase', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(170, 'bkash_enabled', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(171, 'bkash_test_mode', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(172, 'bkash_app_key', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(173, 'bkash_app_secret', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(174, 'bkash_username', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(175, 'bkash_password', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(176, 'nagad_enabled', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(177, 'nagad_test_mode', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(178, 'nagad_merchant_id', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(179, 'nagad_merchant_number', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(180, 'nagad_public_key', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(181, 'nagad_private_key', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(182, 'sslcommerz_enabled', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(183, 'sslcommerz_test_mode', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(184, 'sslcommerz_store_id', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(185, 'sslcommerz_store_password', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(186, 'sslcommerz_is_localhost', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(187, 'cod_enabled', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(188, 'bank_transfer_enabled', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(189, 'check_payment_enabled', 0, 's:1:\"0\";', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(190, 'sms_order_statuses', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(191, 'email_order_statuses', 0, 'N;', '2025-12-10 18:57:17', '2025-12-10 18:57:17'),
(192, 'tab', 0, 's:11:\"maintenance\";', '2025-12-10 18:57:17', '2025-12-29 00:56:05');

-- --------------------------------------------------------

--
-- Table structure for table `setting_translations`
--

CREATE TABLE `setting_translations` (
  `id` int UNSIGNED NOT NULL,
  `setting_id` int UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` longtext COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `setting_translations`
--

INSERT INTO `setting_translations` (`id`, `setting_id`, `locale`, `value`) VALUES
(1, 1, 'en', 's:9:\"Ecommerce\";'),
(2, 24, 'en', 's:4:\"auto\";'),
(3, 25, 'en', 's:13:\"Free Shipping\";'),
(4, 26, 'en', 's:12:\"Local Pickup\";'),
(5, 27, 'en', 's:9:\"Flat Rate\";'),
(6, 28, 'en', 's:6:\"PayPal\";'),
(7, 29, 'en', 's:28:\"Pay via your PayPal account.\";'),
(8, 30, 'en', 's:6:\"Stripe\";'),
(9, 31, 'en', 's:29:\"Pay via credit or debit card.\";'),
(10, 32, 'en', 's:5:\"Paytm\";'),
(11, 33, 'en', 's:103:\"The best payment gateway provider in India for e-payment through credit card, debit card & net banking.\";'),
(12, 34, 'en', 's:8:\"Razorpay\";'),
(13, 35, 'en', 's:74:\"Pay securely by Credit or Debit card or Internet Banking through Razorpay.\";'),
(14, 36, 'en', 's:9:\"Instamojo\";'),
(15, 37, 'en', 's:16:\"CC/DB/NB/Wallets\";'),
(16, 38, 'en', 's:13:\"Authorize.net\";'),
(17, 39, 'en', 's:33:\"Accept payments anytime, anywhere\";'),
(18, 40, 'en', 's:8:\"Paystack\";'),
(19, 41, 'en', 's:45:\"Modern online and offline payments for Africa\";'),
(20, 42, 'en', 's:12:\"Mercado Pago\";'),
(21, 43, 'en', 's:36:\"From now on, do more with your money\";'),
(22, 44, 'en', 's:11:\"Flutterwave\";'),
(23, 45, 'en', 's:40:\"Endless possibilities for every business\";'),
(24, 46, 'en', 's:6:\"Iyzico\";'),
(25, 47, 'en', 's:33:\"Pay for your shopping with iyzico\";'),
(26, 48, 'en', 's:7:\"Payfast\";'),
(27, 49, 'en', 's:31:\"Online Payments In South Africa\";'),
(28, 50, 'en', 's:5:\"bKash\";'),
(29, 51, 'en', 's:27:\"Pay via your bKash account.\";'),
(30, 52, 'en', 's:5:\"Nagad\";'),
(31, 53, 'en', 's:27:\"Pay via your Nagad account.\";'),
(32, 54, 'en', 's:10:\"SSLCommerz\";'),
(33, 55, 'en', 's:32:\"Pay via your SSLCommerz account.\";'),
(34, 56, 'en', 's:16:\"Cash On Delivery\";'),
(35, 57, 'en', 's:28:\"Pay with cash upon delivery.\";'),
(36, 58, 'en', 's:13:\"Bank Transfer\";'),
(37, 59, 'en', 's:100:\"Make your payment directly into our bank account. Please use your Order ID as the payment reference.\";'),
(38, 60, 'en', 's:19:\"Check / Money Order\";'),
(39, 61, 'en', 's:33:\"Please send a check to our store.\";'),
(40, 64, 'en', 'N;'),
(41, 65, 'en', 'N;'),
(42, 66, 'en', 'N;'),
(43, 67, 'en', 'N;');

-- --------------------------------------------------------

--
-- Table structure for table `sliders`
--

CREATE TABLE `sliders` (
  `id` int UNSIGNED NOT NULL,
  `speed` int DEFAULT NULL,
  `autoplay` tinyint(1) DEFAULT NULL,
  `autoplay_speed` int DEFAULT NULL,
  `fade` tinyint(1) NOT NULL DEFAULT '0',
  `dots` tinyint(1) DEFAULT NULL,
  `arrows` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `slider_slides`
--

CREATE TABLE `slider_slides` (
  `id` int UNSIGNED NOT NULL,
  `slider_id` int UNSIGNED NOT NULL,
  `options` text COLLATE utf8mb4_unicode_ci,
  `call_to_action_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `open_in_new_window` tinyint(1) DEFAULT NULL,
  `position` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `slider_slide_translations`
--

CREATE TABLE `slider_slide_translations` (
  `id` int UNSIGNED NOT NULL,
  `slider_slide_id` int UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_id` int UNSIGNED DEFAULT NULL,
  `caption_1` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `caption_2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `call_to_action_text` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direction` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `slider_translations`
--

CREATE TABLE `slider_translations` (
  `id` int UNSIGNED NOT NULL,
  `slider_id` int UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int UNSIGNED NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tag_translations`
--

CREATE TABLE `tag_translations` (
  `id` int UNSIGNED NOT NULL,
  `tag_id` int UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tax_classes`
--

CREATE TABLE `tax_classes` (
  `id` int UNSIGNED NOT NULL,
  `based_on` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tax_class_translations`
--

CREATE TABLE `tax_class_translations` (
  `id` int UNSIGNED NOT NULL,
  `tax_class_id` int UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tax_rates`
--

CREATE TABLE `tax_rates` (
  `id` int UNSIGNED NOT NULL,
  `tax_class_id` int UNSIGNED NOT NULL,
  `country` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zip` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` decimal(8,4) UNSIGNED NOT NULL,
  `position` int UNSIGNED NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tax_rate_translations`
--

CREATE TABLE `tax_rate_translations` (
  `id` int UNSIGNED NOT NULL,
  `tax_rate_id` int UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `throttle`
--

CREATE TABLE `throttle` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ip` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int UNSIGNED NOT NULL,
  `order_id` int UNSIGNED NOT NULL,
  `transaction_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_method` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `translations`
--

CREATE TABLE `translations` (
  `id` int UNSIGNED NOT NULL,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `translation_translations`
--

CREATE TABLE `translation_translations` (
  `id` int UNSIGNED NOT NULL,
  `translation_id` int UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `updater_scripts`
--

CREATE TABLE `updater_scripts` (
  `id` int UNSIGNED NOT NULL,
  `script` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `updater_scripts`
--

INSERT INTO `updater_scripts` (`id`, `script`) VALUES
(1, 'V2_0_0');

-- --------------------------------------------------------

--
-- Table structure for table `up_sell_products`
--

CREATE TABLE `up_sell_products` (
  `product_id` int UNSIGNED NOT NULL,
  `up_sell_product_id` int UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------


-- --------------------------------------------------------
-- Table structure for table `account_openings`
-- (HALO customer account opening applications — added for signup form)
-- --------------------------------------------------------

CREATE TABLE `account_openings` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int UNSIGNED NOT NULL,
  `customer_type` varchar(32) NOT NULL,
  `company_name` varchar(191) NOT NULL,
  `trading_name` varchar(191) DEFAULT NULL,
  `registered_address` text NOT NULL,
  `warehouse_address` text DEFAULT NULL,
  `telephone` varchar(191) DEFAULT NULL,
  `website` varchar(191) DEFAULT NULL,
  `company_house_no` varchar(191) DEFAULT NULL,
  `vat_no` varchar(191) DEFAULT NULL,
  `wda_no` varchar(191) DEFAULT NULL,
  `gdp_cert_no` varchar(191) DEFAULT NULL,
  `gdp_answers` json DEFAULT NULL,
  `license_reg_no` varchar(191) DEFAULT NULL,
  `cqc_reg_no` varchar(191) DEFAULT NULL,
  `cqc_address` text DEFAULT NULL,
  `personnel` json DEFAULT NULL,
  `bank_name` varchar(191) DEFAULT NULL,
  `sort_code` varchar(191) DEFAULT NULL,
  `bank_address` varchar(191) DEFAULT NULL,
  `account_no` varchar(191) DEFAULT NULL,
  `confirm_accurate` tinyint(1) NOT NULL DEFAULT 0,
  `confirm_consent` tinyint(1) NOT NULL DEFAULT 0,
  `decl_name` varchar(191) DEFAULT NULL,
  `decl_position` varchar(191) DEFAULT NULL,
  `decl_sign` varchar(191) DEFAULT NULL,
  `decl_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account_openings_user_id_key` (`user_id`),
  KEY `account_openings_user_id_index` (`user_id`),
  KEY `account_openings_customer_type_index` (`customer_type`),
  CONSTRAINT `account_openings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------
-- Table structure for table `user_profiles`
-- --------------------------------------------------------

CREATE TABLE `user_profiles` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int UNSIGNED NOT NULL,
  `job_role` varchar(191) DEFAULT NULL,
  `license_number` varchar(191) DEFAULT NULL,
  `extension` varchar(191) DEFAULT NULL,
  `institute_name` varchar(191) DEFAULT NULL,
  `address_line_1` varchar(191) DEFAULT NULL,
  `town_city` varchar(191) DEFAULT NULL,
  `country` varchar(191) DEFAULT 'United Kingdom',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_profiles_user_id_key` (`user_id`),
  KEY `user_profiles_user_id_index` (`user_id`),
  CONSTRAINT `user_profiles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permissions` text COLLATE utf8mb4_unicode_ci,
  `last_login` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `phone`, `password`, `permissions`, `last_login`, `created_at`, `updated_at`) VALUES
(1, 'Halo', 'Health', 'admin@visibleangle.com', '03095771211', '$2y$10$L9ucKnTXFqWb21bSFgOhs.JxgDkUbPh0HTPpz4o6FjRzSwuqWkbIe', NULL, '2025-12-29 05:50:11', '2025-12-10 12:53:21', '2025-12-29 00:50:11');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` int UNSIGNED NOT NULL,
  `role_id` int UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2025-12-10 12:53:21', '2025-12-10 12:53:21');

-- --------------------------------------------------------

--
-- Table structure for table `variations`
--

CREATE TABLE `variations` (
  `id` int UNSIGNED NOT NULL,
  `uid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_global` tinyint(1) NOT NULL DEFAULT '1',
  `position` int UNSIGNED DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `variation_translations`
--

CREATE TABLE `variation_translations` (
  `id` int UNSIGNED NOT NULL,
  `variation_id` int UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `variation_values`
--

CREATE TABLE `variation_values` (
  `id` int UNSIGNED NOT NULL,
  `uid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `variation_id` int UNSIGNED NOT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` int UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `variation_value_translations`
--

CREATE TABLE `variation_value_translations` (
  `id` int UNSIGNED NOT NULL,
  `variation_value_id` int UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wish_lists`
--

CREATE TABLE `wish_lists` (
  `user_id` int UNSIGNED NOT NULL,
  `product_id` int UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activations`
--
ALTER TABLE `activations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `activations_user_id_index` (`user_id`);

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `addresses_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `attributes`
--
ALTER TABLE `attributes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `attributes_slug_unique` (`slug`),
  ADD KEY `attributes_attribute_set_id_index` (`attribute_set_id`);

--
-- Indexes for table `attribute_categories`
--
ALTER TABLE `attribute_categories`
  ADD PRIMARY KEY (`attribute_id`,`category_id`),
  ADD KEY `attribute_categories_category_id_foreign` (`category_id`);

--
-- Indexes for table `attribute_sets`
--
ALTER TABLE `attribute_sets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attribute_set_translations`
--
ALTER TABLE `attribute_set_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `attribute_set_translations_attribute_set_id_locale_unique` (`attribute_set_id`,`locale`);

--
-- Indexes for table `attribute_translations`
--
ALTER TABLE `attribute_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `attribute_translations_attribute_id_locale_unique` (`attribute_id`,`locale`);

--
-- Indexes for table `attribute_values`
--
ALTER TABLE `attribute_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attribute_values_attribute_id_index` (`attribute_id`);

--
-- Indexes for table `attribute_value_translations`
--
ALTER TABLE `attribute_value_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `attribute_value_translations_attribute_value_id_locale_unique` (`attribute_value_id`,`locale`);

--
-- Indexes for table `blog_categories`
--
ALTER TABLE `blog_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `blog_categories_slug_unique` (`slug`);

--
-- Indexes for table `blog_category_translations`
--
ALTER TABLE `blog_category_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `blog_category_translations_blog_category_id_locale_unique` (`blog_category_id`,`locale`);

--
-- Indexes for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `blog_posts_slug_unique` (`slug`),
  ADD KEY `blog_posts_user_id_foreign` (`user_id`),
  ADD KEY `blog_posts_blog_category_id_foreign` (`blog_category_id`);

--
-- Indexes for table `blog_post_blog_tag`
--
ALTER TABLE `blog_post_blog_tag`
  ADD PRIMARY KEY (`blog_post_id`,`blog_tag_id`),
  ADD KEY `blog_post_blog_tag_blog_tag_id_foreign` (`blog_tag_id`);

--
-- Indexes for table `blog_post_translations`
--
ALTER TABLE `blog_post_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `blog_post_translations_blog_post_id_locale_unique` (`blog_post_id`,`locale`);
ALTER TABLE `blog_post_translations` ADD FULLTEXT KEY `title` (`title`);

--
-- Indexes for table `blog_tags`
--
ALTER TABLE `blog_tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `blog_tags_slug_unique` (`slug`);

--
-- Indexes for table `blog_tag_translations`
--
ALTER TABLE `blog_tag_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `blog_tag_translations_blog_tag_id_locale_unique` (`blog_tag_id`,`locale`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `brands_slug_unique` (`slug`);

--
-- Indexes for table `brand_translations`
--
ALTER TABLE `brand_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `brand_translations_brand_id_locale_unique` (`brand_id`,`locale`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_id_index` (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`),
  ADD KEY `categories_parent_id_foreign` (`parent_id`);

--
-- Indexes for table `category_translations`
--
ALTER TABLE `category_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `category_translations_category_id_locale_unique` (`category_id`,`locale`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `coupons_code_index` (`code`);

--
-- Indexes for table `coupon_categories`
--
ALTER TABLE `coupon_categories`
  ADD PRIMARY KEY (`coupon_id`,`category_id`,`exclude`),
  ADD KEY `coupon_categories_category_id_foreign` (`category_id`);

--
-- Indexes for table `coupon_products`
--
ALTER TABLE `coupon_products`
  ADD PRIMARY KEY (`coupon_id`,`product_id`),
  ADD KEY `coupon_products_product_id_foreign` (`product_id`);

--
-- Indexes for table `coupon_translations`
--
ALTER TABLE `coupon_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `coupon_translations_coupon_id_locale_unique` (`coupon_id`,`locale`);

--
-- Indexes for table `cross_sell_products`
--
ALTER TABLE `cross_sell_products`
  ADD PRIMARY KEY (`product_id`,`cross_sell_product_id`),
  ADD KEY `cross_sell_products_cross_sell_product_id_foreign` (`cross_sell_product_id`);

--
-- Indexes for table `currency_rates`
--
ALTER TABLE `currency_rates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `currency_rates_currency_unique` (`currency`);

--
-- Indexes for table `default_addresses`
--
ALTER TABLE `default_addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `default_addresses_customer_id_foreign` (`customer_id`),
  ADD KEY `default_addresses_address_id_foreign` (`address_id`);

--
-- Indexes for table `entity_files`
--
ALTER TABLE `entity_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entity_files_entity_type_entity_id_index` (`entity_type`,`entity_id`),
  ADD KEY `entity_files_file_id_index` (`file_id`),
  ADD KEY `entity_files_zone_index` (`zone`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `files_user_id_index` (`user_id`),
  ADD KEY `files_filename_index` (`filename`);

--
-- Indexes for table `flash_sales`
--
ALTER TABLE `flash_sales`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `flash_sale_products`
--
ALTER TABLE `flash_sale_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `flash_sale_products_flash_sale_id_foreign` (`flash_sale_id`),
  ADD KEY `flash_sale_products_product_id_foreign` (`product_id`);

--
-- Indexes for table `flash_sale_product_orders`
--
ALTER TABLE `flash_sale_product_orders`
  ADD PRIMARY KEY (`flash_sale_product_id`,`order_id`),
  ADD KEY `flash_sale_product_orders_order_id_foreign` (`order_id`);

--
-- Indexes for table `flash_sale_translations`
--
ALTER TABLE `flash_sale_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `flash_sale_translations_flash_sale_id_locale_unique` (`flash_sale_id`,`locale`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `menu_items_parent_id_foreign` (`parent_id`),
  ADD KEY `menu_items_category_id_foreign` (`category_id`),
  ADD KEY `menu_items_page_id_foreign` (`page_id`),
  ADD KEY `menu_items_menu_id_index` (`menu_id`);

--
-- Indexes for table `menu_item_translations`
--
ALTER TABLE `menu_item_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `menu_item_translations_menu_item_id_locale_unique` (`menu_item_id`,`locale`);

--
-- Indexes for table `menu_translations`
--
ALTER TABLE `menu_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `menu_translations_menu_id_locale_unique` (`menu_id`,`locale`);

--
-- Indexes for table `meta_data`
--
ALTER TABLE `meta_data`
  ADD PRIMARY KEY (`id`),
  ADD KEY `meta_data_entity_type_entity_id_index` (`entity_type`,`entity_id`);

--
-- Indexes for table `meta_data_translations`
--
ALTER TABLE `meta_data_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `meta_data_translations_meta_data_id_locale_unique` (`meta_data_id`,`locale`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `option_translations`
--
ALTER TABLE `option_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `option_translations_option_id_locale_unique` (`option_id`,`locale`);

--
-- Indexes for table `option_values`
--
ALTER TABLE `option_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `option_values_option_id_index` (`option_id`);

--
-- Indexes for table `option_value_translations`
--
ALTER TABLE `option_value_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `option_value_translations_option_value_id_locale_unique` (`option_value_id`,`locale`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_customer_id_index` (`customer_id`),
  ADD KEY `orders_coupon_id_index` (`coupon_id`);

--
-- Indexes for table `order_downloads`
--
ALTER TABLE `order_downloads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_downloads_order_id_foreign` (`order_id`),
  ADD KEY `order_downloads_file_id_foreign` (`file_id`);

--
-- Indexes for table `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_products_order_id_foreign` (`order_id`),
  ADD KEY `order_products_product_id_foreign` (`product_id`);

--
-- Indexes for table `order_product_options`
--
ALTER TABLE `order_product_options`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_product_options_order_product_id_option_id_unique` (`order_product_id`,`option_id`),
  ADD KEY `order_product_options_option_id_foreign` (`option_id`);

--
-- Indexes for table `order_product_option_values`
--
ALTER TABLE `order_product_option_values`
  ADD PRIMARY KEY (`order_product_option_id`,`option_value_id`),
  ADD KEY `order_product_option_values_option_value_id_foreign` (`option_value_id`);

--
-- Indexes for table `order_product_variations`
--
ALTER TABLE `order_product_variations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_product_variations_order_product_id_variation_id_unique` (`order_product_id`,`variation_id`),
  ADD KEY `order_product_variations_variation_id_foreign` (`variation_id`);

--
-- Indexes for table `order_product_variation_values`
--
ALTER TABLE `order_product_variation_values`
  ADD PRIMARY KEY (`order_product_variation_id`,`variation_value_id`),
  ADD KEY `order_product_variation_values_variation_value_id_foreign` (`variation_value_id`);

--
-- Indexes for table `order_taxes`
--
ALTER TABLE `order_taxes`
  ADD PRIMARY KEY (`order_id`,`tax_rate_id`),
  ADD KEY `order_taxes_tax_rate_id_foreign` (`tax_rate_id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pages_slug_unique` (`slug`);

--
-- Indexes for table `page_translations`
--
ALTER TABLE `page_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `page_translations_page_id_locale_unique` (`page_id`,`locale`);

--
-- Indexes for table `persistences`
--
ALTER TABLE `persistences`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `persistences_code_unique` (`code`),
  ADD KEY `persistences_user_id_foreign` (`user_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_slug_unique` (`slug`),
  ADD KEY `products_brand_id_foreign` (`brand_id`);

--
-- Indexes for table `product_attributes`
--
ALTER TABLE `product_attributes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_attributes_product_id_index` (`product_id`),
  ADD KEY `product_attributes_attribute_id_index` (`attribute_id`);

--
-- Indexes for table `product_attribute_values`
--
ALTER TABLE `product_attribute_values`
  ADD PRIMARY KEY (`product_attribute_id`,`attribute_value_id`),
  ADD KEY `product_attribute_values_attribute_value_id_foreign` (`attribute_value_id`);

--
-- Indexes for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`product_id`,`category_id`),
  ADD KEY `product_categories_category_id_foreign` (`category_id`);

--
-- Indexes for table `product_options`
--
ALTER TABLE `product_options`
  ADD PRIMARY KEY (`product_id`,`option_id`),
  ADD KEY `product_options_option_id_foreign` (`option_id`);

--
-- Indexes for table `product_tags`
--
ALTER TABLE `product_tags`
  ADD PRIMARY KEY (`product_id`,`tag_id`),
  ADD KEY `product_tags_tag_id_foreign` (`tag_id`);

--
-- Indexes for table `product_translations`
--
ALTER TABLE `product_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_translations_product_id_locale_unique` (`product_id`,`locale`);
ALTER TABLE `product_translations` ADD FULLTEXT KEY `name` (`name`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_variants_product_id_foreign` (`product_id`);

--
-- Indexes for table `product_variations`
--
ALTER TABLE `product_variations`
  ADD PRIMARY KEY (`product_id`,`variation_id`),
  ADD KEY `product_variations_variation_id_foreign` (`variation_id`);

--
-- Indexes for table `related_products`
--
ALTER TABLE `related_products`
  ADD PRIMARY KEY (`product_id`,`related_product_id`),
  ADD KEY `related_products_related_product_id_foreign` (`related_product_id`);

--
-- Indexes for table `reminders`
--
ALTER TABLE `reminders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reminders_user_id_foreign` (`user_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_reviewer_id_index` (`reviewer_id`),
  ADD KEY `reviews_product_id_index` (`product_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role_translations`
--
ALTER TABLE `role_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `role_translations_role_id_locale_unique` (`role_id`,`locale`);

--
-- Indexes for table `search_terms`
--
ALTER TABLE `search_terms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `search_terms_term_unique` (`term`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_key_unique` (`key`);

--
-- Indexes for table `setting_translations`
--
ALTER TABLE `setting_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `setting_translations_setting_id_locale_unique` (`setting_id`,`locale`);

--
-- Indexes for table `sliders`
--
ALTER TABLE `sliders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `slider_slides`
--
ALTER TABLE `slider_slides`
  ADD PRIMARY KEY (`id`),
  ADD KEY `slider_slides_slider_id_foreign` (`slider_id`);

--
-- Indexes for table `slider_slide_translations`
--
ALTER TABLE `slider_slide_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slider_slide_translations_slider_slide_id_locale_unique` (`slider_slide_id`,`locale`);

--
-- Indexes for table `slider_translations`
--
ALTER TABLE `slider_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slider_translations_slider_id_locale_unique` (`slider_id`,`locale`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tags_slug_unique` (`slug`);

--
-- Indexes for table `tag_translations`
--
ALTER TABLE `tag_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tag_translations_tag_id_locale_unique` (`tag_id`,`locale`);

--
-- Indexes for table `tax_classes`
--
ALTER TABLE `tax_classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tax_class_translations`
--
ALTER TABLE `tax_class_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tax_class_translations_tax_class_id_locale_unique` (`tax_class_id`,`locale`);

--
-- Indexes for table `tax_rates`
--
ALTER TABLE `tax_rates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tax_rates_tax_class_id_index` (`tax_class_id`);

--
-- Indexes for table `tax_rate_translations`
--
ALTER TABLE `tax_rate_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tax_rate_translations_tax_rate_id_locale_unique` (`tax_rate_id`,`locale`);

--
-- Indexes for table `throttle`
--
ALTER TABLE `throttle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `throttle_user_id_foreign` (`user_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `transactions_order_id_unique` (`order_id`);

--
-- Indexes for table `translations`
--
ALTER TABLE `translations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `translations_key_index` (`key`);

--
-- Indexes for table `translation_translations`
--
ALTER TABLE `translation_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `translation_translations_translation_id_locale_unique` (`translation_id`,`locale`);

--
-- Indexes for table `updater_scripts`
--
ALTER TABLE `updater_scripts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `up_sell_products`
--
ALTER TABLE `up_sell_products`
  ADD PRIMARY KEY (`product_id`,`up_sell_product_id`),
  ADD KEY `up_sell_products_up_sell_product_id_foreign` (`up_sell_product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `user_roles_role_id_foreign` (`role_id`);

--
-- Indexes for table `variations`
--
ALTER TABLE `variations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `variations_uid_unique` (`uid`);

--
-- Indexes for table `variation_translations`
--
ALTER TABLE `variation_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `variation_translations_variation_id_locale_unique` (`variation_id`,`locale`);

--
-- Indexes for table `variation_values`
--
ALTER TABLE `variation_values`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `variation_values_uid_unique` (`uid`),
  ADD KEY `variation_values_variation_id_index` (`variation_id`);

--
-- Indexes for table `variation_value_translations`
--
ALTER TABLE `variation_value_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `variation_value_translations_variation_value_id_locale_unique` (`variation_value_id`,`locale`);

--
-- Indexes for table `wish_lists`
--
ALTER TABLE `wish_lists`
  ADD PRIMARY KEY (`user_id`,`product_id`),
  ADD KEY `wish_lists_product_id_foreign` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activations`
--
ALTER TABLE `activations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attributes`
--
ALTER TABLE `attributes`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attribute_sets`
--
ALTER TABLE `attribute_sets`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attribute_set_translations`
--
ALTER TABLE `attribute_set_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attribute_translations`
--
ALTER TABLE `attribute_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attribute_values`
--
ALTER TABLE `attribute_values`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attribute_value_translations`
--
ALTER TABLE `attribute_value_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog_categories`
--
ALTER TABLE `blog_categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog_category_translations`
--
ALTER TABLE `blog_category_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog_posts`
--
ALTER TABLE `blog_posts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog_post_translations`
--
ALTER TABLE `blog_post_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog_tags`
--
ALTER TABLE `blog_tags`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog_tag_translations`
--
ALTER TABLE `blog_tag_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `brand_translations`
--
ALTER TABLE `brand_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category_translations`
--
ALTER TABLE `category_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coupon_translations`
--
ALTER TABLE `coupon_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `currency_rates`
--
ALTER TABLE `currency_rates`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `default_addresses`
--
ALTER TABLE `default_addresses`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `entity_files`
--
ALTER TABLE `entity_files`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `flash_sales`
--
ALTER TABLE `flash_sales`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `flash_sale_products`
--
ALTER TABLE `flash_sale_products`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `flash_sale_translations`
--
ALTER TABLE `flash_sale_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menu_items`
--
ALTER TABLE `menu_items`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menu_item_translations`
--
ALTER TABLE `menu_item_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menu_translations`
--
ALTER TABLE `menu_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `meta_data`
--
ALTER TABLE `meta_data`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `meta_data_translations`
--
ALTER TABLE `meta_data_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `option_translations`
--
ALTER TABLE `option_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `option_values`
--
ALTER TABLE `option_values`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `option_value_translations`
--
ALTER TABLE `option_value_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_downloads`
--
ALTER TABLE `order_downloads`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_products`
--
ALTER TABLE `order_products`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_product_options`
--
ALTER TABLE `order_product_options`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_product_variations`
--
ALTER TABLE `order_product_variations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `page_translations`
--
ALTER TABLE `page_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `persistences`
--
ALTER TABLE `persistences`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_attributes`
--
ALTER TABLE `product_attributes`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_translations`
--
ALTER TABLE `product_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reminders`
--
ALTER TABLE `reminders`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `role_translations`
--
ALTER TABLE `role_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `search_terms`
--
ALTER TABLE `search_terms`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=193;

--
-- AUTO_INCREMENT for table `setting_translations`
--
ALTER TABLE `setting_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `sliders`
--
ALTER TABLE `sliders`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `slider_slides`
--
ALTER TABLE `slider_slides`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `slider_slide_translations`
--
ALTER TABLE `slider_slide_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `slider_translations`
--
ALTER TABLE `slider_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tag_translations`
--
ALTER TABLE `tag_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tax_classes`
--
ALTER TABLE `tax_classes`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tax_class_translations`
--
ALTER TABLE `tax_class_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tax_rates`
--
ALTER TABLE `tax_rates`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tax_rate_translations`
--
ALTER TABLE `tax_rate_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `throttle`
--
ALTER TABLE `throttle`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `translations`
--
ALTER TABLE `translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `translation_translations`
--
ALTER TABLE `translation_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `updater_scripts`
--
ALTER TABLE `updater_scripts`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `variations`
--
ALTER TABLE `variations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `variation_translations`
--
ALTER TABLE `variation_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `variation_values`
--
ALTER TABLE `variation_values`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `variation_value_translations`
--
ALTER TABLE `variation_value_translations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activations`
--
ALTER TABLE `activations`
  ADD CONSTRAINT `activations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `attributes`
--
ALTER TABLE `attributes`
  ADD CONSTRAINT `attributes_attribute_set_id_foreign` FOREIGN KEY (`attribute_set_id`) REFERENCES `attribute_sets` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `attribute_categories`
--
ALTER TABLE `attribute_categories`
  ADD CONSTRAINT `attribute_categories_attribute_id_foreign` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `attribute_categories_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `attribute_set_translations`
--
ALTER TABLE `attribute_set_translations`
  ADD CONSTRAINT `attribute_set_translations_attribute_set_id_foreign` FOREIGN KEY (`attribute_set_id`) REFERENCES `attribute_sets` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `attribute_translations`
--
ALTER TABLE `attribute_translations`
  ADD CONSTRAINT `attribute_translations_attribute_id_foreign` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `attribute_values`
--
ALTER TABLE `attribute_values`
  ADD CONSTRAINT `attribute_values_attribute_id_foreign` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `attribute_value_translations`
--
ALTER TABLE `attribute_value_translations`
  ADD CONSTRAINT `attribute_value_translations_attribute_value_id_foreign` FOREIGN KEY (`attribute_value_id`) REFERENCES `attribute_values` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `blog_category_translations`
--
ALTER TABLE `blog_category_translations`
  ADD CONSTRAINT `blog_category_translations_blog_category_id_foreign` FOREIGN KEY (`blog_category_id`) REFERENCES `blog_categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD CONSTRAINT `blog_posts_blog_category_id_foreign` FOREIGN KEY (`blog_category_id`) REFERENCES `blog_categories` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `blog_posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `blog_post_blog_tag`
--
ALTER TABLE `blog_post_blog_tag`
  ADD CONSTRAINT `blog_post_blog_tag_blog_post_id_foreign` FOREIGN KEY (`blog_post_id`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `blog_post_blog_tag_blog_tag_id_foreign` FOREIGN KEY (`blog_tag_id`) REFERENCES `blog_tags` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `blog_post_translations`
--
ALTER TABLE `blog_post_translations`
  ADD CONSTRAINT `blog_post_translations_blog_post_id_foreign` FOREIGN KEY (`blog_post_id`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `blog_tag_translations`
--
ALTER TABLE `blog_tag_translations`
  ADD CONSTRAINT `blog_tag_translations_blog_tag_id_foreign` FOREIGN KEY (`blog_tag_id`) REFERENCES `blog_tags` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `category_translations`
--
ALTER TABLE `category_translations`
  ADD CONSTRAINT `category_translations_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `coupon_categories`
--
ALTER TABLE `coupon_categories`
  ADD CONSTRAINT `coupon_categories_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `coupon_categories_coupon_id_foreign` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `coupon_products`
--
ALTER TABLE `coupon_products`
  ADD CONSTRAINT `coupon_products_coupon_id_foreign` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `coupon_products_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `coupon_translations`
--
ALTER TABLE `coupon_translations`
  ADD CONSTRAINT `coupon_translations_coupon_id_foreign` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cross_sell_products`
--
ALTER TABLE `cross_sell_products`
  ADD CONSTRAINT `cross_sell_products_cross_sell_product_id_foreign` FOREIGN KEY (`cross_sell_product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cross_sell_products_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `default_addresses`
--
ALTER TABLE `default_addresses`
  ADD CONSTRAINT `default_addresses_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `default_addresses_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `entity_files`
--
ALTER TABLE `entity_files`
  ADD CONSTRAINT `entity_files_file_id_foreign` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `flash_sale_products`
--
ALTER TABLE `flash_sale_products`
  ADD CONSTRAINT `flash_sale_products_flash_sale_id_foreign` FOREIGN KEY (`flash_sale_id`) REFERENCES `flash_sales` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `flash_sale_products_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `flash_sale_product_orders`
--
ALTER TABLE `flash_sale_product_orders`
  ADD CONSTRAINT `flash_sale_product_orders_flash_sale_product_id_foreign` FOREIGN KEY (`flash_sale_product_id`) REFERENCES `flash_sale_products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `flash_sale_product_orders_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `flash_sale_translations`
--
ALTER TABLE `flash_sale_translations`
  ADD CONSTRAINT `flash_sale_translations_flash_sale_id_foreign` FOREIGN KEY (`flash_sale_id`) REFERENCES `flash_sales` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `menu_items`
--
ALTER TABLE `menu_items`
  ADD CONSTRAINT `menu_items_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `menu_items_menu_id_foreign` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `menu_items_page_id_foreign` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `menu_items_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `menu_items` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `menu_item_translations`
--
ALTER TABLE `menu_item_translations`
  ADD CONSTRAINT `menu_item_translations_menu_item_id_foreign` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `menu_translations`
--
ALTER TABLE `menu_translations`
  ADD CONSTRAINT `menu_translations_menu_id_foreign` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `meta_data_translations`
--
ALTER TABLE `meta_data_translations`
  ADD CONSTRAINT `meta_data_translations_meta_data_id_foreign` FOREIGN KEY (`meta_data_id`) REFERENCES `meta_data` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `option_translations`
--
ALTER TABLE `option_translations`
  ADD CONSTRAINT `option_translations_option_id_foreign` FOREIGN KEY (`option_id`) REFERENCES `options` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `option_values`
--
ALTER TABLE `option_values`
  ADD CONSTRAINT `option_values_option_id_foreign` FOREIGN KEY (`option_id`) REFERENCES `options` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `option_value_translations`
--
ALTER TABLE `option_value_translations`
  ADD CONSTRAINT `option_value_translations_option_value_id_foreign` FOREIGN KEY (`option_value_id`) REFERENCES `option_values` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_downloads`
--
ALTER TABLE `order_downloads`
  ADD CONSTRAINT `order_downloads_file_id_foreign` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_downloads_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_products`
--
ALTER TABLE `order_products`
  ADD CONSTRAINT `order_products_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_products_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_product_options`
--
ALTER TABLE `order_product_options`
  ADD CONSTRAINT `order_product_options_option_id_foreign` FOREIGN KEY (`option_id`) REFERENCES `options` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_product_options_order_product_id_foreign` FOREIGN KEY (`order_product_id`) REFERENCES `order_products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_product_option_values`
--
ALTER TABLE `order_product_option_values`
  ADD CONSTRAINT `order_product_option_values_option_value_id_foreign` FOREIGN KEY (`option_value_id`) REFERENCES `option_values` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_product_option_values_order_product_option_id_foreign` FOREIGN KEY (`order_product_option_id`) REFERENCES `order_product_options` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_product_variations`
--
ALTER TABLE `order_product_variations`
  ADD CONSTRAINT `order_product_variations_order_product_id_foreign` FOREIGN KEY (`order_product_id`) REFERENCES `order_products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_product_variations_variation_id_foreign` FOREIGN KEY (`variation_id`) REFERENCES `variations` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_product_variation_values`
--
ALTER TABLE `order_product_variation_values`
  ADD CONSTRAINT `order_product_variation_values_order_product_variation_id` FOREIGN KEY (`order_product_variation_id`) REFERENCES `order_product_variations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_product_variation_values_variation_value_id_foreign` FOREIGN KEY (`variation_value_id`) REFERENCES `variation_values` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_taxes`
--
ALTER TABLE `order_taxes`
  ADD CONSTRAINT `order_taxes_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_taxes_tax_rate_id_foreign` FOREIGN KEY (`tax_rate_id`) REFERENCES `tax_rates` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `page_translations`
--
ALTER TABLE `page_translations`
  ADD CONSTRAINT `page_translations_page_id_foreign` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `persistences`
--
ALTER TABLE `persistences`
  ADD CONSTRAINT `persistences_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `product_attributes`
--
ALTER TABLE `product_attributes`
  ADD CONSTRAINT `product_attributes_attribute_id_foreign` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_attributes_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_attribute_values`
--
ALTER TABLE `product_attribute_values`
  ADD CONSTRAINT `product_attribute_values_attribute_value_id_foreign` FOREIGN KEY (`attribute_value_id`) REFERENCES `attribute_values` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_attribute_values_product_attribute_id_foreign` FOREIGN KEY (`product_attribute_id`) REFERENCES `product_attributes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD CONSTRAINT `product_categories_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_categories_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_options`
--
ALTER TABLE `product_options`
  ADD CONSTRAINT `product_options_option_id_foreign` FOREIGN KEY (`option_id`) REFERENCES `options` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_options_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_tags`
--
ALTER TABLE `product_tags`
  ADD CONSTRAINT `product_tags_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_tags_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_translations`
--
ALTER TABLE `product_translations`
  ADD CONSTRAINT `product_translations_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_variations`
--
ALTER TABLE `product_variations`
  ADD CONSTRAINT `product_variations_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_variations_variation_id_foreign` FOREIGN KEY (`variation_id`) REFERENCES `variations` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `related_products`
--
ALTER TABLE `related_products`
  ADD CONSTRAINT `related_products_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `related_products_related_product_id_foreign` FOREIGN KEY (`related_product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reminders`
--
ALTER TABLE `reminders`
  ADD CONSTRAINT `reminders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_translations`
--
ALTER TABLE `role_translations`
  ADD CONSTRAINT `role_translations_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `setting_translations`
--
ALTER TABLE `setting_translations`
  ADD CONSTRAINT `setting_translations_setting_id_foreign` FOREIGN KEY (`setting_id`) REFERENCES `settings` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `slider_slides`
--
ALTER TABLE `slider_slides`
  ADD CONSTRAINT `slider_slides_slider_id_foreign` FOREIGN KEY (`slider_id`) REFERENCES `sliders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `slider_slide_translations`
--
ALTER TABLE `slider_slide_translations`
  ADD CONSTRAINT `slider_slide_translations_slider_slide_id_foreign` FOREIGN KEY (`slider_slide_id`) REFERENCES `slider_slides` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `slider_translations`
--
ALTER TABLE `slider_translations`
  ADD CONSTRAINT `slider_translations_slider_id_foreign` FOREIGN KEY (`slider_id`) REFERENCES `sliders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tag_translations`
--
ALTER TABLE `tag_translations`
  ADD CONSTRAINT `tag_translations_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tax_class_translations`
--
ALTER TABLE `tax_class_translations`
  ADD CONSTRAINT `tax_class_translations_tax_class_id_foreign` FOREIGN KEY (`tax_class_id`) REFERENCES `tax_classes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tax_rates`
--
ALTER TABLE `tax_rates`
  ADD CONSTRAINT `tax_rates_tax_class_id_foreign` FOREIGN KEY (`tax_class_id`) REFERENCES `tax_classes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tax_rate_translations`
--
ALTER TABLE `tax_rate_translations`
  ADD CONSTRAINT `tax_rate_translations_tax_rate_id_foreign` FOREIGN KEY (`tax_rate_id`) REFERENCES `tax_rates` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `throttle`
--
ALTER TABLE `throttle`
  ADD CONSTRAINT `throttle_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `translation_translations`
--
ALTER TABLE `translation_translations`
  ADD CONSTRAINT `translation_translations_translation_id_foreign` FOREIGN KEY (`translation_id`) REFERENCES `translations` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `up_sell_products`
--
ALTER TABLE `up_sell_products`
  ADD CONSTRAINT `up_sell_products_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `up_sell_products_up_sell_product_id_foreign` FOREIGN KEY (`up_sell_product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_roles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `variation_translations`
--
ALTER TABLE `variation_translations`
  ADD CONSTRAINT `variation_translations_variation_id_foreign` FOREIGN KEY (`variation_id`) REFERENCES `variations` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `variation_values`
--
ALTER TABLE `variation_values`
  ADD CONSTRAINT `variation_values_variation_id_foreign` FOREIGN KEY (`variation_id`) REFERENCES `variations` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `variation_value_translations`
--
ALTER TABLE `variation_value_translations`
  ADD CONSTRAINT `variation_value_translations_variation_value_id_foreign` FOREIGN KEY (`variation_value_id`) REFERENCES `variation_values` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `wish_lists`
--
ALTER TABLE `wish_lists`
  ADD CONSTRAINT `wish_lists_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wish_lists_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
