import NextAuth, { type NextAuthConfig, type DefaultSession } from "next-auth";
import Spotify, { type SpotifyProfile } from "@/server/auth/spotifyProvider";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/server/db";
import authClient from "@/server/auth/authClient";

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

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Profile extends SpotifyProfile {}
}

const config: NextAuthConfig = {
  adapter: PrismaAdapter(db),
  providers: [Spotify],
  callbacks: {
    session: async ({ session, user }) => {
      console.log(`===== SESSION() CALLBACK =====`);
      const spotifyAccount = await db.account.findFirstOrThrow({
        where: {
          userId: user.id,
          provider: "spotify",
        }
      });

      session.access_token = spotifyAccount.access_token;

      if (spotifyAccount.expires_at * 1000 < Date.now()) {
        console.log(`===== REFRESHING ACCESS TOKEN =====`);
        try {
          const res = await authClient.refreshToken({
            grant_type: "refresh_token",
            refresh_token: spotifyAccount.refresh_token,
          });
          const { access_token } = await db.account.update({
            data: {
              access_token: res.access_token,
              expires_at: Math.floor(Date.now() / 1000 + res.expires_in),
            },
            where: {
              provider_providerAccountId: {
                provider: "spotify",
                providerAccountId: spotifyAccount.providerAccountId,
              }
            },
          });
          session.access_token = access_token;
        } catch (err) {
          console.error("===== RefreshAccessTokenError =====");
          console.error(err);
          session.error = "RefreshAccessTokenError";
        }
      }
      return session;
    },
    signIn: async ({ user, profile }) => {
      // Keep db spotify profile data in sync with spotify auth result
      if (profile) {
        await db.user.update({
          where: { id: user.id! },
          data: {
            spotifyId: profile.id!,
            name: profile.display_name,
            email: profile.email!,
            images: profile.images.sort((a, b) => a.height - b.height),
            followers: profile.followers.total,
            country: profile.country,
            product: profile.product,
            explicitFiltered: profile.explicit_content.filter_enabled,
            explicitLocked: profile.explicit_content.filter_locked,
          },
        });
      }
      return true;
    }
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
