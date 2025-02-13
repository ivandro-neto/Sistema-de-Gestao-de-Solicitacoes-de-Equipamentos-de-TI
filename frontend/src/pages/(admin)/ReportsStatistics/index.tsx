import React, { useState, useEffect, useRef } from "react";
import Layout from "../../Layout";
import styles from "./css/style.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { getRelatorioById } from "../../../api/reports";
import { Report } from "../../../utils/Model";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
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

const ReportDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data: Report = await getRelatorioById(id!);
        setReport(data);
      } catch (err) {
        setError("Erro ao buscar relatório.");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  const exportToPDF = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`relatorio_${id}.pdf`);
  };

  // Renderiza gráfico conforme o tipo do relatório
  let chartSection = null;
  if (report) {
    const tipo = report.tipoRelatorio.toLowerCase();
    if (tipo.includes("desempenho")) {
      const performanceData = {
        labels: ["Técnico 1", "Técnico 2", "Técnico 3"],
        datasets: [
          {
            label: "Concluídas",
            data: [5, 3, 7],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
          {
            label: "Em Progresso",
            data: [2, 4, 1],
            backgroundColor: "rgba(255, 206, 86, 0.6)",
          },
          {
            label: "Pendentes",
            data: [1, 2, 0],
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
        ],
      };
      chartSection = <Bar data={performanceData} />;
    } else if (tipo.includes("estoque")) {
      const inventoryData = {
        labels: ["RAM", "SSD", "Processador", "Placa Mãe", "Fonte"],
        datasets: [
          {
            label: "Qtd. Disponível",
            data: [100, 80, 50, 40, 60],
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(153, 102, 255, 0.6)",
            ],
          },
        ],
      };
      chartSection = <Pie data={inventoryData} />;
    } else if (tipo.includes("solicitac") || tipo.includes("solicitaç")) {
      const requestsData = {
        labels: ["Pendentes", "Em Progresso", "Concluídas", "Canceladas"],
        datasets: [
          {
            label: "Solicitações",
            data: [10, 5, 8, 2],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(201, 203, 207, 0.6)",
            ],
          },
        ],
      };
      chartSection = <Bar data={requestsData} />;
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className={styles.loading}>Carregando relatório...</div>
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

  if (!report) {
    return (
      <Layout>
        <div className={styles.error}>Relatório não encontrado.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container} ref={reportRef}>
        <h2 className={styles.title}>{report.tipoRelatorio}</h2>
        <p className={styles.date}>
          {new Date(report.dataGeracao).toLocaleDateString()}
        </p>
        <div className={styles.content}>
          <pre>{report.conteudo}</pre>
        </div>
        {chartSection && (
          <div className={styles.chartSection}>
            <h3>Visualização Gráfica</h3>
            {chartSection}
          </div>
        )}
      </div>
      <div className={styles.actions}>
        <button onClick={exportToPDF} className={styles.exportButton}>
          Exportar para PDF
        </button>
      </div>
    </Layout>
  );
};

export default ReportDetail;
