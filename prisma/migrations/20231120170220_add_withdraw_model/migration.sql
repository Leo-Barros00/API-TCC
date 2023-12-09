-- CreateTable
CREATE TABLE "Withdrawl" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "value" MONEY NOT NULL,
    "date" TIMESTAMP NOT NULL,

    CONSTRAINT "Withdrawl_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Withdrawl" ADD CONSTRAINT "Withdrawl_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
