import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn(data) {
      // database input operation here
      // const res = await fetch(`${process.env.URL}/api/user/register`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ name: data.user.name, email: data.user.email }),
      // });
      return true;
    },
    async session(session) {
      const res = await fetch(`${process.env.URL}/api/user/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session.session.user.email }),
      });
      const data = await res.json();
      if (data.role == "volunteer") {
        session.session.user.role = "volunteer";
      } else if (data.role == "organization") {
        session.session.user.role = "organization";
      } else {
        session.session.user.role = "not registered";
      }
      return session.session;
    },
  },
};

export default NextAuth(authOptions);
