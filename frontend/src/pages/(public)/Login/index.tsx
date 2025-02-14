import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Roles } from "../../../utils/Roles";
import styles from "./css/styles.module.css";
import { login } from "../../../api/user";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      const sessionData = localStorage.getItem("session");
      const session = sessionData ? JSON.parse(sessionData) : null;
      if (!session) {
        setError("Login failed. Check your credentials.");
        return;
      }
      if (Roles["user"] === session.type) {
        navigate("/user/dashboard");
      } else if (Roles["comer"] === session.type) {
        navigate("/comercial");
      } else if (Roles["tech"] === session.type) {
        navigate("/tech/dashboard");
      } else if (Roles["admin"] === session.type) {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError("Login failed. Check your credentials.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>
            Entrar
          </button>
        </form>
        <p className={styles.registerText}>
          Não possui conta?{" "}
          <a
            href={"/register"}
            className={styles.registerLink}
          >
            Criar uma conta
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
