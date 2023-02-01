import { DefaultSession } from 'next-auth';

interface SpotifyToken {
    providerAccountId: string,
    accessToken: string,
    tokenType: string,
    expiresAt: number,
    refreshToken: string,
    error?: string,
}

declare module 'next-auth' {
    export interface Session {
        user: DefaultSession['user'] & {
            accessToken?: string;
            expiresAt?: number;
        }
    }
}

declare module "next-auth/jwt" {
    export interface JWT {
        spotifyTokens?: SpotifyToken,
    }
}
