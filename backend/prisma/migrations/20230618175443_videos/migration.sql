/*
  Warnings:

  - You are about to drop the column `likes` on the `post` table. All the data in the column will be lost.
  - You are about to alter the column `created` on the `post` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[video_id]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `likes`,
    ADD COLUMN `video_id` INTEGER NULL DEFAULT NULL,
    MODIFY `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE `Video` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `thumb` VARCHAR(150) NOT NULL,
    `v1080p` VARCHAR(150) NULL DEFAULT NULL,
    `v720p` VARCHAR(150) NULL DEFAULT NULL,
    `v480p` VARCHAR(150) NULL DEFAULT NULL,
    `v144p` VARCHAR(150) NULL DEFAULT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Likes` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `post_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Post_video_id_key` ON `Post`(`video_id`);

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_video_id_fkey` FOREIGN KEY (`video_id`) REFERENCES `Video`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
