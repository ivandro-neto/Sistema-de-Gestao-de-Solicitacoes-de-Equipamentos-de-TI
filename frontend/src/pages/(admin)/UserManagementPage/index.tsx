import { useState, useEffect } from "react";
import styles from "./css/style.module.css";
import Layout from "../../Layout";
import { deleteUser, getUsers, register, updatePasswordUser } from "../../../api/user";
import type { User } from "../../../utils/Model";
import { Roles, RolesDepartment, RolesExtended } from "../../../utils/Roles";
import { Loading } from "../../../components/LoadingScreen";




export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [role, setRole] = useState("");
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  

  const fetchUsers = async () => {
    const fetchedUsers = await getUsers(); // Supondo que getUsers seja assíncrona
    const employees = [...fetchedUsers].filter((u) => u.tipo !== 2222)
    setUsers(employees);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try{
        const fetchedUsers = await getUsers(); // Supondo que getUsers seja assíncrona
        const employees = [...fetchedUsers].filter((u) => u.tipo !== 2222)
        setUsers(employees);
      }catch(err){
          console.log(err)
      }finally{
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    setLoading(true)
   
    try {
    
     if (!name || !email) return;
     const newUser: User = {
       nome : name,
       email,
       senha : "senha123#",
       tipo : Roles[role],
       departamento: RolesDepartment[Roles[role]]
      };
      register(newUser.nome, newUser.email,newUser.senha, newUser.departamento, role, especialidade)
      setUsers([...users, newUser]);
      setName("");
      setEmail("");
      setRole("user");
    } catch (error) {
     console.log(error)
    }finally{
      setLoading(false)
    }
  };

  const handleDeleteUser = async (id: string) => {
    await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
  };
const handleResetPassword = async (id: string, senha: string) =>{
  await updatePasswordUser(id, {senha});
  
  await fetchUsers();
}
  if(loadingUsers) return <Layout><Loading/></Layout>

  return (
    <Layout>
      <div className={styles.container}>
      <h2>Gerenciamento de Usuários</h2>

      {/* Formulário */}
      <div className={styles.form}>
        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <select title="roles" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="tech">Técnico</option>
          <option value="comer">Comercial</option>
        </select>
        {role === "tech" &&
          <input type="text" placeholder="Especialidade" value={especialidade} onChange={(e) => setEspecialidade(e.target.value)} />
        }
        <button type="button" onClick={handleAddUser}>{loading ? "Processando..." : "Adicionar Usuário"}</button>
      </div>
      {/* Lista de Usuários */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Senhas</th>
            <th>Função</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.senha}</td>
              <td>{RolesExtended[user.tipo]}</td>
              <td>
                <button type="button" className={styles.deleteButton} onClick={() => handleDeleteUser(user.id || "")}>
                  Excluir
                </button>
                <button type="button"  onClick={() => handleResetPassword(user.id || "", "senha123#")}>
                  Repor senha
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
