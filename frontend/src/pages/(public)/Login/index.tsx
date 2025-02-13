import { useState } from "react";
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
     const sessionData = localStorage.getItem("session") 
     const session = sessionData ? JSON.parse(sessionData) :  null
      if(!session)
        setError("Login failed. Check your credentials.");
      
      if (Roles["user"] ===  session.type) {
        navigate("/user/dashboard");
      }
      if (Roles["comer"] ===  session.type) {
        navigate("/comercial");
      }
      if (Roles["tech"] ===  session.type) {
        navigate("/tech/dashboard");
      }
       if (Roles["admin"] ===  session.type) {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      setError("Login failed. Check your credentials."+ error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>

      <p className={styles.registerLink}>
        Criar uma nova conta?{" "}
        <button
          type="button"
          onClick={() => navigate("/register")}
          className={styles.link}
        >
          Register
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
