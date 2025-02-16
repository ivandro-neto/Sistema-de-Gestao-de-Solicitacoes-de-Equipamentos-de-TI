import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import styles from "./css/styles.module.css";
import { getAtribuicoes, deleteAtribuicao } from "../../../api/assigns";
import { Loading } from "../../../components/LoadingScreen";

const AssignmentsListPage: React.FC = () => {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await getAtribuicoes();
        setAssignments(data);
      } catch (err) {
        setError("Erro ao buscar atribuições.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Deseja realmente excluir esta atribuição?")) {
      try {
        await deleteAtribuicao(id);
        setAssignments(assignments.filter((assign) => assign.id !== id));
      } catch (err) {
        setError("Erro ao excluir atribuição.");
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
        <h2 className={styles.title}>Lista de Atribuições</h2>
        {assignments.length === 0 ? (
          <p className={styles.noData}>Nenhuma atribuição encontrada.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>ID da Solicitação</th>
                <th>ID do Técnico</th>
                <th>Data da Atribuição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td>{assignment.id}</td>
                  <td>{assignment.solicitacaoId}</td>
                  <td>{assignment.tecnicoId}</td>
                  <td>{new Date(assignment.dataAtribuicao).toLocaleDateString()}</td>
                  <td>
                    <button type="button" onClick={() => handleDelete(assignment.id)} className={styles.deleteButton}>
                      Excluir
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

export default AssignmentsListPage;
