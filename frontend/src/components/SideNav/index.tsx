import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LinkButton } from "../Button";
import UserCard from "../UserCard";
import styles from "./css/styles.module.css";
import { Roles } from "../../utils/Roles";

const SideNav: React.FC = () => {
  const navigate = useNavigate();
  
  // Inicializa o estado do usuário corretamente
  const [user, setUser] = useState<any>(() => {
    const sessionData = localStorage.getItem("session");
    return sessionData ? JSON.parse(sessionData) : null;
  });

  // Atualiza o usuário periodicamente (a cada 3 segundos)
  useEffect(() => {
    const interval = setInterval(() => {
      const sessionData = localStorage.getItem("session");
      setUser(sessionData ? JSON.parse(sessionData) : null);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.appName}>
        <img src="/icons/laptop-medical-solid.svg" alt="Logo" loading="lazy" />
        <h1>TechEquip Request</h1>
      </div>
      <nav className={styles.navbar}>
        <ul className={styles.list}>
          {user && user.type === Roles.comer && (
            <li className={styles.items}>
              <LinkButton url="/comer/replenishment" content="Pedidos" />
            </li>
          )}
          {user && user.type === Roles.user && (
            <li className={styles.items}>
              <LinkButton url="/user/dashboard" content="Dashboard" />
            </li>
          )}
          {user && user.type === Roles.tech && (
            <li className={styles.items}>
              <LinkButton url="/tech/dashboard" content="Dashboard" />
            </li>
          )}
          {user && user.type === Roles.admin && (
            <li className={styles.items}>
              <LinkButton url="/admin/dashboard" content="Dashboard" />
            </li>
          )}
          <li className={styles.items}>
            <LinkButton url="/inbox" content="Notificações" />
          </li>
          {user && user.type === Roles.user && (
            <li className={styles.items}>
              <LinkButton url="/user/requests" content="Solicitações" />
            </li>
          )}
          {user && user.type === Roles.tech && (
            <li className={styles.items}>
              <LinkButton url="/tech/requests" content="Solicitações" />
            </li>
          )}
          {user && user.type === Roles.admin && (
            <li className={styles.items}>
              <LinkButton url="/admin/requests" content="Solicitações" />
            </li>
          )}
          {user && user.type === Roles.tech && (
            <li className={styles.items}>
              <LinkButton url="/tech/panel" content="Atribuições" />
            </li>
          )}
          {user && user.type === Roles.admin && (
            <li className={styles.items}>
              <LinkButton url="/admin/replenishment" content="Pedidos" />
            </li>
          )}
          {user && user.type === Roles.comer && (
            <li className={styles.items}>
              <LinkButton url="/comer/inventory" content="Estoque" />
            </li>
          )}
          {user && user.type === Roles.tech && (
            <li className={styles.items}>
              <LinkButton url="/tech/inventory" content="Estoque" />
            </li>
          )}
          {user && user.type === Roles.tech && (
            <li className={styles.items}>
              <LinkButton url="/tech/inventory/check" content="Equipamentos" />
            </li>
          )}
          {user && user.type === Roles.admin && (
            <li className={styles.items}>
              <LinkButton url="/admin/inventory/check" content="Equipamentos" />
            </li>
          )}
          {user && user.type === Roles.comer && (
            <li className={styles.items}>
              <LinkButton url="/comer/inventory/check" content="Equipamentos" />
            </li>
          )}
          {user && user.type === Roles.admin && (
            <li className={styles.items}>
              <LinkButton url="/admin/reports" content="Relatórios" />
            </li>
          )}
          {user && user.type === Roles.admin && (
            <li className={styles.items}>
              <LinkButton url="/admin/user/managment" content="Utilizadores" />
            </li>
          )}
          {user && user.type === Roles.admin && (
            <li className={styles.items}>
              <LinkButton url="/admin/profile" content="Perfil" />
            </li>
          )}
          {user && user.type === Roles.tech && (
            <li className={styles.items}>
              <LinkButton url="/tech/profile" content="Perfil" />
            </li>
          )}
          {user && user.type === Roles.comer && (
            <li className={styles.items}>
              <LinkButton url="/comer/profile" content="Perfil" />
            </li>
          )}
          {user && user.type === Roles.user && (
            <li className={styles.items}>
              <LinkButton url="/user/profile" content="Perfil" />
            </li>
          )}
        </ul>
        <div className={styles.user}>
          {user && <UserCard user={user} />}
        </div>
      </nav>
    </section>
  );
};

export default memo(SideNav);
