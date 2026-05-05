import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

const AUTH_BASE =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  '';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.username || !credentials?.password) return null;
        try {
          const res = await fetch(`${AUTH_BASE}/api/auth/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });
          if (!res.ok) return null;
          const data = await res.json();
          
          return {
            id: data.userId ?? data.id ?? credentials.username,
            name: data.username ?? credentials.username,
            email: data.email ?? null,
            accessToken: data.jwtToken,
            roles: data.roles ?? [],
          } as User & { accessToken: string; roles: string[] };
        } catch (error) {
          console.error('[Auth] Error:', error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.id = user.id;
        token.roles = (user as any).roles ?? [];
        console.log("[JWT] roles stored:", token.roles); // ← add this
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.id = token.id as string;
      (session as any).roles = token.roles ?? [];
      return session;
    },
    
  },

  pages: { signIn: '/signin' },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  
};
