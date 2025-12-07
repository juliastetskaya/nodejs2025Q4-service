/*
  Warnings:

  - You are about to drop the `favorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "albums" ADD COLUMN     "isFavorite" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "artists" ADD COLUMN     "isFavorite" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "tracks" ADD COLUMN     "isFavorite" BOOLEAN DEFAULT false;

-- DropTable
DROP TABLE "favorites";
