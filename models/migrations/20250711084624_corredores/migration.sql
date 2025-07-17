-- CreateTable
CREATE TABLE "Corredor" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "dorsal" INTEGER NOT NULL,
    "equipo" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Corredor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Corredor_dorsal_key" ON "Corredor"("dorsal");
