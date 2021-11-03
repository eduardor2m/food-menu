import NextAuth from 'next-auth';
import { signIn } from 'next-auth/client';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: 'read:user',
    }),
  ],
  callbacks: {
    signIn: async (user, account, profile) => {
      console.log(user);
      return true;
    },
  },
});
