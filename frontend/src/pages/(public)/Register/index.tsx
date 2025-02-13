import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/styles.module.css";
import { register } from "../../../api/user";
import { Roles } from "../../../utils/Roles";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const user = await register(username, email, password, departamento, role);
      if (user) {
        setSuccess("Registration successful.");
        navigate("/login");
      } else {
        setError("Error creating user!");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed.");
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
          <div className={styles.inputGroup}>
            <label className={styles.label}>Departamento</label>
            <input
              type="text"
              placeholder="Seu Departamento"
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Selecione seu Cargo</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={styles.input}
              required
            >
              <option value="">Selecione um cargo</option>
              <option value="user">Usuário</option>
              <option value="admin">Administrador</option>
              <option value="comer">Comercial</option>
              <option value="tech">Técnico</option>
            </select>
          </div>
          <button type="submit" className={styles.button}>
            Registrar
          </button>
        </form>
        <p className={styles.loginLink}>
          Já possui uma conta?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className={styles.link}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
