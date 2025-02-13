import axios from "axios";
import { API_URL_COMPONENT } from "./base";

// Obtém todos os componentes
export const getComponentes = async () => {
  const response = await axios.get(`${API_URL_COMPONENT}/`);
  return response.data;
};

// Obtém um componente pelo ID
export const getComponenteById = async (id: string) => {
  const response = await axios.get(`${API_URL_COMPONENT}/${id}`);
  return response.data;
};

// Cria um novo componente
export const createComponente = async (data: {
  nome: string;
  descricao: string;
  quantidadeDisponivel: number;
  unidadeMedida: string;
}) => {
  const response = await axios.post(`${API_URL_COMPONENT}/`, data);
  return response.data;
};

// Atualiza um componente existente
export const updateComponente = async (id: string, data: {
  nome: string;
  descricao: string;
  quantidadeDisponivel: number;
  unidadeMedida: string;
}) => {
  const response = await axios.put(`${API_URL_COMPONENT}/${id}`, data);
  return response.data;
};

// Exclui um componente pelo ID
export const deleteComponente = async (id: string) => {
  const response = await axios.delete(`${API_URL_COMPONENT}/${id}`);
  return response.data;
};
