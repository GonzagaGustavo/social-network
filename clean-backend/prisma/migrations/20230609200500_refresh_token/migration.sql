-- AlterTable
ALTER TABLE `user` MODIFY `phone` VARCHAR(50) NOT NULL DEFAULT '',
    MODIFY `bio` VARCHAR(1000) NOT NULL DEFAULT '',
    MODIFY `country` VARCHAR(80) NOT NULL DEFAULT '',
    MODIFY `estate` VARCHAR(100) NOT NULL DEFAULT '',
    MODIFY `city` VARCHAR(100) NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE `refresh_token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `expiresIn` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `refresh_token_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `refresh_token` ADD CONSTRAINT `refresh_token_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
