import { useEffect } from 'react';
import { AiFillGithub } from 'react-icons/ai';

import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

import styles from '../styles/pages/Login.module.scss';

export default function Login() {
  const router = useRouter();
  const [session] = useSession();

  useEffect(() => {
    if (session) {
      router.push('/add');
    }
  }, [session, router]);

  function handleSignIn() {
    signIn('github');
  }

  function handleHome() {
    router.push('/');
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src="assets/logo.svg"
          alt="logo"
          className={styles.logo}
          onClick={handleHome}
        />
        <h1>
          Gerencie seu <br /> cardápio de forma <br /> muito simples
        </h1>
        <p>Faça login com sua conta do GitHub </p>
      </div>
      <div className={styles.content}>
        <button className={styles.githubButton} onClick={() => handleSignIn()}>
          <section className={styles.githubIconSection}>
            <AiFillGithub className={styles.icon} />
          </section>
          <section className={styles.githubText}>Entrar com o GitHub</section>
        </button>
      </div>
    </div>
  );
}
