-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 31, 2025 at 07:02 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `complaintsl_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `adminId` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`adminId`, `email`, `password`, `name`) VALUES
(1, 'admin@citizedesk.com', 'admin', 'admin@citizen');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedbackId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `feedbackType` enum('feedback','complaint') DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `visibility` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`feedbackId`, `userId`, `title`, `message`, `feedbackType`, `timestamp`, `visibility`) VALUES
(1, 1, 'Road Maintenance Needed', 'Road Maintenance Needed', 'complaint', '2025-08-31 15:33:02', 1),
(2, 1, 'Road Maintenance Needed', 'The main road in Kandy near the hospital has many potholes. Request proper repair.', 'complaint', '2025-08-31 17:30:00', 1),
(3, 1, 'Public Transport Improvement', 'Buses are frequently delayed and overcrowded. Suggest more frequent services.', 'feedback', '2025-08-31 17:40:00', 1),
(4, 1, 'Water Supply Issue', 'No water supply in Nugegoda area for 3 days. Please investigate.', 'complaint', '2025-08-31 17:50:00', 1),
(5, 1, 'Community Park Suggestion', 'A public park near Colombo 7 would benefit local residents.', 'feedback', '2025-08-31 18:00:00', 1),
(6, 1, 'Garbage Collection', 'Garbage bins are overflowing in Dehiwala. Request frequent garbage collection.', 'complaint', '2025-08-31 18:10:00', 1),
(7, 1, 'Digital Services Feedback', 'Government website for tax payments is slow and hard to navigate. Improve UX.', 'feedback', '2025-08-31 18:20:00', 1),
(8, 1, 'Street Lighting Issue', 'Street lights in Battaramulla are not functioning at night, causing safety issues.', 'complaint', '2025-08-31 18:25:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `response`
--

CREATE TABLE `response` (
  `responseId` int(11) NOT NULL,
  `feedbackId` int(11) NOT NULL,
  `adminId` int(11) NOT NULL,
  `message` text DEFAULT NULL,
  `responseTime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `response`
--

INSERT INTO `response` (`responseId`, `feedbackId`, `adminId`, `message`, `responseTime`) VALUES
(1, 1, 1, 'dafdfds sdsfsf dasd', '2025-08-31 16:34:47');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `nic` varchar(15) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `name`, `nic`, `email`, `password`) VALUES
(1, 'hansaka', '200209801097', 'hansakaravi02@gmail.com', 'rasaja12345');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`adminId`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedbackId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `response`
--
ALTER TABLE `response`
  ADD PRIMARY KEY (`responseId`),
  ADD UNIQUE KEY `feedbackId` (`feedbackId`),
  ADD KEY `adminId` (`adminId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `nic` (`nic`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `adminId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedbackId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `response`
--
ALTER TABLE `response`
  MODIFY `responseId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`);

--
-- Constraints for table `response`
--
ALTER TABLE `response`
  ADD CONSTRAINT `response_ibfk_1` FOREIGN KEY (`feedbackId`) REFERENCES `feedback` (`feedbackId`),
  ADD CONSTRAINT `response_ibfk_2` FOREIGN KEY (`adminId`) REFERENCES `admins` (`adminId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
