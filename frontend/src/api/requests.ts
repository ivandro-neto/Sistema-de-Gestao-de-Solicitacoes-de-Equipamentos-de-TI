import axios from "axios";
import { API_URL_REQUEST } from "./base";
import { createHistorico } from "./histories";
import { createNotificacao, sendNotificacoesPorTipo } from "./notifications";
import { Roles } from "../utils/Roles";

// Obtém todas as solicitações (para administradores)
export const getSolicitacoes = async () => {
  const response = await axios.get(`${API_URL_REQUEST}/`);
  return response.data;
};

// Obtém uma solicitação pelo ID
export const getSolicitacaoById = async (id: string) => {
  const response = await axios.get(`${API_URL_REQUEST}/${id}`);
  return response.data;
};

// Obtém as solicitações de um usuário específico (solicitante ou técnico)
export const getSolicitacaoByUserId = async (id: string) => {
  const response = await axios.get(`${API_URL_REQUEST}/users/${id}`);
  return response.data;
};

// Cria uma nova solicitação
// Envia uma notificação para um administrador (ou grupo de usuários) quando uma solicitação é criada
export const createSolicitacao = async (data: { solicitanteId: string; descricao: string; equipamentoId: string; }) => {
  const response = await axios.post(`${API_URL_REQUEST}/`, data);
  await sendNotificacoesPorTipo({ tipoUsuario: Roles.admin , mensagem: `Nova solicitação criada pelo usuário ${data.solicitanteId} e atribuida ao tecnico .`});
  
  await createNotificacao({
    usuarioId: response.data.atribuicoes.tecnicoId,
    destinatario: '', // assume que o objeto atualizado inclui o campo 'usuario' com 'email'
    mensagem: `A solicitação ${response.data.id} foi atribuida a si.`
  });
  return response.data;
};

// Atualiza uma solicitação (exceto o status)
export const updateSolicitacao = async (id: string, data: { descricao?: string; status?: string; }) => {
  const response = await axios.put(`${API_URL_REQUEST}/${id}`, data);
  const updatedRequest = response.data;
  await updateSolicitacaoStatusWithHistory(id, updatedRequest.status);
  await createNotificacao({
    usuarioId: updatedRequest.solicitanteId,
    destinatario: '', // assume que o objeto atualizado inclui o campo 'usuario' com 'email'
    mensagem: `Sua solicitação foi atualizada para o status "${updatedRequest.status}".`
  });
  await createNotificacao({
    usuarioId: updatedRequest.atribuicoes[0].tecnicoId,
    destinatario: '', // assume que o objeto atualizado inclui o campo 'usuario' com 'email'
    mensagem: `A solicitação ${updatedRequest.id} foi atualizada para o status "${updatedRequest.status}".`
  });
  return updatedRequest;
};

// Atualiza somente o status da solicitação
export const updateSolicitacaoStatus = async (id: string, status: string) => {
  const response = await axios.patch(`${API_URL_REQUEST}/${id}/status`, { status });
  await createNotificacao({
    usuarioId: response.data.solicitanteId,
    destinatario: '', // assume que o objeto atualizado inclui o campo 'usuario' com 'email'
    mensagem: `Sua solicitação foi atualizada para o status "${response.data.status}".`
  });
  await createNotificacao({
    usuarioId: response.data.atribuicoes[0].tecnicoId,
    destinatario: '', // assume que o objeto atualizado inclui o campo 'usuario' com 'email'
    mensagem: `A solicitação ${response.data.id} foi atualizada para o status "${response.data.status}".`
  });
  return response.data;
};

// Atualiza o status e gera o histórico automaticamente
// Envia uma notificação ao solicitante informando a alteração de status
export const updateSolicitacaoStatusWithHistory = async (id: string, newStatus: string) => {
  const currentRequest = await getSolicitacaoById(id);
  const oldStatus = currentRequest.status;
  const updated = await updateSolicitacaoStatus(id, newStatus);
  await createHistorico({
    solicitacaoId: id,
    statusAnterior: oldStatus,
    statusNovo: newStatus,
  });
  await createNotificacao({
    usuarioId: currentRequest.solicitanteId,
    destinatario: "", // Preencha com o e-mail do solicitante, se disponível
    mensagem: `O status da sua solicitação foi alterado de ${oldStatus} para ${newStatus}.`
  });
  return updated;
};

// "Exclui" uma solicitação (define o status como "cancelled")
// Envia uma notificação ao solicitante informando que a solicitação foi cancelada
export const deleteSolicitacao = async (id: string) => {
  const currentRequestOldStatus = await getSolicitacaoById(id);
  const response = await axios.patch(`${API_URL_REQUEST}/${id}/status`, { status: "cancelled" });
  const currentRequest = await getSolicitacaoById(id);
  await createHistorico({
    solicitacaoId: id,
    statusAnterior: currentRequestOldStatus.status,
    statusNovo: currentRequest.status,
  });
  await createNotificacao({
    usuarioId: currentRequest.solicitanteId,
    destinatario: "",
    mensagem: "Sua solicitação foi cancelada."
  });
  
  await createNotificacao({
    usuarioId: currentRequest.atribuicoes[0].tecnicoId,
    destinatario: "",
    mensagem: `A solicitação ${currentRequest.id} foi cancelada.`
  });

  return response.data;
};
