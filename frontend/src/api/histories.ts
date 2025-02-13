import axios from "axios";
import { API_URL_HISTORY } from "./base";

export const getHistoricos = async () => {
  const response = await axios.get(`${API_URL_HISTORY}/`);
  return response.data;
};

export const getHistoricoById = async (id: string) => {
  const response = await axios.get(`${API_URL_HISTORY}/${id}`);
  return response.data;
};

export const createHistorico = async (data: { solicitacaoId: string; statusAnterior: string; statusNovo: string }) => {
  const response = await axios.post(`${API_URL_HISTORY}/`, data);
  return response.data;
};

export const deleteHistorico = async (id: string) => {
  const response = await axios.delete(`${API_URL_HISTORY}/${id}`);
  return response.data;
};
