import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import styles from "./css/styles.module.css";
import { getSolicitacoes } from "../../../api/requests";
import type { Request } from "../../../utils/Model";
import { jsPDF } from "jspdf";

const ReceiptsPage: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data: Request[] = await getSolicitacoes();
        // Filtra as solicitações concluídas
        const completedRequests = data.filter(
          (req) => req.status.toLowerCase() === "completed"
        );
        setRequests(completedRequests);
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar solicitações.");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const generateReceiptPDF = (request: Request) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Comprovante de Entrega", 14, 22);
    doc.setFontSize(12);
    doc.text(`ID da Solicitação: ${request.id}`, 14, 35);
    doc.text(`Data de Criação: ${new Date(request.createdAt).toLocaleDateString()}`, 14, 45);
    doc.text(`Descrição: ${request.descricao}`, 14, 55);
    doc.text(`Status: ${request.status}`, 14, 65);
    doc.text("Obrigado por utilizar o TechEquip Request!", 14, 85);
    doc.save(`comprovante_${request.id}.pdf`);
  };

  if (loading) {
    return (
      <Layout>
        <div className={styles.loading}>Carregando comprovantes...</div>
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
        <h2 className={styles.title}>Gerar Comprovante de Entrega</h2>
        {requests.length === 0 ? (
          <p className={styles.noData}>Nenhuma solicitação concluída encontrada.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Data de Criação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.descricao}</td>
                  <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => generateReceiptPDF(req)}
                      className={styles.button}
                    >
                      Gerar Comprovante
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

export default ReceiptsPage;
