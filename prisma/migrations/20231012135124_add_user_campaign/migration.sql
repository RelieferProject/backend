-- CreateTable
CREATE TABLE "UserOnCampaign" (
    "id" SERIAL NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "userAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "UserOnCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserOnCampaign_campaignId_idx" ON "UserOnCampaign"("campaignId");

-- CreateIndex
CREATE INDEX "UserOnCampaign_userAddress_idx" ON "UserOnCampaign"("userAddress");

-- AddForeignKey
ALTER TABLE "UserOnCampaign" ADD CONSTRAINT "UserOnCampaign_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnCampaign" ADD CONSTRAINT "UserOnCampaign_userAddress_fkey" FOREIGN KEY ("userAddress") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
