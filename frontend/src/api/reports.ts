import axios from "axios";
import { API_URL_REPORT } from "./base";
import { getSolicitacoes } from "./requests";
import { getComponentes } from "./components";
import { getAtribuicoes } from "./assigns";

export const getRelatorios = async () => {
  const response = await axios.get(`${API_URL_REPORT}/`);
  return response.data;
};

export const getRelatorioById = async (id: string) => {
  const response = await axios.get(`${API_URL_REPORT}/${id}`);
  return response.data;
};

export const createRelatorio = async (data: { tipoRelatorio: string; conteudo: string }) => {
  const response = await axios.post(`${API_URL_REPORT}/`, data);
  return response.data;
};

export const deleteRelatorio = async (id: string) => {
  const response = await axios.delete(`${API_URL_REPORT}/${id}`);
  return response.data;
};

export const generateRelatorioDesempenhoTecnicos = async () => {
  const assignments = await getAtribuicoes();
  const performance: { [techId: string]: { completed: number; progress: number; pending: number; total: number; name: string } } = {};
  assignments.forEach((assignment: any) => {
    const techId = assignment.tecnico.id;
    const techName = assignment.tecnico.usuario.nome;
    if (!performance[techId]) {
      performance[techId] = { completed: 0, progress: 0, pending: 0, total: 0, name: techName };
    }
    performance[techId].total += 1;
    const status = assignment.solicitacao.status.toLowerCase();
    if (status === "completed") performance[techId].completed += 1;
    else if (status === "progress") performance[techId].progress += 1;
    else if (status === "pending") performance[techId].pending += 1;
  });
  let conteudo = "Relatório de Desempenho dos Técnicos:\n";
  for (const techId in performance) {
    const perf = performance[techId];
    conteudo += `Técnico: ${perf.name} (ID: ${techId})\n`;
    conteudo += `Total de Atribuições: ${perf.total}\n`;
    conteudo += `Concluídas: ${perf.completed}\n`;
    conteudo += `Em Progresso: ${perf.progress}\n`;
    conteudo += `Pendentes: ${perf.pending}\n\n`;
  }
  const data = { tipoRelatorio: "Desempenho dos Técnicos", conteudo };
  const relatorio = await createRelatorio(data);
  return relatorio;
};

export const generateRelatorioEstoqueComponentes = async () => {
  const components = await getComponentes();
  let conteudo = "Relatório de Estoque de Componentes:\n";
  components.forEach((comp: any) => {
    conteudo += `Componente: ${comp.nome} (ID: ${comp.id})\n`;
    conteudo += `Qtd. Disponível: ${comp.quantidadeDisponivel} ${comp.unidadeMedida}\n\n`;
  });
  const data = { tipoRelatorio: "Estoque de Componentes", conteudo };
  const relatorio = await createRelatorio(data);
  return relatorio;
};

export const generateRelatorioSolicitacoes = async () => {
  const solicitacoes = await getSolicitacoes();
  const total = solicitacoes.length;
  const pendentes = solicitacoes.filter((s: any) => s.status.toLowerCase() === "pending").length;
  const progress = solicitacoes.filter((s: any) => s.status.toLowerCase() === "progress").length;
  const completed = solicitacoes.filter((s: any) => s.status.toLowerCase() === "completed").length;
  const cancelled = solicitacoes.filter((s: any) => s.status.toLowerCase() === "cancelled").length;
  const conteudo = `Relatório de Solicitações:
Total: ${total}
Pendentes: ${pendentes}
Em Progresso: ${progress}
Concluídas: ${completed}
Canceladas: ${cancelled}`;
  const data = { tipoRelatorio: "Solicitações", conteudo };
  const relatorio = await createRelatorio(data);
  return relatorio;
};
