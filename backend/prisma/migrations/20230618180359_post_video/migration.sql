/*
  Warnings:

  - You are about to alter the column `created` on the `post` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `post` MODIFY `file` VARCHAR(150) NULL DEFAULT NULL,
    MODIFY `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    MODIFY `video_id` INTEGER NULL DEFAULT NULL;

-- AlterTable
ALTER TABLE `video` MODIFY `v1080p` VARCHAR(150) NULL DEFAULT NULL,
    MODIFY `v720p` VARCHAR(150) NULL DEFAULT NULL,
    MODIFY `v480p` VARCHAR(150) NULL DEFAULT NULL,
    MODIFY `v144p` VARCHAR(150) NULL DEFAULT NULL;
