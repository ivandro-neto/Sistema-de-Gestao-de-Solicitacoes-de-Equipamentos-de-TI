/*
  Warnings:

  - You are about to drop the column `senhaHash` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `equipamentoId` to the `Solicitation` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tipo` on the `Usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Solicitation" ADD COLUMN     "equipamentoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "senhaHash",
ADD COLUMN     "senha" TEXT,
DROP COLUMN "tipo",
ADD COLUMN     "tipo" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Solicitation" ADD CONSTRAINT "Solicitation_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "Equipamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
