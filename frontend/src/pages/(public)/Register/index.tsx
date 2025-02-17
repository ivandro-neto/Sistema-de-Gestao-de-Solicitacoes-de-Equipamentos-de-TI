import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/styles.module.css";
import { register } from "../../../api/user";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const user = await register(username, email, password, '---', "user", "");
      if (user) {
        setSuccess("Registration successful.");
        navigate("/login");
      } else {
        setError("Error creating user!");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed.");
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.registerCard}>
        <h2 className={styles.title}>Criar Conta</h2>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <form onSubmit={handleRegister} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Username</label>
            <input
              name="name"
              type="text"
              placeholder="Seu Nome"
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
              placeholder="Seu Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Senha</label>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Confirmar Senha</label>
            <input
              type="password"
              placeholder="Confirme a Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          
          <button type="submit" className={styles.button}>
            {loading ? "Processando..." : "Registrar"}
          </button>
        </form>
        <p className={styles.loginLink}>
          Já possui uma conta?{" "}
          <a
            href="/login"            
            className={styles.link}
          >
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
