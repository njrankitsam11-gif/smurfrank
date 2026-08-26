-- CreateIndex
CREATE INDEX "Listing_active_createdAt_idx" ON "Listing"("active", "createdAt");

-- CreateIndex
CREATE INDEX "Listing_game_active_createdAt_idx" ON "Listing"("game", "active", "createdAt");

-- CreateIndex
CREATE INDEX "Listing_status_idx" ON "Listing"("status");

-- CreateIndex
CREATE INDEX "Listing_sellerEmail_idx" ON "Listing"("sellerEmail");

-- CreateIndex
CREATE INDEX "Order_listingId_idx" ON "Order"("listingId");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "Inquiry_updatedAt_idx" ON "Inquiry"("updatedAt");

-- CreateIndex
CREATE INDEX "Inquiry_status_idx" ON "Inquiry"("status");

-- CreateIndex
CREATE INDEX "InquiryMessage_inquiryId_createdAt_idx" ON "InquiryMessage"("inquiryId", "createdAt");
