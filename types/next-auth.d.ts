import NextAuth from 'next-auth';
import { JWT } from "next-auth/jwt";

interface SpotifyToken {
    accessToken: string,
    tokenType: string,
    expiresAt: number,
    refreshToken: string,
}

declare module 'next-auth' {
    export interface Session {
        spotifyTokens?: SpotifyToken,
    }
}

declare module "next-auth/jwt" {
    export interface JWT {
        spotifyTokens?: SpotifyToken,
    }
}
