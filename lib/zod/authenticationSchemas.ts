import { literal, z } from 'zod';

export const AuthenticationErrorSchema = z.object({
    error: z.string(),
    error_description: z.string(),
});

export const RefreshAccessTokenSchema = z.object({
    access_token: z.string(),
    token_type: literal('Bearer'),
    expires_in: literal(3600),
    scope: z.string(),
    refresh_token: z.string().optional(),
});

export const RefreshTokenRevokedSchema = z.object({
    error: literal('invalid_grant'),
    error_description: literal('Refresh token revoked'),
});

