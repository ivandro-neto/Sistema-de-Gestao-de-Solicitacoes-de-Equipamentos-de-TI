import { getAtribuicoes } from "./assigns";
import { getComponentes } from "./components";
import { getSolicitacoes } from "./requests";

export const getPerformanceMetrics = async () => {
  const assignments = await getAtribuicoes();
  const performance: { [techId: string]: { name: string; completed: number; progress: number; pending: number } } = {};
  assignments.forEach((assignment: any) => {
    const techId = assignment.tecnico.id;
    const techName = assignment.tecnico.usuario.nome;
    if (!performance[techId]) {
      performance[techId] = { name: techName, completed: 0, progress: 0, pending: 0 };
    }
    const status = assignment.solicitacao.status.toLowerCase();
    if (status === "completed") performance[techId].completed++;
    else if (status === "progress") performance[techId].progress++;
    else if (status === "pending") performance[techId].pending++;
  });
  const labels: string[] = [];
  const completed: number[] = [];
  const progress: number[] = [];
  const pending: number[] = [];
  for (const techId in performance) {
    labels.push(performance[techId].name);
    completed.push(performance[techId].completed);
    progress.push(performance[techId].progress);
    pending.push(performance[techId].pending);
  }
  return { labels, completed, progress, pending };
};

export const getInventoryMetrics = async () => {
  const components = await getComponentes();
  const labels = components.map((comp: any) => comp.nome);
  const quantities = components.map((comp: any) => comp.quantidadeDisponivel);
  return { labels, quantities };
};

export const getRequestsMetrics = async () => {
  const requests = await getSolicitacoes();
  const pendingCount = requests.filter((req: any) => req.status.toLowerCase() === "pending").length;
  const progressCount = requests.filter((req: any) => req.status.toLowerCase() === "progress").length;
  const completedCount = requests.filter((req: any) => req.status.toLowerCase() === "completed").length;
  const cancelledCount = requests.filter((req: any) => req.status.toLowerCase() === "cancelled").length;
  const labels = ["Pendentes", "Em Progresso", "Concluídas", "Canceladas"];
  const counts = [pendingCount, progressCount, completedCount, cancelledCount];
  return { labels, counts };
};
