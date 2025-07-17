-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Porra" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "dorsales" TEXT[],
    "costo" DOUBLE PRECISION NOT NULL DEFAULT 30.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Porra_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Porra" ADD CONSTRAINT "Porra_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
