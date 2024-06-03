CREATE TABLE `memberships` (
  `uuid` char(36) NOT NULL DEFAULT 'UUID()',
  `type` varchar(45) NOT NULL,
  `num_children` int NOT NULL,
  `num_visits` int NOT NULL,
  `discount` int NOT NULL,
  `cost` int NOT NULL,
  `user_uuid` char(36) NOT NULL,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`),
  KEY `user_uuid_idx` (`user_uuid`),
  CONSTRAINT `user_uuid` FOREIGN KEY (`user_uuid`) REFERENCES `users` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
