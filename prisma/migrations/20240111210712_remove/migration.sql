/*
  Warnings:

  - You are about to drop the `UserOnCampaign` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOnCampaign" DROP CONSTRAINT "UserOnCampaign_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnCampaign" DROP CONSTRAINT "UserOnCampaign_userAddress_fkey";

-- DropTable
DROP TABLE "UserOnCampaign";
