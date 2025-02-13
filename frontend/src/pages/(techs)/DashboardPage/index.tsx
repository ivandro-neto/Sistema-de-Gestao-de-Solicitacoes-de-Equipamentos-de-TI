import React, { useState, useEffect } from "react";
import styles from "./css/style.module.css";
import Layout from "../../Layout";
import { getTotalsAssignments } from "../../../api/dashboard";

interface DashboardMetrics {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
}

const DashboardTechnician: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const sessionData = localStorage.getItem("session");
  const session = sessionData ? JSON.parse(sessionData) : null;
  useEffect(() => {
    const fetchMetrics = async () => {
      const data = await getTotalsAssignments(session.id);
      const metricsData: DashboardMetrics = {
        total: data.totalAssigned,
        pending: data.totalPendings,
        inProgress: data.totalProgress,
        completed: data.totalCompleted,
      };
      setMetrics(metricsData);
    };

    fetchMetrics();
  }, []);

  if (!metrics) {
    return (
      <Layout>
        <div className={styles.loading}>Carregando...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h2 className={styles.title}>Dashboard - Técnico</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Total de Atribuições</h3>
            <p>{metrics.total}</p>
          </div>
          <div className={styles.card}>
            <h3>Atribuições Pendentes</h3>
            <p>{metrics.pending}</p>
          </div>
          <div className={styles.card}>
            <h3>Atribuições em Andamento</h3>
            <p>{metrics.inProgress}</p>
          </div>
          <div className={styles.card}>
            <h3>Atribuições concluídas</h3>
            <p>{metrics.completed}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardTechnician;
