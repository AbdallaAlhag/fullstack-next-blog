import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  // what this does is only allow logged in users on certain pages but my current setup has no retrisited pages atm.
  // callbacks: {
  //   authorized({ auth, request: { nextUrl } }) {
  //     const isLoggedIn = !!auth?.user;
  //     const isOnDashboard = nextUrl.pathname.startsWith("/");
  //     if (isOnDashboard) {
  //       if (isLoggedIn) return true;
  //       return false; // Redirect unauthenticated users to login page
  //     } else if (isLoggedIn) {
  //       return Response.redirect(new URL("/", nextUrl));
  //     }
  //     return true;
  //   },
  // },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
