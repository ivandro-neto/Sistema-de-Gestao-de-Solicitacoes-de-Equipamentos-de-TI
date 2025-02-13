import styles from "./css/styles.module.css";

type Notification = {
  type: "info" | "warn";
  title: string;
  message: string;
};

type NotificationsTableProps = {
  data: Notification[];
};

const NotificationsTable: React.FC<NotificationsTableProps> = ({ data }) => {
  return (
    <div className={styles.scrollable}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.headerCell}>Mensagem</th>
          </tr>
        </thead>
        <tbody>
          {data.map((notification, index) => (
            <tr key={index}>
             <td className={styles.cell}>{notification?.mensagem}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationsTable;
