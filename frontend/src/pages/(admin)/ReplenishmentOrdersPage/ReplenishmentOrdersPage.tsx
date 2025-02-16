import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import styles from "./css/styles.module.css";
import { getReplenishmentOrders, updateComponentStock } from "../../../api/replenishment";
import { Loading } from "../../../components/LoadingScreen";

const ReplenishmentOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchOrders = async () => {
    try {
      const data = await getReplenishmentOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
      setError("Erro ao buscar pedidos de reposição.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdate = async (componentId: string) => {
    const novaQuantidadeStr = prompt("Digite a nova quantidade disponível:");
    if (novaQuantidadeStr) {
      const novaQuantidade = parseInt(novaQuantidadeStr, 10);
      try {
        await updateComponentStock(componentId, { novaQuantidade });
        // Atualiza a lista localmente
        const updatedOrders = orders.map(order => {
          if (order.componenteId === componentId) {
            return { 
              ...order, 
              quantidadeDisponivel: novaQuantidade, 
              falta: order.quantidadeNecessaria - novaQuantidade 
            };
          }
          return order;
        });
        setOrders(updatedOrders);
      } catch (err) {
        console.error(err);
        alert("Erro ao atualizar o estoque.");
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <Loading/>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className={styles.error}>{error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h2 className={styles.title}>Pedidos de Reposição de Estoque</h2>
        {orders.length === 0 ? (
          <p className={styles.noData}>Nenhum pedido de reposição encontrado.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Componente</th>
                <th>Qtd. Necessária</th>
                <th>Qtd. Disponível</th>
                <th>Falta</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.equipmentComponentId}>
                  <td>{order.componenteNome}</td>
                  <td>{order.quantidadeNecessaria}</td>
                  <td>{order.quantidadeDisponivel}</td>
                  <td>{order.falta < 0? "OK" : order.falta}</td>
                  <td>
                    <button
                      onClick={() => handleUpdate(order.componenteId)}
                      className={styles.button}
                    >
                      Atualizar Estoque
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default ReplenishmentOrdersPage;
