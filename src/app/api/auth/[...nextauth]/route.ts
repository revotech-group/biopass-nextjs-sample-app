import NextAuth from "next-auth/next";

const handler = NextAuth({
  providers: [
    {
      id: "biopass",
      name: "Biopass",
      type: "oauth",
      wellKnown: `${process.env.NEXT_PUBLIC_ISSUER}.well-known/openid-configuration`,
      authorization: { params: { scope: process.env.NEXT_PUBLIC_SCOPES } },
      idToken: true,
      checks: ["pkce", "state"],
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      client: {
        token_endpoint_auth_method: "none",
      },
      profile(profile) {
        return {
          id: profile.sub,
        };
      },
    },
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.profile = profile;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token.profile) {
        // Pass profile info to the session
        session.profile = token.profile;
      }
      return session;
    },
  },
  // Other NextAuth configuration options...
});
export { handler as GET, handler as POST };
