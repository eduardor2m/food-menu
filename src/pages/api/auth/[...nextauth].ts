import faunadb from 'faunadb';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { fauna } from '../../../services/fauna';

const q = faunadb.query;

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: 'read:user',
    }),
  ],
  callbacks: {
    signIn: async (user: any) => {
      try {
        const data: any = await fauna.query(
          q.Get(q.Match(q.Index('users_by_email'), user.email))
        );
        if (data.data.email === user.email) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    },
  },
});
