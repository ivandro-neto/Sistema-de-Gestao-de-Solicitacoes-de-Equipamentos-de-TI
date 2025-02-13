// src/controllers/solicitacoesController.ts
import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Função auxiliar para verificar se os componentes do equipamento estão disponíveis.
 * Retorna um array com os erros (se houver) ou vazio se estiver tudo OK.
 */
async function verificarEstoque(equipamentoId: string): Promise<string[]> {
  const errors: string[] = [];
  // Busca os componentes necessários para o equipamento
  const componentesNecessarios = await prisma.equipmentComponent.findMany({
    where: { equipamentoId },
    include: { componente: true }
  });

  for (const ec of componentesNecessarios) {
    const componente = ec.componente;
    if (componente.quantidadeDisponivel < ec.quantidadeNecessaria) {
      errors.push(`Componente ${componente.nome} possui apenas ${componente.quantidadeDisponivel} unidades (necessário ${ec.quantidadeNecessaria}).`);
    }
  }

  return errors;
}

/**
 * Função auxiliar para atualizar o estoque: deduz as quantidades necessárias dos componentes.
 */
async function atualizarEstoque(equipamentoId: string): Promise<void> {
  const componentesNecessarios = await prisma.equipmentComponent.findMany({
    where: { equipamentoId },
    include: { componente: true }
  });

  for (const ec of componentesNecessarios) {
    await prisma.componente.update({
      where: { id: ec.componente.id },
      data: { quantidadeDisponivel: ec.componente.quantidadeDisponivel - ec.quantidadeNecessaria }
    });
  }
}

/**
 * Função auxiliar para atribuir um técnico disponível.
 * Pode-se filtrar por especialidade (por exemplo, se o equipamento exigir um técnico com determinada especialidade).
 * Neste exemplo, simplesmente busca o primeiro técnico com status "Disponivel".
 */
async function atribuirTecnico(): Promise<{ tecnicoId: string } | null> {
  const tecnico = await prisma.tecnico.findFirst({
    where: { status: "available" }
  });

  if (!tecnico) return null;

  // Atualiza o status do técnico para "Ocupado"
  await prisma.tecnico.update({
    where: { id: tecnico.id },
    data: { status: "unavailable" }
  });

  return { tecnicoId: tecnico.id };
}

/**
 * Cria uma nova solicitação aplicando as regras de negócio:
 * - Recebe: solicitanteId, descricao, equipamentoId (para consulta dos componentes)
 * - Verifica o estoque dos componentes necessários
 * - Se todos os componentes estiverem disponíveis:
 *     - Atualiza o estoque
 *     - Atribui um técnico (se disponível)
 *     - Cria a solicitação com status "Em Progresso" e registra a atribuição
 * - Se não houver estoque suficiente:
 *     - Cria a solicitação com status "Pendente"
 *     - (Opcional) Aciona o departamento de compras (neste exemplo, apenas gera um log)
 */
export const createSolicitacao = async (req: Request, res: Response): Promise<void> => {
  const { solicitanteId, descricao, equipamentoId } = req.body;

  if (!solicitanteId || !descricao || !equipamentoId) {
    res.status(400).json({ error: 'Falta solicitanteId, descricao ou equipamentoId.' });
    return;
  }

  try {
    // Verifica se o equipamento existe
    const equipamento = await prisma.equipamento.findUnique({
      where: { id: equipamentoId }
    });
    if (!equipamento) {
      res.status(404).json({ error: 'Equipamento não encontrado.' });
      return;
    }

    // Verifica a disponibilidade dos componentes
    const errosEstoque = await verificarEstoque(equipamentoId);

    let statusSolicitacao = "pending";
    let atribuicaoTecnico = null;

    if (errosEstoque.length === 0) {
      // Componentes disponíveis: atualiza o estoque
      await atualizarEstoque(equipamentoId);

      // Tenta atribuir um técnico disponível
      const atribuicao = await atribuirTecnico();
      if (atribuicao) {
        statusSolicitacao = "progress";
        atribuicaoTecnico = atribuicao;
      }
    } else {
      // Se componentes não estiverem disponíveis, mantém status como "Pendente"
      console.log("Estoque insuficiente para os componentes: ", errosEstoque);
    }

    // Cria a solicitação
    const newSolicitacao = await prisma.solicitation.create({
      data: {
        solicitanteId: solicitanteId,
        descricao,
        status: statusSolicitacao,
        equipamentoId
      }
    });

    // Se um técnico foi atribuído, cria o registro na tabela de atribuições
    if (atribuicaoTecnico) {
      await prisma.atribuicaoTecnico.create({
        data: {
          solicitacaoId: newSolicitacao.id,
          tecnicoId: atribuicaoTecnico.tecnicoId
        }
      });
    }

    res.status(201).json({
      solicitacao: newSolicitacao,
      mensagem: errosEstoque.length === 0
        ? "Solicitação criada e em progresso."
        : "Solicitação criada em estado Pendente devido à falta de componentes.",
      errosEstoque: errosEstoque.length > 0 ? errosEstoque : undefined
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar solicitação.' });
  }
};
/**
 * Os demais endpoints para obter, atualizar (incluindo updateSolicitacaoStatus) e excluir
 * permanecem similares aos exemplos anteriores.
 */
export const getSolicitacoes = async (req: Request, res: Response): Promise<void> => {
  try {
    const solicitacoes = await prisma.solicitation.findMany({
      include: { usuario: true }
    });
    res.json(solicitacoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar solicitações.' });
  }
};

export const getSolicitacaoById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    
    const solicitacao = await prisma.solicitation.findUnique({
      where: { id },
      include: { usuario: true }
    });
    if (solicitacao) res.json(solicitacao);
    else res.status(404).json({ error: 'Solicitação não encontrada.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar solicitação.' });
  }
};
export const getSolicitacaoByUserId = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const solicitacao = await prisma.solicitation.findMany({
      where: { solicitanteId: id },
      include: { usuario: true }
    });
    if (solicitacao) res.json(solicitacao);
    else res.status(404).json({ error: 'Solicitação não encontrada.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar solicitação.' });
  }
};

export const updateSolicitacao = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { descricao, status } = req.body;
  try {
    const updatedSolicitacao = await prisma.solicitation.update({
      where: { id: id },
      data: { descricao, status }
    });
    res.json(updatedSolicitacao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar solicitação.' });
  }
};

export const updateSolicitacaoStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    // Se o status for atualizado para "Concluída", pode-se simular a geração de um comprovante.
    if (status === "completed") {
      console.log(`Gerando comprovante de entrega para solicitação ${id}...`);
      // Aqui poderia ser invocado um serviço de geração de PDF ou similar.
    }
    const updatedSolicitacao = await prisma.solicitation.update({
      where: { id: id },
      data: { status }
    });
    res.json(updatedSolicitacao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar status da solicitação.' });
  }
};

export const deleteSolicitacao = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.solicitation.delete({ where: { id: id } });
    res.json({ message: 'Solicitação removida com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover solicitação.' });
  }
};
