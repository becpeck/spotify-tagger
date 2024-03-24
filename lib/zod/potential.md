### From `getAlbumsSchema`
- [X] `AvailableMarketsSchema = available_markets: string[]` (of 2-letter country codes)
- [X] `ExternalUrlsSchema = external_urls: { spotify: string }` (spotify url of album)
- [X] `ImagesSchema = images: { url: string, height: number, width: number }[]` (image has url, pixel height/width)
- [X] `RestrictionsSchema = restrictions: { reason: 'market' | 'product' | 'explicit' }` (only included when content restriction)
- [ ] `copyrights: { text: string, type: string }[]` (not req, type: 'C' | 'P' | other?)
- [ ] `external_ids: { isrc: string, ean: string, upc: string }` (not req)
- [ ] `genres: string[]` (not req, may be empty)
- [ ] `artists: Object[]` (same as artists below in tracks.items + followers, genres, images, popularity)
    ```
    {
        external_urls: ExternalUrlsSchema,
        followers: {
            href: string,
            total: integer,
        },
        genres: string[],
        href: string,
        id: string,
        images: ImagesSchema,
        name: string,
        popularity: number,
        type: 'artist',
        uri: string,
    }
    ```
- [ ] `tracks: Object`
    ```
    {
        href: string,
        limit: integer,
        next: string | null,
        offset: number,
        previous: string | null,
        total: number,
        items: {
            artists: {
                external_urls: ExternalUrlsSchema,
                href: string,
                id: string,
                name: string,
                type: 'artist',
                uri: string,
            }[],
            available_markets: AvailableMarketsSchema,
            disc_number: number,
            duration_ms: number,
            explicit: boolean,
            external_urls: ExternalUrlsSchema,
            href: string,
            id: string,
            is_playable: boolean,  // only included with [track relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/)
            linked_from: {
                external_urls: ExternalUrlsSchema,
                href: string,
                id: string,
                type: 'track',
                uri: string,
            }, // only included with [track relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/)
            restrictions: RestrictionsSchema,
            name: string,
            preview_url: string,
            track_number: number,
            type: 'track',
            uri: string,
            is_local: boolean,
        }[],
    }
    ```

