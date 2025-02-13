import axios from "axios";
import { API_URL_NOTIFICATION } from "./base";

export const getNotificacoes = async () => {
  const response = await axios.get(`${API_URL_NOTIFICATION}/`);
  return response.data;
};

export const getNotificacaoById = async (id: string) => {
  const response = await axios.get(`${API_URL_NOTIFICATION}/${id}`);
  return response.data;
};

export const createNotificacao = async (data: { usuarioId: string; destinatario: string; mensagem: string }) => {
  const response = await axios.post(`${API_URL_NOTIFICATION}/`, data);
  return response.data;
};

export const updateNotificacao = async (id: string, data: { mensagem?: string; lida?: boolean; destinatario?: string }) => {
  const response = await axios.put(`${API_URL_NOTIFICATION}/${id}`, data);
  return response.data;
};

export const deleteNotificacao = async (id: string) => {
  const response = await axios.delete(`${API_URL_NOTIFICATION}/${id}`);
  return response.data;
};

export const sendNotificacoesPorTipo = async (data: { tipoUsuario: number; mensagem: string }) => {
  const response = await axios.post(`${API_URL_NOTIFICATION}/enviar`, data);
  return response.data;
};
