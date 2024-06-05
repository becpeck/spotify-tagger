/*
  Warnings:

  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[spotifyId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `country` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `explicitFiltered` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `explicitLocked` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followers` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spotifyId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "image",
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "explicitFiltered" BOOLEAN NOT NULL,
ADD COLUMN     "explicitLocked" BOOLEAN NOT NULL,
ADD COLUMN     "followers" INTEGER NOT NULL,
ADD COLUMN     "images" JSONB[],
ADD COLUMN     "product" TEXT NOT NULL,
ADD COLUMN     "spotifyId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_spotifyId_key" ON "User"("spotifyId");
