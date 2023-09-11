-- CreateTable
CREATE TABLE "RejectReason" (
    "id" UUID NOT NULL,
    "reason" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,

    CONSTRAINT "RejectReason_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RejectReason" ADD CONSTRAINT "RejectReason_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
