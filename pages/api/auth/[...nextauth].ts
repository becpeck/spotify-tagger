

import NextAuth, { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import SpotifyProvider from 'next-auth/providers/spotify';

const scopes = [
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
];

async function refreshAccessToken(token: JWT): Promise<JWT> {
    try {
        console.log(`\nINSIDE refreshAccessToken()`);
        const url = 'https://accounts.spotify.com/api/token';
        const authorization = `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`;

        const request = new Request(url, {
            method: "POST",
            headers: {
                "Authorization": authorization,
            },
            body: new URLSearchParams({
                "grant_type": "refresh_token",
                "refresh_token": token.spotifyTokens!.refreshToken,
            }),
        });

        const response = await fetch(request);
        const resBody = await response.json();
        console.log(`POST response body:`);
        console.log(resBody);
        if (!response.ok) {
            throw resBody;
        }

        const newToken: JWT = {
            ...token,
            spotifyTokens: {
                accessToken: resBody.access_token,
                tokenType: resBody.token_type,
                expiresAt: resBody.expires_in + Math.floor(Date.now() / 1000),
                refreshToken: resBody.refresh_token || token.spotifyTokens!.refreshToken,
            },
        };
        console.log(`SUCCESS refreshAccessToken(), returning: `);
        console.log(newToken);
        return newToken;
    } catch (err) {
        console.log(`ERROR: refreshAccessTokens()`);
        /**
         * Could be 
         *  - { error: 'invalid_client' }
         *  - { error: 'unsupported_grant_type', error_description: 'grant_type {GRANT_TYPE} is not supported }
         *  - many others probably
         */
        console.log(err);
        const errorToken: JWT = {
            ...token,
            error: 'RefreshAccessTokenError'
        };
        console.log(`FAILED refreshAccessToken(), returning: `);
        console.log(errorToken);
        return errorToken;
    }

}

const options: AuthOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID!,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
            authorization: {
                params: { scope: scopes.join(' ') }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            console.log(`\nINSIDE JWT CALLBACK`);
            /** 
             * WHEN req.method = 'GET'
             * req.url = '/api/auth/callback/spotify?code={}&state={}'
             * req.query = {
             *      code: 'AQCyG-Qo...ZgyJ1kCF',
             *      state: 'Mz63SFZtWJE3NaEnsPEz3bnxQVZBeVBm8ubm_V2Lxok',
             *      nextauth: [ 'callback', 'spotify' ]
             * }
             * 
             * token = {
             *      "name": "spotifyUsername",
             *      "email": "spotifyEmail@email.com",
             *      "sub": "spotifyUsername"
             * }
             * 
             * account = {
             *      "provider": "spotify",
             *      "type": "oauth",
             *      "providerAccountId": "spotifyUsername",
             *      "access_token": "BQCMflAG...014f7KXc",
             *      "token_type": "Bearer",
             *      "expires_at": 1674185893,
             *      "refresh_token": "AQBGsRTK...NbjDAmJY",
             *      "scope": "playlist-read-private playlist-read-collaborative user-read-email"
             * }
             * profile = {
             *      "display_name": "spotifyUsername",
             *      "email": "spotifyEmail@email.com",
             *      "external_urls": {
             *          "spotify": "https://open.spotify.com/user/spotifyUsername"
             *      },
             *      "followers": {
             *          "href": null,
             *          "total": 1
             *      },
             *      "href": "https://api.spotify.com/v1/users/spotifyUsername",
             *      "id": "spotifyUsername",
             *      "images": [],
             *      "type": "user",
             *      "uri": "spotify:user:spotifyUsername"
             * }
             * 
             * 
             * OTHERWISE WHEN req.method = 'GET' and has authenticated
             * req.url = '/api/auth/session'
             * req.query = {
             *      nextauth: [ 'session' ]
             * }
             * 
             * token = {
             *      "name": "spotifyUsername",
             *      "email": "spotifyEmail@email.com",
             *      "sub": "spotifyUsername",
             *      "iat": 1674182293,
             *      "exp": 1676774293,
             *      "jti": "6514f6f6-4d8e-42fd-92a0-f1f9b1c7acbf"
             * }
             * account = undefined
             * profile = undefined
             *      
             */
            console.log(`TOKEN: ${JSON.stringify(token, undefined, 2)}`);
            console.log(`ACCOUNT: ${JSON.stringify(account, undefined, 2)}`);
            console.log(`PROFILE: ${JSON.stringify(profile, undefined, 2)}`);
            if (account) {
                token.spotifyTokens = {
                    accessToken: account.access_token!,
                    tokenType: account.token_type!,
                    expiresAt: account.expires_at!,
                    refreshToken: account.refresh_token!,
                };
            }
            if (token.spotifyTokens!.expiresAt <= Math.floor(Date.now() / 1000) + 10) {
                console.log(`RETRIEVING NEW ACCESS TOKEN`);
                return refreshAccessToken(token);
            } else {
                return token;
            }
        },
        async session({ session, token, user }) {
            console.log(`\nINSIDE SESSION CALLBACK`);
            /**
             * WHEN req.method = 'GET'
             * req.url = '/api/auth/session'
             * req.query = {
             *      nextauth: [ 'session' ]
             * }
             * 
             * session = {
             *      "user": {
             *          "name": "spotifyUsername",
             *          "email": "spotifyEmail@email.com"
             *      },
             *      "expires": "2023-02-19T03:52:13.446Z"
             * }
             * token = {
             *      "name": "spotifyUsername",
             *      "email": "spotifyEmail@email.com",
             *      "sub": "spotifyUsername",
             *      "iat": 1674186733,
             *      "exp": 1676778733,
             *      "jti": "c4b100b0-525d-495e-9984-5afd3afd652a"
             * }
             * user = undefined
             */
            if (!session.spotifyTokens || session.spotifyTokens.accessToken !== token.spotifyTokens?.accessToken) {
                session.spotifyTokens = token.spotifyTokens;
            }
            console.log(`SESSION: ${JSON.stringify(session, undefined, 2)}`);
            console.log(`TOKEN: ${JSON.stringify(token, undefined, 2)}`);
            console.log(`USER: ${JSON.stringify(user, undefined, 2)}`);
            return session;
        },
    },
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    console.log(`\nREQ VALUES: req.method req.url req.query`);
    console.log(`${req.method}   ${req.url}`);
    console.log(req.query);
    console.log(res.statusCode);
    return await NextAuth(req, res, options);
};
