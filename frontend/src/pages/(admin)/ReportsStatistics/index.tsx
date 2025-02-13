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

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const ReportsStatistics: React.FC = () => {
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [inventoryData, setInventoryData] = useState<any>(null);
  const [requestsData, setRequestsData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [genMessage, setGenMessage] = useState<string>("");



  const fetchMetrics = async () => {
    try {
      // Agora chamamos as funções de métricas reais
      const perf = await getPerformanceMetrics();
      const inv = await getInventoryMetrics();
      const reqs = await getRequestsMetrics();
      console.log("Performance metrics:", perf);
      console.log("Inventory metrics:", inv);
      console.log("Requests metrics:", reqs);
      setPerformanceData({
        labels: perf.labels, // Ex: ["Técnico A", "Técnico B", "Técnico C"]
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
        labels: inv.labels, // Ex: ["RAM", "SSD", "Processador", "Placa Mãe", "Fonte"]
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
        labels: reqs.labels, // Ex: ["Pendentes", "Em Progresso", "Concluídas", "Canceladas"]
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
        await Promise.all([ fetchMetrics()]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);


  

  const generatePDF = (title: string, content: string, filename: string) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(title, 14, 22);
    doc.setFontSize(12);
    doc.text(`Data: ${new Date().toLocaleDateString()}`, 14, 30);
    const lines = doc.splitTextToSize(content, 180);
    doc.text(lines, 14, 40);
    doc.save(filename);
  };

  const handleGeneratePerformance = async () => {
    try {
      setGenMessage("Gerando relatório de desempenho dos técnicos em PDF...");
      const relatorio = await generateRelatorioDesempenhoTecnicos();
      generatePDF(
        "Relatório de Desempenho dos Técnicos",
        relatorio.conteudo,
        "Relatorio_Desempenho_Tecnicos.pdf"
      );
      setGenMessage("Relatório de desempenho gerado com sucesso.");
    } catch (err) {
      setGenMessage("Erro ao gerar relatório de desempenho.");
    }
  };

  const handleGenerateInventory = async () => {
    try {
      setGenMessage("Gerando relatório de estoque de componentes em PDF...");
      const relatorio = await generateRelatorioEstoqueComponentes();
      generatePDF(
        "Relatório de Estoque de Componentes",
        relatorio.conteudo,
        "Relatorio_Estoque_Componentes.pdf"
      );
      setGenMessage("Relatório de estoque gerado com sucesso.");
    } catch (err) {
      setGenMessage("Erro ao gerar relatório de estoque.");
    }
  };

  const handleGenerateRequests = async () => {
    try {
      setGenMessage("Gerando relatório de solicitações em PDF...");
      const relatorio = await generateRelatorioSolicitacoes();
      generatePDF(
        "Relatório de Solicitações",
        relatorio.conteudo,
        "Relatorio_Solicitacoes.pdf"
      );
      setGenMessage("Relatório de solicitações gerado com sucesso.");
      
    } catch (err) {
      setGenMessage("Erro ao gerar relatório de solicitações.");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className={styles.loading}>Carregando relatórios e métricas...</div>
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
