//@ts-ignore
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./css/style.module.css";
import Layout from "../../Layout";
import { getSolicitacaoById, updateSolicitacaoStatus } from "../../../api/requests";
import type { Request } from "../../../utils/Model";

const StatusUpdate: React.FC = () => {
  const { id } = useParams<{id : string}>();
  const navigate = useNavigate();
  const [request, setRequest] = useState<Request | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const data: Request = await getSolicitacaoById(id || "");
        setRequest(data);
        setNewStatus(data.status);
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar detalhes da solicitação.");
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSolicitacaoStatus(id || "", newStatus);
      navigate("/tech/panel");
    } catch (err) {
      console.error(err);
      setError("Erro ao atualizar o status.");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className={styles.loading}>Carregando detalhes...</div>
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
        <h2 className={styles.title}>Atualização de Status</h2>
        <div className={styles.details}>
          <p><strong>ID:</strong> {request.id}</p>
          <p><strong>Descrição:</strong> {request.descricao}</p>
          <p><strong>Status Atual:</strong> {request.status}</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="status">Novo Status:</label>
          <select
            id="status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="pending">Pendente</option>
            <option value="progress">Em Progresso</option>
            <option value="completed">Concluída</option>
            <option value="cancelled">Cancelada</option>
          </select>
          <div className={styles.actions}>
            <button type="submit" className={styles.submitButton}>Atualizar</button>
            <button type="button" onClick={() => navigate(-1)} className={styles.cancelButton}>Cancelar</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default StatusUpdate;
