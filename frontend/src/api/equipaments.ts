import axios from "axios";
import { API_URL_EQUIPAMENT } from "./base";

// Obtém todos os equipamentos, incluindo os componentes de cada equipamento
export const getEquipamentos = async () => {
  const response = await axios.get(`${API_URL_EQUIPAMENT}/`);
  return response.data;
};

// Obtém um equipamento pelo ID, incluindo seus componentes
export const getEquipamentoById = async (id: string) => {
  const response = await axios.get(`${API_URL_EQUIPAMENT}/${id}`);
  return response.data;
};

// Cria um novo equipamento, enviando nome e descrição
export const createEquipamento = async (data: { nome: string; descricao: string }) => {
  const response = await axios.post(`${API_URL_EQUIPAMENT}/`, data);
  return response.data;
};

// Atualiza um equipamento existente pelo ID com os dados informados
export const updateEquipamento = async (id: string, data: { nome: string; descricao: string }) => {
  const response = await axios.put(`${API_URL_EQUIPAMENT}/${id}`, data);
  return response.data;
};

// Exclui um equipamento pelo ID
export const deleteEquipamento = async (id: string) => {
  const response = await axios.delete(`${API_URL_EQUIPAMENT}/${id}`);
  return response.data;
};
