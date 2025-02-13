/*
  Warnings:

  - The primary key for the `AtribuicaoTecnico` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Componente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Equipamento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `EquipmentComponent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `HistoricoSolicitacoes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Relatorio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Solicitation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Tecnico` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "AtribuicaoTecnico" DROP CONSTRAINT "AtribuicaoTecnico_solicitacaoId_fkey";

-- DropForeignKey
ALTER TABLE "AtribuicaoTecnico" DROP CONSTRAINT "AtribuicaoTecnico_tecnicoId_fkey";

-- DropForeignKey
ALTER TABLE "EquipmentComponent" DROP CONSTRAINT "EquipmentComponent_componenteId_fkey";

-- DropForeignKey
ALTER TABLE "EquipmentComponent" DROP CONSTRAINT "EquipmentComponent_equipamentoId_fkey";

-- DropForeignKey
ALTER TABLE "HistoricoSolicitacoes" DROP CONSTRAINT "HistoricoSolicitacoes_solicitacaoId_fkey";

-- DropForeignKey
ALTER TABLE "Solicitation" DROP CONSTRAINT "Solicitation_equipamentoId_fkey";

-- DropForeignKey
ALTER TABLE "Solicitation" DROP CONSTRAINT "Solicitation_solicitanteId_fkey";

-- DropForeignKey
ALTER TABLE "Tecnico" DROP CONSTRAINT "Tecnico_usuarioId_fkey";

-- AlterTable
ALTER TABLE "AtribuicaoTecnico" DROP CONSTRAINT "AtribuicaoTecnico_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "solicitacaoId" SET DATA TYPE TEXT,
ALTER COLUMN "tecnicoId" SET DATA TYPE TEXT,
ADD CONSTRAINT "AtribuicaoTecnico_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "AtribuicaoTecnico_id_seq";

-- AlterTable
ALTER TABLE "Componente" DROP CONSTRAINT "Componente_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Componente_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Componente_id_seq";

-- AlterTable
ALTER TABLE "Equipamento" DROP CONSTRAINT "Equipamento_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Equipamento_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Equipamento_id_seq";

-- AlterTable
ALTER TABLE "EquipmentComponent" DROP CONSTRAINT "EquipmentComponent_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "equipamentoId" SET DATA TYPE TEXT,
ALTER COLUMN "componenteId" SET DATA TYPE TEXT,
ADD CONSTRAINT "EquipmentComponent_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "EquipmentComponent_id_seq";

-- AlterTable
ALTER TABLE "HistoricoSolicitacoes" DROP CONSTRAINT "HistoricoSolicitacoes_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "solicitacaoId" SET DATA TYPE TEXT,
ADD CONSTRAINT "HistoricoSolicitacoes_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "HistoricoSolicitacoes_id_seq";

-- AlterTable
ALTER TABLE "Relatorio" DROP CONSTRAINT "Relatorio_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Relatorio_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Relatorio_id_seq";

-- AlterTable
ALTER TABLE "Solicitation" DROP CONSTRAINT "Solicitation_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "solicitanteId" SET DATA TYPE TEXT,
ALTER COLUMN "equipamentoId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Solicitation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Solicitation_id_seq";

-- AlterTable
ALTER TABLE "Tecnico" DROP CONSTRAINT "Tecnico_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "usuarioId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Tecnico_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Tecnico_id_seq";

-- AlterTable
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Usuario_id_seq";

-- AddForeignKey
ALTER TABLE "Solicitation" ADD CONSTRAINT "Solicitation_solicitanteId_fkey" FOREIGN KEY ("solicitanteId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitation" ADD CONSTRAINT "Solicitation_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "Equipamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentComponent" ADD CONSTRAINT "EquipmentComponent_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "Equipamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentComponent" ADD CONSTRAINT "EquipmentComponent_componenteId_fkey" FOREIGN KEY ("componenteId") REFERENCES "Componente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tecnico" ADD CONSTRAINT "Tecnico_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtribuicaoTecnico" ADD CONSTRAINT "AtribuicaoTecnico_solicitacaoId_fkey" FOREIGN KEY ("solicitacaoId") REFERENCES "Solicitation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtribuicaoTecnico" ADD CONSTRAINT "AtribuicaoTecnico_tecnicoId_fkey" FOREIGN KEY ("tecnicoId") REFERENCES "Tecnico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoSolicitacoes" ADD CONSTRAINT "HistoricoSolicitacoes_solicitacaoId_fkey" FOREIGN KEY ("solicitacaoId") REFERENCES "Solicitation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
