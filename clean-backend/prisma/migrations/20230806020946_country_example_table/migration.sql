/*
  Warnings:

  - You are about to alter the column `created` on the `post` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `post` MODIFY `file` VARCHAR(150) NULL DEFAULT NULL,
    MODIFY `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    MODIFY `video_id` INTEGER NULL DEFAULT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `video` MODIFY `v1080p` VARCHAR(150) NULL DEFAULT NULL,
    MODIFY `v720p` VARCHAR(150) NULL DEFAULT NULL,
    MODIFY `v480p` VARCHAR(150) NULL DEFAULT NULL,
    MODIFY `v144p` VARCHAR(150) NULL DEFAULT NULL;

-- CreateTable
CREATE TABLE `Country` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `abbr` VARCHAR(3) NOT NULL,
    `sort` INTEGER NOT NULL,
    `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
