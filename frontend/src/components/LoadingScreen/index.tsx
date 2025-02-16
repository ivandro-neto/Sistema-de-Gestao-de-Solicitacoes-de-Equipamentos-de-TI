import styles from './css/styles.module.css'

export const Loading = () =>{
  return(
    <div className={styles.container}>
      <span className={styles.ball1}></span>
      <span className={styles.ball2}></span>
      <span className={styles.ball3}></span>
    </div>
  )
}