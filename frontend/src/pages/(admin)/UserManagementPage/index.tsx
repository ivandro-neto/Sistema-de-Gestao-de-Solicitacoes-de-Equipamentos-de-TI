import { useState, useEffect } from "react";
import styles from "./css/style.module.css";
import Layout from "../../Layout";
import { deleteUser, getUsers, register } from "../../../api/user";
import { User } from "../../../utils/Model";
import { Roles, RolesExtended } from "../../../utils/Roles";




export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [role, setRole] = useState("user");

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers(); // Supondo que getUsers seja assíncrona
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    if (!name || !email) return;
    const newUser: User = {
      nome : name,
      email,
      tipo : Roles[role],
      departamento
    };
    register(newUser.nome, newUser.email,"senha123#", newUser.departamento, role)
    setUsers([...users, newUser]);
    setName("");
    setEmail("");
    setRole("user");
  };

  const handleDeleteUser = async (id: string) => {
    await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <Layout>
      <div className={styles.container}>
      <h2>Gerenciamento de Usuários</h2>

      {/* Formulário */}
      <div className={styles.form}>
        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Departamento" value={departamento} onChange={(e) => setDepartamento(e.target.value)} />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="tech">Técnico</option>
          <option value="comer">Comercial</option>
          <option value="user">Solicitante</option>
        </select>
        <button onClick={handleAddUser}>Adicionar Usuário</button>
      </div>

      {/* Lista de Usuários */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Função</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{RolesExtended[user.tipo]}</td>
              <td>
                <button className={styles.deleteButton} onClick={() => handleDeleteUser(user?.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Layout>
  );
}
