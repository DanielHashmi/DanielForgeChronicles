import NextAuth from "next-auth/next";
import { auth_options } from "./auth_options";
import { AuthOptions } from "next-auth";

const handler = NextAuth((auth_options as unknown) as AuthOptions);

export { handler as GET, handler as POST };