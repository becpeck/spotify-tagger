# TODO

## Authentication

- [ ] Better error handling for `refreshAccessToken()` in `[...nextauth].ts`
    - [ ] Remove `error: 'RefreshAccessTokenError'` property on returned `token` from `catch()` after display on client
    - [ ] Handle when refresh token is revoked by user ([Details from Spotify][1])
- [ ] See if `session.spotifyTokens` gets updated on refresh of access token
- [ ] Handle when initial authentication by user through Spotify is refused by user

## Database

- [ ] 

## Pages

- [ ] 

## Components

- [ ] 



[1]: <https://developer.spotify.com/community/news/2016/07/25/app-ready-token-revoke/>