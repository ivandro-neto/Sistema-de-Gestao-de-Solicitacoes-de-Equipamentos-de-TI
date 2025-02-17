import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Roles } from "../../../utils/Roles";
import styles from "./css/styles.module.css";
import { login } from "../../../api/user";
import RegisterPage from "../Register"; // O componente RegisterPage deve aceitar uma prop onBackToLogin

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      const sessionData = localStorage.getItem("session");
      const session = sessionData ? JSON.parse(sessionData) : null;
      if (!session) {
        setError("Login failed. Check your credentials.");
        return;
      }
      switch (session.type) {
        case Roles.user:
          navigate("/user/dashboard");
          break;
        case Roles.comer:
          navigate("/comer/replenishment");
          break;
        case Roles.tech:
          navigate("/tech/dashboard");
          break;
        case Roles.admin:
          navigate("/admin/dashboard");
          break;
        default:
          setError("Tipo de usuário desconhecido.");
      }
    } catch (err) {
      setError("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => console.log(isLogin), []);
  return (
    <div className={styles.pageContainer}>
      <section className={styles.formSection}>
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
              {loading ? "Processando..." : "Entrar"}
            </button>
          </form>
          <p className={styles.registerText}>
            Não possui conta?{" "}
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={styles.registerLink}
            >
              Criar uma conta
            </button>
          </p>
        </div>

        <RegisterPage onBackToLogin={() => setIsLogin(true)} />
      </section>
      <section
        className={`${styles.contentSection} ${isLogin ? styles.right : styles.left}`}
      >
        <a href="/" className={styles.logoTitle}>
        <img className={styles.logo} src="../../public/icons/laptop-medical-solid.svg" alt="Logo" loading="lazy" />
        TechEquip Request
        </a>

        <h1>
          {isLogin ? "Bem-vindo de volta!" : "Inicie sua Jornada Tecnológica!"}
        </h1>
        <p>
          {isLogin
            ? "Estamos felizes em vê-lo novamente. Entre com suas credenciais e continue aproveitando uma experiência única na gestão de equipamentos de TI."
            : "Crie sua conta agora e descubra como o TechEquip Request pode transformar a montagem de equipamentos, proporcionando agilidade, segurança e performance para sua empresa."}
        </p>

        <img
          src={
            isLogin
              ? "../../../public/login-image.png"
              : "../../../public/sign-image.png"
          }
          alt="image"
        />
      </section>
    </div>
  );
};

export default LoginPage;
