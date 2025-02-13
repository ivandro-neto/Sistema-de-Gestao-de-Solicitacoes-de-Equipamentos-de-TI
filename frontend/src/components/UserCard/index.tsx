import { Expanded } from "../Account";
import styles from "./css/styles.module.css";
import { logout } from "../../api/user";
import { useNavigate } from "react-router-dom";


const UserCard = ({user}) =>{
  const navigate = useNavigate()

  const handleLogout = () =>{
    logout()
    navigate("/")
  }
  return(
    <div className={styles.container}>
      <Expanded image="" accountname={user.name} email={user.email}/>
      <button type="button" title="exit" className={styles.exit} onClick={handleLogout}><img src="/icons/exit.svg" alt="" /></button>
    </div>
  )
}

export default UserCard