-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `username` VARCHAR(200) NOT NULL,
    `phone` VARCHAR(50) NOT NULL,
    `bio` VARCHAR(1000) NOT NULL,
    `gender` VARCHAR(50) NOT NULL,
    `birthday` DATE NOT NULL,
    `country` VARCHAR(80) NOT NULL,
    `estate` VARCHAR(100) NOT NULL,
    `city` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
