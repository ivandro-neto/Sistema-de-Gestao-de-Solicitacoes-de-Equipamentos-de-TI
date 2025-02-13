import axios from "axios";
import { API_URL_ASSIGN} from "./base";

// Obtém todas as atribuições
export const getAtribuicoes = async () => {
  const response = await axios.get(`${API_URL_ASSIGN}/`);
  return response.data;
};

// Obtém uma atribuição pelo ID
export const getAtribuicaoById = async (id: string) => {
  const response = await axios.get(`${API_URL_ASSIGN}/${id}`);
  return response.data;
};

// Obtém as atribuições de um técnico (por ID do usuário)
export const getAtribuicaoByUserId = async (id: string) => {
  const response = await axios.get(`${API_URL_ASSIGN}/users/${id}`);
  return response.data;
};

// Cria uma nova atribuição (necessita de solicitacaoId e tecnicoId)
export const createAtribuicao = async (data: { solicitacaoId: string; tecnicoId: string }) => {
  const response = await axios.post(`${API_URL_ASSIGN}/`, data);
  return response.data;
};

// Exclui uma atribuição pelo ID
export const deleteAtribuicao = async (id: string) => {
  const response = await axios.delete(`${API_URL_ASSIGN}/${id}`);
  return response.data;
};
