import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from './css/styles.module.css';
import { login, register } from "../../../api/user";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [roles, setRoles] = useState<string>("");
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
      const user = register(username, email, password, departamento, roles)

      if(user){
        setSuccess("Registration successful.");
        navigate("/login");
      }
      setError("Error trying creating a user!")
     
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.message || "Registration failed.");
    }
  };

  const handleRoleSelection = (role: string) => {
    setRoles(role);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleRegister} className={styles.form}>
        <h2>Register</h2>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <div className={styles.inputGroup}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Department</label>
          <input
            type="text"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.checkboxGroup}>
          <label>Select Roles:</label>
          <label>
            <input
              type="checkbox"
              value="user"
              checked={roles === "user"}
              onChange={() => handleRoleSelection("user")}
            />
            User
          </label>
          <label>
            <input
              type="checkbox"
              value="admin"
              checked={roles === "admin"}
              onChange={() => handleRoleSelection("admin")}
            />
            Admin
          </label>
          <label>
            <input
              type="checkbox"
              value="comer"
              checked={roles === "comer"}
              onChange={() => handleRoleSelection("comer")}
            />
            Comercial
          </label>
          <label>
            <input
              type="checkbox"
              value="tech"
              checked={roles === "tech"}
              onChange={() => handleRoleSelection("tech")}
            />
            Technician
          </label>
        </div>
        <button type="submit" className={styles.button}>Register</button>
      </form>
      <p className={styles.registerLink}>
        Already have an account?{" "}
        <button type="button" onClick={() => navigate("/login")} className={styles.link}>
          Login
        </button>
      </p>
    </div>
  );
};

export default RegisterPage;
