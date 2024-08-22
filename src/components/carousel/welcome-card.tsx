import styles from './welcome-card.module.scss';

export const WelcomeCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.welcomeTitle}>
        <h3>In the loop</h3>
        <h1>improve your office culture</h1>
      </div>
      <div className={styles.welcomeCopy}>
        <p>Use your voice to impact your office culture!</p>
      </div>

      <div className={styles.startSwipe}>
        <p>Click right to start the survey</p>
      </div>
    </div>
  );
};
