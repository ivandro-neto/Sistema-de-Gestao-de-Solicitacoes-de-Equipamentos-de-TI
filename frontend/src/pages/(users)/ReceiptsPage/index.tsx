import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import styles from "./css/styles.module.css";
import { getSolicitacoes } from "../../../api/requests";
import type { Request } from "../../../utils/Model";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Loading } from "../../../components/LoadingScreen";

const ReceiptsPage: React.FC = () => {
  const sessionData = localStorage.getItem("session");
  const session = sessionData ? JSON.parse(sessionData) : null;
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data: Request[] = await getSolicitacoes();
        // Filtra as solicitações concluídas
        const completedRequests = data.filter(
          (req) => req.status.toLowerCase() === "completed" && req.solicitanteId ===  session.id
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

    // Cabeçalho
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(52, 152, 219);
    doc.text("Comprovante de Entrega", 14, 20);

    // Linha separadora
    doc.setDrawColor(52, 152, 219);
    doc.setLineWidth(0.5);
    doc.line(14, 24, 196, 24);

    // Dados organizados em uma tabela
    const tableHead = [["Campo", "Valor"]];
    const tableBody = [
      ["ID da Solicitação", request.id],
      ["Data de Criação", new Date(request.createdAt).toLocaleDateString()],
      ["Descrição", request.descricao],
      ["Status", request.status],
    ];

    // @ts-ignore
    doc.autoTable({
      head: tableHead,
      body: tableBody,
      startY: 30,
      theme: "grid",
      headStyles: { fillColor: [52, 152, 219], textColor: 255 },
      styles: { fontSize: 12 }
    });

    // Rodapé
    doc.setFontSize(10);
    // @ts-ignore
    const finalY = doc.lastAutoTable.finalY || 280;
    doc.text("Obrigado por utilizar o TechEquip Request!", 14, finalY + 10);

    doc.save(`comprovante_${request.id}.pdf`);
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
