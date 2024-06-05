import NextAuth, { type NextAuthConfig, type DefaultSession } from "next-auth";
import Spotify from "@/auth/spotifyProvider";
import {
  KyselyAdapter,
  type KyselyAuth,
  type Database,
} from "@auth/kysely-adapter";
import { db } from "@/db/db";
import authClient from "@/auth/authClient";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified: string | null;
      createdAt: string;
      updatedAt: string;
      country: string;
      explicitFiltered: boolean;
      explicitLocked: boolean;
      followers: number;
      images: {
        url: string;
        width: number;
        height: number;
      }[];
      product: "premium" | "free" | "open";
      spotifyId: string;
    } & DefaultSession["user"];
    access_token: string;
    error?: "RefreshAccessTokenError";
  }
}

const config: NextAuthConfig = {
  adapter: KyselyAdapter(db as KyselyAuth<Database>),
  providers: [Spotify],
  callbacks: {
    session: async ({ session, user }) => {
      const spotifyAccount = await db
        .selectFrom("Account")
        .where("userId", "=", user.id)
        .selectAll()
        .executeTakeFirstOrThrow();

      session.access_token = spotifyAccount.access_token;

      if (spotifyAccount.expires_at * 1000 < Date.now()) {
        console.log(`===== REFRESHING ACCESS TOKEN =====`);
        try {
          const res = await authClient.refreshToken({
            grant_type: "refresh_token",
            refresh_token: spotifyAccount.refresh_token,
          });
          const { access_token } = await db
            .updateTable("Account")
            .set({
              access_token: res.access_token,
              expires_at: Math.floor(Date.now() / 1000 + res.expires_in),
              scope: res.scope,
            })
            .where("provider", "=", "spotify")
            .where("providerAccountId", "=", spotifyAccount.providerAccountId)
            .returning("access_token")
            .executeTakeFirstOrThrow();
          session.access_token = access_token;
        } catch (err) {
          console.error("===== RefreshAccessTokenError =====");
          console.error(err);
          session.error = "RefreshAccessTokenError";
        }
      }
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
