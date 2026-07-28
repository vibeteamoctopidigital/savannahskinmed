/*
  Warnings:

  - You are about to drop the column `isActive` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `sortOrder` on the `BlogPost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BlogPost" DROP COLUMN "isActive",
DROP COLUMN "sortOrder";
