import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./css/style.module.css";
import Layout from "../../Layout";
import { getSolicitacaoById, deleteSolicitacao } from "../../../api/requests";
import { RequestDetailsType } from "../../../utils/Model"; // Defina a interface RequestDetailsType conforme sua estrutura


const RequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<RequestDetailsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getSolicitacaoById(id);
        setRequest(data);
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar detalhes da solicitação.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Deseja realmente excluir esta solicitação?")) {
      try {
        await deleteSolicitacao(id);
        navigate("/requests");
      } catch (err) {
        console.error(err);
        setError("Erro ao excluir a solicitação.");
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className={styles.loading}>Carregando detalhes da solicitação...</div>
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

  if (!request) {
    return (
      <Layout>
        <div className={styles.error}>Solicitação não encontrada.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h2 className={styles.title}>Detalhes da Solicitação</h2>
        <div className={styles.details}>
          <p><strong>ID:</strong> {request.id}</p>
          <p><strong>Status:</strong> {request.status}</p>
          <p><strong>Data:</strong> {new Date(request.createdAt).toLocaleDateString()}</p>
          <p><strong>Descrição:</strong> {request.descricao}</p>
          {/* Adicione outros campos se necessário */}
        </div>
        <div className={styles.actions}>
          <button onClick={handleDelete} className={styles.deleteButton}>
            Excluir Solicitação
          </button>
          <button onClick={() => navigate(`/requests/${request.id}/edit`)} className={styles.editButton}>
            Editar Solicitação
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default RequestDetails;
