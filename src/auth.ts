import NextAuth, { type NextAuthConfig, type DefaultSession } from "next-auth";
import Spotify from "next-auth/providers/spotify";
import {
  KyselyAdapter,
  type KyselyAuth,
  type Database,
} from "@auth/kysely-adapter";
import { db } from "@/db/db";

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
  }
}

interface SpotifyProfile {
  id: string;
  display_name: string;
  email: string;
  images: {
    url: string;
    width: number;
    height: number;
  }[];
  followers: {
    total: number;
  };
  country: string;
  product: "premium" | "free" | "open";
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
}

const spotifyScopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
  "user-follow-modify",
  "user-follow-read",
  "user-read-playback-position",
  "user-top-read",
  "user-read-recently-played",
  "user-library-modify",
  "user-library-read",
  "user-read-email",
  "user-read-private",
];

const config: NextAuthConfig = {
  adapter: KyselyAdapter(db as KyselyAuth<Database>),
  providers: [
    Spotify<SpotifyProfile>({
      authorization: `https://accounts.spotify.com/authorize?scope=${spotifyScopes.join(
        " "
      )}`,
      profile: (profile) => {
        return {
          id: profile.id,
          spotifyId: profile.id,
          name: profile.display_name,
          email: profile.email,
          images: profile.images.sort((a, b) => a.height - b.height),
          followers: profile.followers.total,
          country: profile.country,
          product: profile.product,
          explicitFiltered: profile.explicit_content.filter_enabled,
          explicitLocked: profile.explicit_content.filter_locked,
        };
      },
    }),
  ],
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
