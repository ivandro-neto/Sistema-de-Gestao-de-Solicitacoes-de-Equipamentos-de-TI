import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout";
import styles from "./css/styles.module.css";
import { deleteUser, getUserById, login, logout, updateUser } from "../../../api/user";
import { Roles } from "../../../utils/Roles";

const ProfileSettingsPage: React.FC = () => {
  // Recupera os dados da sessão do localStorage
  const sessionData = localStorage.getItem("session");
  const session = sessionData ? JSON.parse(sessionData) : null;
  const navigate = useNavigate();

  // Se não houver sessão, redireciona para o login
  useEffect(() => {
    if (!session || !session.id) {
      navigate("/login");
    }
  }, [session, navigate]);

  // Estados para armazenar os dados do usuário
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [password, setPassword] = useState(""); // Novo estado para senha
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState("");

  // Busca os dados do usuário ao montar o componente
  useEffect(() => {
    const fetchUser = async () => {
      if (session && session.id) {
        try {
          const userData = await getUserById(session.id);
          setUsername(userData.nome || "");
          setEmail(userData.email || "");
          setDepartamento(userData.departamento || "");
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      // Atualiza o perfil via API, incluindo senha
      const updatedUser = await updateUser(session.id, { 
        nome: username, 
        email, 
        departamento, 
        senha: password 
      });
      login(updatedUser.email, updatedUser.senha)
      const sessionData = localStorage.getItem("session");
      const s = sessionData ? JSON.parse(sessionData) : null;
      if (!s) {
        return;
      }
      if (Roles["user"] === s.type) {
        navigate("/user/profile");
      } else if (Roles["comer"] === s.type) {
        navigate("/comer/profile");
      } else if (Roles["tech"] === s.type) {
        navigate("/tech/profile");
      } else if (Roles["admin"] === s.type) {
        navigate("/admin/profile");
      }
      setMessage("Perfil atualizado com sucesso.");
    } catch (error) {
      console.error(error);
      setMessage("Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      // Atualiza o perfil via API, incluindo senha
      await deleteUser(session.id)
      logout();
      setMessage("Perfil deletado com sucesso.");
    } catch (error) {
      console.error(error);
      setMessage("Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h2 className={styles.title}>Configurações de Perfil</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Nome</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Atualizar senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Departamento</label>
            <input
              type="text"
              value={departamento}
              className={styles.input}
              disabled              
            />
          </div>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
          <button type="submit" className={`${styles.button} ${styles.red}`} disabled={loading}>
            {loading ? "Deletando a conta..." : "Deletar conta"}
          </button>
          {message && <p className={styles.message}>{message}</p>}
        </form>
      </div>
    </Layout>
  );
};

export default ProfileSettingsPage;
