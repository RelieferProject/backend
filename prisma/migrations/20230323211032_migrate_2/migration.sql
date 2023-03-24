/*
  Warnings:

  - You are about to drop the column `student_id` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_student_id_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "student_id";
