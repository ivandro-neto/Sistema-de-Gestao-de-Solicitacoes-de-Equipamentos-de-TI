import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import styles from "./css/style.module.css";
import { getRelatorios } from "../../../api/reports";
import { Report } from "../../../utils/Model";
import { Link } from "react-router-dom";

const ReportsList: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data: Report[] = await getRelatorios();
        setReports(data);
      } catch (err) {
        setError("Erro ao buscar relatórios.");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className={styles.loading}>Carregando relatórios...</div>
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
        <h2 className={styles.title}>Relatórios Disponíveis</h2>
        {reports.length === 0 ? (
          <p className={styles.noData}>Nenhum relatório disponível.</p>
        ) : (
          <div className={styles.reportsList}>
            {reports.map((report) => (
              <div key={report.id} className={styles.reportCard}>
                <h3>{report.tipoRelatorio}</h3>
                <p>{new Date(report.dataGeracao).toLocaleDateString()}</p>
                <Link to={`/report/${report.id}`} className={styles.detailsLink}>
                  Ver Detalhes
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReportsList;
