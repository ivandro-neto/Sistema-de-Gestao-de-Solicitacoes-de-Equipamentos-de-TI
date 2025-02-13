import { memo, useEffect, useState, useMemo } from "react";
import Layout from "../Layout";
import styles from "./css/styles.module.css";
import NotificationsTable from "../../components/NotificationTable";
import { getNotificacoes } from "../../api/notifications";

const InboxPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Usa useMemo para evitar recriação do objeto user
  const user = useMemo(() => {
    const jsonData = localStorage.getItem("session");
    return jsonData ? JSON.parse(jsonData) : null;
  }, []);

  // Busca todas as notificações e filtra as destinadas ao usuário atual
  const fetchNotifications = async () => {
    try {
      const data = await getNotificacoes();
      // Filtra notificações cujo usuárioId corresponde ao id do usuário
      const userNotifications = data.filter(
        (notif: any) => notif.usuarioId === user?.id
      );
      return userNotifications;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadNotifications = async () => {
      setLoading(true);
      const notificationsData = await fetchNotifications();
      if (notificationsData.length === 0) {
        setError("No notifications available.");
      } else {
        setError(null);
      }
      setNotifications(notificationsData);
      setLoading(false);
    };

    loadNotifications();
  }, []); // useEffect roda apenas uma vez ao montar o componente

  if (loading) {
    return (
      <Layout>
        <div className={styles.page}>
          <h1 className={styles.title}>Notificações</h1>
          <p>Loading notifications...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className={styles.page}>
          <h1 className={styles.title}>Notificações</h1>
          <p>{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.page}>
        <h1 className={styles.title}>Notificações</h1>
        <NotificationsTable data={notifications} />
      </div>
    </Layout>
  );
};

export default memo(InboxPage);
