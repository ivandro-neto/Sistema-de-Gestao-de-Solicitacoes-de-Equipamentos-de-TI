import { memo, ReactNode } from 'react'
import SideNav from '../../components/SideNav'
import styles from './css/styles.module.css'
interface ILayoutProps{
  children : ReactNode;
  
}


const Layout: React.FC<ILayoutProps> = ({children}) => {
  return(
    <div className={styles.container}>
      <SideNav/>
      <div className={styles.mainContainer}>
      <main className={styles.main}>
        {children}
      </main>
      </div>
    </div>
  )
}

export default memo(Layout)