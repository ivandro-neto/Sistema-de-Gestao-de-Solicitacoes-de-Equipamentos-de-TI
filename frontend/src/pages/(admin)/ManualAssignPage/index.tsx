import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/styles.module.css";
import { createAtribuicao } from "../../../api/assigns";

const ManualAssignmentPage: React.FC = () => {
  const [solicitacaoId, setSolicitacaoId] = useState("");
  const [tecnicoId, setTecnicoId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const result = await createAtribuicao({ solicitacaoId, tecnicoId });
      if (result) {
        setSuccess("Atribuição criada com sucesso!");
      }
    } catch (err: any) {
      setError("Erro ao criar atribuição.");
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Atribuição Manual</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="solicitacaoId">ID da Solicitação:</label>
          <input
            type="text"
            id="solicitacaoId"
            value={solicitacaoId}
            onChange={(e) => setSolicitacaoId(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="tecnicoId">ID do Técnico:</label>
          <input
            type="text"
            id="tecnicoId"
            value={tecnicoId}
            onChange={(e) => setTecnicoId(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <button type="submit" className={styles.button}>
          Atribuir
        </button>
      </form>
      <button type="button" className={styles.linkButton} onClick={() => navigate('/admin/assigns')}>
        Ver todas as atribuições
      </button>
    </div>
  );
};

export default ManualAssignmentPage;
