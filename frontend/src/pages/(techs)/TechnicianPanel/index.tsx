//@ts-ignore
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/style.module.css";
import Layout from "../../Layout";
import { getAtribuicaoByUserId } from "../../../api/assigns";
import type { AssignedRequest } from "../../../utils/Model"; // Exemplo de interface AssignedRequest
import { Loading } from "../../../components/LoadingScreen";

const TechnicianPanel: React.FC = () => {
  const [assignments, setAssignments] = useState<AssignedRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const sessionData = localStorage.getItem("session");
        const session = sessionData ? JSON.parse(sessionData) : null;
        if (!session || !session.id) {
          setError("Sessão inválida. Faça login novamente.");
          setLoading(false);
          return;
        }
        const data: AssignedRequest[] = await getAtribuicaoByUserId(session.id);
        setAssignments(data);
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar as solicitações atribuídas.");
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  const handleUpdateStatus = (requestId: string) => {
    // Redireciona para a tela de atualização de status usando o id da solicitação
    navigate(`/tech/status-update/${requestId}`);
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
        <h2 className={styles.title}>Painel de Técnico</h2>
        {assignments.length === 0 ? (
          <p className={styles.noData}>Nenhuma solicitação atribuída encontrada.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID Solicitação</th>
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
                    <button
                    type="button"
                      onClick={() => handleUpdateStatus(assignment?.solicitacao?.id || "")}
                      className={styles.updateButton}
                    >
                      Atualizar Status
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

export default TechnicianPanel;
