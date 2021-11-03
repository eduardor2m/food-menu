/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';

import { GetServerSideProps } from 'next';
import { useSession, signIn, signOut } from 'next-auth/client';

import { Header } from '../components/Header';
import styles from '../styles/pages/Login.module.scss';

export default function Login() {
  const [session] = useSession();
  console.log(session);
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  function handleSignIn() {
    signIn('github');
  }
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <button className={styles.githubButton} onClick={() => handleSignIn()}>
          <AiFillGithub className={styles.icon} />
          Login with GitHub
        </button>
        {}
        {/* <button className={styles.backButton}>
          Voltar para pagina inicial
        </button> */}
      </div>
    </div>
  );
}

// export const getServerSide: getServerSideProps = async (context) => {
//   // Get the user's session based on the request

//   if (!user) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: { user },
//   }
// })
