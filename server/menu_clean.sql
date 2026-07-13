-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: my_catering_db
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `menu_types`
--

DROP TABLE IF EXISTS `menu_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_types`
--

LOCK TABLES `menu_types` WRITE;
/*!40000 ALTER TABLE `menu_types` DISABLE KEYS */;
INSERT INTO `menu_types` VALUES (1,'lunch-veg',1,'2026-05-19 04:31:51');
/*!40000 ALTER TABLE `menu_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_categories`
--

DROP TABLE IF EXISTS `menu_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type_id` int DEFAULT NULL,
  `sort_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `menu_categories_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `menu_types` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_categories`
--

LOCK TABLES `menu_categories` WRITE;
/*!40000 ALTER TABLE `menu_categories` DISABLE KEYS */;
INSERT INTO `menu_categories` VALUES (1,'starters',1,0,1,'2026-05-19 04:32:00'),(2,'Drink',NULL,0,1,'2026-05-21 11:27:20'),(3,'Soup',NULL,0,1,'2026-05-21 11:27:20'),(4,'Sweet',NULL,0,1,'2026-05-21 11:27:20'),(5,'Snacks',NULL,0,1,'2026-05-21 11:27:20'),(6,'Starters',NULL,0,1,'2026-05-21 11:27:20'),(7,'Payasam',NULL,0,1,'2026-05-21 11:27:20'),(8,'Tiffin',NULL,0,1,'2026-05-21 11:27:20'),(9,'Indian Breads',NULL,0,1,'2026-05-21 11:27:20'),(10,'Our Special Menu',NULL,0,1,'2026-05-21 11:27:20'),(11,'Side Dish - Gravy',NULL,0,1,'2026-05-21 11:27:20'),(12,'Rice Items',NULL,0,1,'2026-05-21 11:27:20'),(13,'Common Items',NULL,0,1,'2026-05-21 11:27:20'),(14,'Noodles Items',NULL,0,1,'2026-05-21 11:27:20'),(15,'Raita, Pickle & Other',NULL,0,1,'2026-05-21 11:27:20'),(16,'Tiffin Side Dish - Sambar, Chutney & Others',NULL,0,1,'2026-05-21 11:27:20'),(17,'Sambar, Kuzhambu & Rasam',NULL,0,1,'2026-05-21 11:27:20'),(18,'Side Dish - Poriyal, Kootu & Aviyal',NULL,0,1,'2026-05-21 11:27:20'),(19,'Drink',NULL,0,1,'2026-05-21 11:29:26'),(20,'Soup',NULL,0,1,'2026-05-21 11:29:26'),(21,'Sweet',NULL,0,1,'2026-05-21 11:29:26'),(22,'Snacks',NULL,0,1,'2026-05-21 11:29:26'),(23,'Starters',NULL,0,1,'2026-05-21 11:29:26'),(24,'Payasam',NULL,0,1,'2026-05-21 11:29:26'),(25,'Tiffin',NULL,0,1,'2026-05-21 11:29:26'),(26,'Indian Breads',NULL,0,1,'2026-05-21 11:29:26'),(27,'Our Special Menu',NULL,0,1,'2026-05-21 11:29:26'),(28,'Side Dish - Gravy',NULL,0,1,'2026-05-21 11:29:26'),(29,'Rice Items',NULL,0,1,'2026-05-21 11:29:26'),(30,'Common Items',NULL,0,1,'2026-05-21 11:29:26'),(31,'Noodles Items',NULL,0,1,'2026-05-21 11:29:26'),(32,'Raita, Pickle & Other',NULL,0,1,'2026-05-21 11:29:26'),(33,'Tiffin Side Dish - Sambar, Chutney & Others',NULL,0,1,'2026-05-21 11:29:26'),(34,'Sambar, Kuzhambu & Rasam',NULL,0,1,'2026-05-21 11:29:26'),(35,'Side Dish - Poriyal, Kootu & Aviyal',NULL,0,1,'2026-05-21 11:29:26'),(36,'Drink',NULL,0,1,'2026-05-21 11:29:54'),(37,'Soup',NULL,0,1,'2026-05-21 11:29:54'),(38,'Sweet',NULL,0,1,'2026-05-21 11:29:54'),(39,'Snacks',NULL,0,1,'2026-05-21 11:29:54'),(40,'Starters',NULL,0,1,'2026-05-21 11:29:54'),(41,'Payasam',NULL,0,1,'2026-05-21 11:29:54'),(42,'Tiffin',NULL,0,1,'2026-05-21 11:29:54'),(43,'Indian Breads',NULL,0,1,'2026-05-21 11:29:54'),(44,'Our Special Menu',NULL,0,1,'2026-05-21 11:29:54'),(45,'Side Dish - Gravy',NULL,0,1,'2026-05-21 11:29:54'),(46,'Rice Items',NULL,0,1,'2026-05-21 11:29:54'),(47,'Common Items',NULL,0,1,'2026-05-21 11:29:54'),(48,'Noodles Items',NULL,0,1,'2026-05-21 11:29:54'),(49,'Raita, Pickle & Other',NULL,0,1,'2026-05-21 11:29:54'),(50,'Tiffin Side Dish - Sambar, Chutney & Others',NULL,0,1,'2026-05-21 11:29:54'),(51,'Sambar, Kuzhambu & Rasam',NULL,0,1,'2026-05-21 11:29:54'),(52,'Side Dish - Poriyal, Kootu & Aviyal',NULL,0,1,'2026-05-21 11:29:54');
/*!40000 ALTER TABLE `menu_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_items`
--

DROP TABLE IF EXISTS `menu_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `description` text,
  `unit` varchar(50) DEFAULT 'per plate',
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `is_veg` tinyint(1) DEFAULT '1',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_items`
--

LOCK TABLES `menu_items` WRITE;
/*!40000 ALTER TABLE `menu_items` DISABLE KEYS */;
INSERT INTO `menu_items` VALUES (1,'panner','starters',NULL,NULL,25.00,NULL,0,'2026-05-19 04:13:58','2026-05-19 04:53:09'),(2,'panner','starters',NULL,'per plate',25.00,1,0,'2026-05-19 04:32:25','2026-05-19 04:53:11'),(3,'panner','starters',NULL,'per plate',25.00,1,1,'2026-05-19 04:53:18','2026-05-19 04:53:18'),(4,'butter','starters',NULL,NULL,23.00,NULL,1,'2026-05-19 05:04:19','2026-05-21 10:47:45'),(5,'idly','starters',NULL,'per plate',2.00,1,1,'2026-05-21 11:07:15','2026-05-21 11:07:15');
/*!40000 ALTER TABLE `menu_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_categories`
--

DROP TABLE IF EXISTS `event_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_categories`
--

LOCK TABLES `event_categories` WRITE;
/*!40000 ALTER TABLE `event_categories` DISABLE KEYS */;
INSERT INTO `event_categories` VALUES (1,'wedding',1,'2026-05-19 04:32:33');
/*!40000 ALTER TABLE `event_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_stall_items`
--

DROP TABLE IF EXISTS `event_stall_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_stall_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category_id` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT '0.00',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `event_stall_items_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `event_categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_stall_items`
--

LOCK TABLES `event_stall_items` WRITE;
/*!40000 ALTER TABLE `event_stall_items` DISABLE KEYS */;
INSERT INTO `event_stall_items` VALUES (1,'pop corn',1,100.00,1,'2026-05-19 04:32:43');
/*!40000 ALTER TABLE `event_stall_items` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-22 13:54:30
