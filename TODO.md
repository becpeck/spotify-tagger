# TODO

## Authentication

- [X] Reimplement `refreshAccessToken()` to handle db storage but still use jwt auth strategy
- [ ] Better error handling for `refreshAccessToken()` in `[...nextauth].ts`
    - [ ] Remove `error: 'RefreshAccessTokenError'` property on returned `token` from `catch()` after display on client
    - [ ] Handle when refresh token is revoked by user ([Details from Spotify][1])
- [X] See if `session.spotifyTokens` gets updated on refresh of access token
- [ ] Handle when initial authentication by user through Spotify is refused by user

## Database

- [ ] Add `Track`, `Artist`, `Album`, etc fields to prisma/db
- [ ] Figure out many-to-many `User`-`Tag`-`Track` relationships in Prisma, maybe model for bridge table?
- [ ] Add `Tag` to prisma/db

## Pages

- [ ] Create basic spotify clone pages for spotify uris/urls
    - [ ] `/album/{id}`
    - [ ] `/playlist/{id}`
    - [ ] Liked songs `/collection/tracks`
    - [ ] `/artist/{id}`
    - [ ] `/track/{id}`

## Components

- [ ] Header
- [ ] Sidebar
- [ ] Track list
- [ ] Playback widget



[1]: <https://developer.spotify.com/community/news/2016/07/25/app-ready-token-revoke/>