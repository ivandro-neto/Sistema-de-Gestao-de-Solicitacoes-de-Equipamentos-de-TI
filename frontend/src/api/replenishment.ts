import axios from "axios";
import { API_URL_REP } from "./base";

// Obtém os pedidos de reposição (componentes que precisam de reposição)
export const getReplenishmentOrders = async () => {
  const response = await axios.get(`${API_URL_REP}/`);
  return response.data;
};

// Atualiza a quantidade disponível de um componente
export const updateComponentStock = async (componentId: string, data: { novaQuantidade: number }) => {
  const response = await axios.patch(`${API_URL_REP}/${componentId}`, data);
  return response.data;
};
