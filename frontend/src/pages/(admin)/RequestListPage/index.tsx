import React, { useState, useEffect } from "react";
import styles from "./css/style.module.css";
import Layout from "../../Layout";
import { getSolicitacoes } from "../../../api/requests";
import type { Request } from "../../../utils/Model"; // Interface atualizada

const RequestsList: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data: Request[] = await getSolicitacoes();
        setRequests(data);
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar solicitações.");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className={styles.loading}>Carregando solicitações...</div>
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
        <h2 className={styles.title}>Lista de Solicitações</h2>
        {requests.length === 0 ? (
          <p className={styles.noData}>Nenhuma solicitação encontrada.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Status</th>
                <th>Data de Criação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.descricao}</td>
                  <td>{req.status}</td>
                  <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                  <td>
                    <a href={`/request/${req.id}`} className={styles.detailLink}>
                      Ver Detalhes
                    </a>
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

export default RequestsList;
