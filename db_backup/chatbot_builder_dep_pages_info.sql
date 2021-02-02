-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: dev-db.cgy3xpod6h10.ap-southeast-1.rds.amazonaws.com    Database: chatbot_builder_dep
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pages_info`
--

DROP TABLE IF EXISTS `pages_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pages_info` (
  `pinfID` int(7) unsigned NOT NULL AUTO_INCREMENT,
  `clientID` varchar(500) NOT NULL,
  `pageID` varchar(500) NOT NULL,
  `page_access_token` varchar(500) NOT NULL,
  PRIMARY KEY (`pinfID`),
  KEY `clientID` (`clientID`),
  CONSTRAINT `pages_info_ibfk_1` FOREIGN KEY (`clientID`) REFERENCES `client_info` (`clientID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages_info`
--

LOCK TABLES `pages_info` WRITE;
/*!40000 ALTER TABLE `pages_info` DISABLE KEYS */;
INSERT INTO `pages_info` VALUES (2,'104664194766116','104664194766116','EAANCt9hLmN0BAOkZCcnhqZC1JuTxumZBLNGw9CMrztsYUErOUPz8DVUGqiH0ZCSFa134ym7198a72GPozCxZBx1ZCei2YbSaB29a6bXbPONVsxNHLZCkL5FklwPXIPkL57Ukl5PUwTPZADi4r6fTREaItpSMOh5jdybmv7PZAzdWzMPIDa2AbfD6hhhku7CFog1YZD');
/*!40000 ALTER TABLE `pages_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-09  8:43:32
