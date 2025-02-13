import React, { useState, useEffect } from "react";
import styles from "./css/style.module.css";
import Layout from "../../Layout";
import { getAtribuicaoByUserId } from "../../../api/assigns";
import { AssignedRequest } from "../../../utils/Model"; // Espera-se que AssignedRequest contenha a propriedade "solicitacao" do tipo Request

const RequestsListTechs: React.FC = () => {
  const [assignments, setAssignments] = useState<AssignedRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        // Recupera a sessão para obter o id do técnico
        const sessionData = localStorage.getItem("session");
        const session = sessionData ? JSON.parse(sessionData) : null;
        if (!session || !session.id) {
          setError("Sessão inválida. Faça login novamente.");
          setLoading(false);
          return;
        }
        // Busca as atribuições do técnico
        const data: AssignedRequest[] = await getAtribuicaoByUserId(session.id);
        setAssignments(data);
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar solicitações atribuídas.");
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className={styles.loading}>Carregando solicitações atribuídas...</div>
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
        <h2 className={styles.title}>Solicitações Atribuídas</h2>
        {assignments.length === 0 ? (
          <p className={styles.noData}>Nenhuma solicitação atribuída encontrada.</p>
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
              {assignments.map((assignment) => (
                <tr key={assignment.solicitacao.id}>
                  <td>{assignment.solicitacao.id}</td>
                  <td>{assignment.solicitacao.descricao}</td>
                  <td>{assignment.solicitacao.status}</td>
                  <td>{new Date(assignment.solicitacao.createdAt).toLocaleDateString()}</td>
                  <td>
                    <a
                      href={`/request/${assignment.solicitacao.id}`}
                      className={styles.detailLink}
                    >
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

export default RequestsListTechs;
