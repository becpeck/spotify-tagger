import { ACCOUNTS_BASE_URL, TOKEN_ENDPOINT } from './constants';

interface RefreshAccessTokenResponse {
    access_token: string,
    token_type: string,
    expires_in: number,
    scope: string,
    refresh_token?: string,
}

interface SpotifyAccountsErrorResponse {
    error: string,
    error_description: string,
}

interface RefreshTokenRevokedResponse extends SpotifyAccountsErrorResponse {
    error: 'invalid_grant',
    error_description: 'Refresh token revoked',
    status: 400,
    statusText: 'Bad Request',
}

export async function getRefreshedAccessToken(refreshToken: string) {
    const url = `${ACCOUNTS_BASE_URL}${TOKEN_ENDPOINT}`;
    const authorization = `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`;

    const request = new Request(url, {
        method: 'POST',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }),
    });

    const response = await fetch(request);
    if (response.ok) {
        return await response.json() as RefreshAccessTokenResponse;
    } else {
        return {
            ...await response.json(),
            status: response.status,
            statusText: response.statusText,
        } as SpotifyAccountsErrorResponse;
    }
}

export function isAccountsError(response: SpotifyAccountsErrorResponse | RefreshAccessTokenResponse): response is SpotifyAccountsErrorResponse {
    return (response as SpotifyAccountsErrorResponse).error !== undefined;
}

export function isRevokedTokenError(response: SpotifyAccountsErrorResponse): response is RefreshTokenRevokedResponse {
    return (response as RefreshTokenRevokedResponse).error_description === 'Refresh token revoked';
}
