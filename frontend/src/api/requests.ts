import axios from "axios";
import { API_URL_REQUEST } from "./base";
import { createHistorico } from "./histories";

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
export const createSolicitacao = async (data: { solicitanteId: string; descricao: string; equipamentoId: string; }) => {
  const response = await axios.post(`${API_URL_REQUEST}/`, data);
  return response.data;
};

// Atualiza uma solicitação (exceto o status)
export const updateSolicitacao = async (id: string, data: { descricao?: string; status?: string; }) => {
  const response = await axios.put(`${API_URL_REQUEST}/${id}`, data);
  return response.data;
};

// Atualiza somente o status da solicitação
export const updateSolicitacaoStatus = async (id: string, status: string) => {
  const response = await axios.patch(`${API_URL_REQUEST}/${id}/status`, { status });
  return response.data;
};

// Atualiza o status e gera o histórico automaticamente
export const updateSolicitacaoStatusWithHistory = async (id: string, newStatus: string) => {
  const currentRequest = await getSolicitacaoById(id);
  const oldStatus = currentRequest.status;
  const updated = await updateSolicitacaoStatus(id, newStatus);
  await createHistorico({
    solicitacaoId: id,
    statusAnterior: oldStatus,
    statusNovo: newStatus,
  });
  return updated;
};

// Exclui uma solicitação
export const deleteSolicitacao = async (id: string) => {
  const response = await axios.delete(`${API_URL_REQUEST}/${id}`);
  return response.data;
};
