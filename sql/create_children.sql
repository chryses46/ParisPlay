CREATE TABLE `children` (
  `uuid` char(36) NOT NULL,
  `user_uuid` char(36) NOT NULL,
  `user_email` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `dob` date NOT NULL,
  PRIMARY KEY (`uuid`),
  KEY `uuid_idx` (`user_email`),
  KEY `uuid` (`user_uuid`),
  CONSTRAINT `uuid` FOREIGN KEY (`user_uuid`) REFERENCES `users` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

