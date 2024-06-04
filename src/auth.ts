import NextAuth, { type NextAuthConfig } from "next-auth";
import { KyselyAdapter } from "@auth/kysely-adapter";
import { db } from "@/db/db";
import Spotify from "next-auth/providers/spotify";

const config: NextAuthConfig = {
  adapter: KyselyAdapter(db),
  providers: [Spotify],
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
