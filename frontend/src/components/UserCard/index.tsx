import { Expanded } from "../Account";
import styles from "./css/styles.module.css";
import { logout } from "../../api/user";
import { useNavigate } from "react-router-dom";

 interface UserCard {
  id?: string;
  name: string;
  email: string;
}

interface UserCardProps {
  user: UserCard; // defina a interface User adequadamente
}

const UserCard = ({user} : UserCardProps) =>{
  const navigate = useNavigate()

  const handleLogout = () =>{
    logout()
    navigate("/")
  }
  return(
    <div className={styles.container}>
      <Expanded image="" accountname={user.name} email={user.email}/>
      <button type="button" title="exit" className={"exit"} onClick={handleLogout}><img src="../../public/icons/exit.svg" alt="sair" /></button>
    </div>
  )
}

export default UserCard