-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 17, 2023 at 04:10 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tenants`
--

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `property_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `property_status` varchar(255) NOT NULL DEFAULT 'available',
  `approved` varchar(100) NOT NULL DEFAULT 'no',
  `property_name` varchar(255) NOT NULL,
  `property_type` varchar(255) NOT NULL,
  `property_location` text NOT NULL,
  `property_desc` text NOT NULL,
  `property_maps` text NOT NULL,
  `property_cost` float NOT NULL,
  `property_bedrooms` int(11) NOT NULL,
  `property_bathrooms` int(11) NOT NULL,
  `property_photos` text NOT NULL,
  `property_create_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`property_id`, `owner_id`, `property_status`, `approved`, `property_name`, `property_type`, `property_location`, `property_desc`, `property_maps`, `property_cost`, `property_bedrooms`, `property_bathrooms`, `property_photos`, `property_create_date`) VALUES
(1, 1, 'available', 'no', 'House', 'house', 'Kampala', 'This is the best', 'no-maps', 2000, 2, 2, 'default.png', '2023-05-24 12:32:19'),
(2, 1, 'available', 'no', 'Peter Parker', 'house', 'Nateete', 'This is huge', 'https://goo.gl/maps/A5A7zofvjhLNku4L9', 89, 2, 3, 'default.png', '2023-05-24 13:46:45'),
(3, 1, 'available', 'no', 'Peter Parker', 'house', 'Nateete', 'This is huge', 'maps', 89, 2, 3, 'default.png', '2023-05-24 13:51:05'),
(4, 1, 'available', 'no', 'Peter Parker', 'house', 'Nateete', 'This is huge', 'maps', 89, 2, 3, 'default.png', '2023-05-24 13:52:22'),
(5, 8, 'available', 'no', 'Dammy property', '1', 'Kampala', 'This is true', 'https://goo.gl/maps/A5A7zofvjhLNku4L9', 2000, 23, 3, 'default.png', '2023-06-17 10:59:16');

-- --------------------------------------------------------

--
-- Table structure for table `property_comments`
--

CREATE TABLE `property_comments` (
  `comment_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `comment_message` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `property_comments`
--

INSERT INTO `property_comments` (`comment_id`, `property_id`, `comment_message`, `user_id`, `comment_date`) VALUES
(1, 1, 'This is a good property looking forward to working with him every day over and over again. keep  the good services.', 6, '2023-06-14 17:16:14'),
(2, 1, 'This is a good house for the living but still needs refurbishing.', 7, '2023-06-14 17:25:15'),
(3, 1, 'This is the good house', 6, '2023-06-14 17:30:01'),
(4, 1, 'This is the greatest property I have interacted with for years until now.', 7, '2023-06-14 17:31:50'),
(5, 2, 'This is a nice property for all people', 8, '2023-06-17 06:55:44'),
(6, 1, 'This is property is so nice', 8, '2023-06-17 07:18:10');

-- --------------------------------------------------------

--
-- Table structure for table `property_leases`
--

CREATE TABLE `property_leases` (
  `lease_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `amount_paid` float NOT NULL DEFAULT 0,
  `payment_date` date NOT NULL DEFAULT current_timestamp(),
  `start_date` date NOT NULL,
  `end_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `property_leases`
--

INSERT INTO `property_leases` (`lease_id`, `property_id`, `user_id`, `amount_paid`, `payment_date`, `start_date`, `end_date`) VALUES
(1, 1, 1, 6000, '2023-05-24', '2023-05-24', '2023-05-31'),
(2, 1, 1, 12000, '2023-06-14', '2023-06-14', '2023-06-30'),
(3, 1, 1, 12000, '2023-06-14', '2023-06-14', '2023-07-14');

-- --------------------------------------------------------

--
-- Table structure for table `property_likes`
--

CREATE TABLE `property_likes` (
  `like_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `property_likes`
--

INSERT INTO `property_likes` (`like_id`, `property_id`, `user_id`) VALUES
(1, 1, 8),
(2, 1, 8),
(3, 1, 8),
(4, 1, 8),
(5, 1, 8),
(6, 2, 8),
(7, 3, 8);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `contact` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'admin',
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `contact`, `role`, `password`) VALUES
(6, 'Peter Parker', '0708847386', 'landlord', '46792755'),
(7, 'test', '0708847386', 'tenant', '1509442'),
(8, 'Tonny', '070000000', 'tenant', '1509442'),
(9, 'Thomas Mula', '0712345678', 'tenant', '1509442');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`property_id`);

--
-- Indexes for table `property_comments`
--
ALTER TABLE `property_comments`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `property_leases`
--
ALTER TABLE `property_leases`
  ADD PRIMARY KEY (`lease_id`);

--
-- Indexes for table `property_likes`
--
ALTER TABLE `property_likes`
  ADD PRIMARY KEY (`like_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `property`
--
ALTER TABLE `property`
  MODIFY `property_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `property_comments`
--
ALTER TABLE `property_comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `property_leases`
--
ALTER TABLE `property_leases`
  MODIFY `lease_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `property_likes`
--
ALTER TABLE `property_likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
