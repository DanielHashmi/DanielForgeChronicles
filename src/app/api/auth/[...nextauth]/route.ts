import NextAuth from "next-auth/next";
import { auth_options } from "./auth_options";

const handler = NextAuth(auth_options);

export { handler as GET, handler as POST };