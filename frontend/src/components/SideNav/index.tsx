
import { LinkButton } from '../Button';
import UserCard from '../UserCard';
import styles from './css/styles.module.css'
import { Roles } from '../../utils/Roles';

const SideNav = () => {
  const session = localStorage.getItem("session")
  const user = session ? JSON.parse(session) : null; 

  return (
    <section className={styles.container}>
      <div className={styles.appName}>
        <h1>TechEquip Request</h1>
      </div>
    <nav className={styles.navbar}>
      <ul className={styles.list}>
        <li className={styles.items}>
        {
          user.type === Roles.tech  ? 
          <LinkButton url={user.type === Roles.tech ?'/tech/dashboard': '/user/dashboard'} content={'Dashboard'}/>
            : 
            <LinkButton url={user.type === Roles.admin ?'/admin/dashboard': '/user/dashboard'} content={'Dashboard'}/>
          }
        </li>
        <li className={styles.items}>
          <LinkButton url={'/inbox'} content={'Notificações'}/>
        </li>
        <li className={styles.items}>
          {
          user.type === Roles.tech  ? 
          <LinkButton url={user.type === Roles.tech ?'/tech/requests': '/user/requests'} content={'Solicitações'}/>
            : 
            <LinkButton url={user.type === Roles.admin ?'/admin/requests': '/user/requests'} content={'Solicitações'}/>
          }
        </li>
        {
           user.type === Roles.tech  ? 
           (<li className={styles.items}>
           <LinkButton url={'/tech/panel'} content={'Atribuições'}/>
          </li>) : ""
        }
        {
           user.type === Roles.admin || Roles.comer  ? 
           (<li className={styles.items}>
           <LinkButton url={'/admin/reports'} content={'Relatórios'}/>
          </li>) : ""
        }
        {
           user.type === Roles.admin  ? 
           (<li className={styles.items}>
           <LinkButton url={'/admin/user/managment'} content={'Utilizadores'}/>
          </li>) : ""
        }
        {
           user.type === Roles.admin || Roles.comer ? 
           (<li className={styles.items}>
           <LinkButton url={'/admin/inventory'} content={'Estoque'}/>
          </li>) : ""
        }
        {
           user.type === Roles.tech  ? 
           (<li className={styles.items}>
           <LinkButton url={'/tech/inventory'} content={'Estoque'}/>
          </li>) : ""
        }
        {
           user.type === Roles.tech ? 
           (<li className={styles.items}>
           <LinkButton url={'/tech/inventory/check'} content={'Equipamentos'}/>
          </li>) : ""
        }
        {
           user.type === Roles.admin || Roles.comer ? 
           (<li className={styles.items}>
           <LinkButton url={'/admin/inventory/check'} content={'Equipamentos'}/>
          </li>) : ""
        }
        
      </ul>

      <div className={styles.user}>
        <UserCard user={user}/>
      </div>
    </nav>
    </section>
  )
}

export default SideNav;