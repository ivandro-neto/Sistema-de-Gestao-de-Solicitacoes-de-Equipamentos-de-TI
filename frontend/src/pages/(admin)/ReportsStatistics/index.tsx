import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import styles from "./css/style.module.css";
import { 
  generateRelatorioDesempenhoTecnicos, 
  generateRelatorioEstoqueComponentes, 
  generateRelatorioSolicitacoes 
} from "../../../api/reports";
import { getPerformanceMetrics, getInventoryMetrics, getRequestsMetrics } from "../../../api/reportMetrics";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Loading } from "../../../components/LoadingScreen";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const ReportsStatistics: React.FC = () => {
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [inventoryData, setInventoryData] = useState<any>(null);
  const [requestsData, setRequestsData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Função para gerar PDF com tabela
  const generatePDFTable = (title: string, content: string, filename: string) => {
    const doc = new jsPDF();

    // Cabeçalho do PDF
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(52, 152, 219);
    doc.text(title, 14, 20);

    // Linha separadora
    doc.setDrawColor(52, 152, 219);
    doc.setLineWidth(0.5);
    doc.line(14, 24, 196, 24);

    // Data
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Data: ${new Date().toLocaleDateString()}`, 14, 32);

    // Transforma o conteúdo em linhas para a tabela
    const rows = content.split("\n").map((line) => [line]);

    // Gera a tabela
    //@ts-ignore
    doc.autoTable({
      head: [["Detalhes"]],
      body: rows,
      startY: 40,
      theme: "grid",
      headStyles: { fillColor: [52, 152, 219], textColor: 255 },
      styles: { fontSize: 12 },
    });

    // Rodapé
    doc.setFontSize(10);
    //@ts-ignore
    const finalY = doc.lastAutoTable.finalY || 280;
    doc.text("TechEquip Request - Relatório Gerado Automaticamente", 14, finalY + 10);

    doc.save(filename);
  };

  const fetchMetrics = async () => {
    try {
      const perf = await getPerformanceMetrics();
      const inv = await getInventoryMetrics();
      const reqs = await getRequestsMetrics();

      setPerformanceData({
        labels: perf.labels,
        datasets: [
          {
            label: "Concluídas",
            data: perf.completed,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
          {
            label: "Em Progresso",
            data: perf.progress,
            backgroundColor: "rgba(255, 206, 86, 0.6)",
          },
          {
            label: "Pendentes",
            data: perf.pending,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
        ],
      });

      setInventoryData({
        labels: inv.labels,
        datasets: [
          {
            label: "Qtd. Disponível",
            data: inv.quantities,
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(153, 102, 255, 0.6)",
            ],
          },
        ],
      });

      setRequestsData({
        labels: reqs.labels,
        datasets: [
          {
            label: "Solicitações",
            data: reqs.counts,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(201, 203, 207, 0.6)",
            ],
          },
        ],
      });
    } catch (err) {
      console.error("Erro ao buscar métricas", err);
      setError("Erro ao buscar métricas.");
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        await fetchMetrics();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleGeneratePerformance = async () => {
    try {
      const relatorio = await generateRelatorioDesempenhoTecnicos();
      // Supondo que relatorio.conteudo seja uma string com quebras de linha
      generatePDFTable(
        "Relatório de Desempenho dos Técnicos",
        relatorio.conteudo,
        "Relatorio_Desempenho_Tecnicos.pdf"
      );
    } catch (err) {
      console.error("Erro ao gerar relatório de desempenho", err);
    }
  };

  const handleGenerateInventory = async () => {
    try {
      const relatorio = await generateRelatorioEstoqueComponentes();
      generatePDFTable(
        "Relatório de Estoque de Componentes",
        relatorio.conteudo,
        "Relatorio_Estoque_Componentes.pdf"
      );
    } catch (err) {
      console.error("Erro ao gerar relatório de estoque", err);
    }
  };

  const handleGenerateRequests = async () => {
    try {
      const relatorio = await generateRelatorioSolicitacoes();
      generatePDFTable(
        "Relatório de Solicitações",
        relatorio.conteudo,
        "Relatorio_Solicitacoes.pdf"
      );
    } catch (err) {
      console.error("Erro ao gerar relatório de solicitações", err);
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
        <h2 className={styles.title}>Relatórios e Estatísticas</h2>
        <div className={styles.buttonContainer}>
          <button type="button" onClick={handleGeneratePerformance}>
            Gerar Relatório de Desempenho dos Técnicos (PDF)
          </button>
          <button type="button" onClick={handleGenerateInventory}>
            Gerar Relatório de Estoque de Componentes (PDF)
          </button>
          <button type="button" onClick={handleGenerateRequests}>
            Gerar Relatório de Solicitações (PDF)
          </button>
        </div>
       
        <h3 className={styles.subtitle}>Gráficos Reais</h3>
        <table className={styles.chartTable}>
          <tbody>
            <tr>
              <td className={styles.chartCell}>
                <h4>Desempenho dos Técnicos</h4>
                {performanceData && <Bar data={performanceData} />}
              </td>
              <td className={styles.chartCell}>
                <h4>Estoque de Componentes</h4>
                {inventoryData && <Pie data={inventoryData} />}
              </td>
            </tr>
            <tr>
              <td colSpan={2} className={styles.chartCell}>
                <h4>Solicitações</h4>
                {requestsData && <Bar data={requestsData} />}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ReportsStatistics;
