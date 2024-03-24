const API_BASE_ENDPOINT = 'https://api.spotify.com/v1/';

type ErrorBody = {
    error: {
        status: number,
        message: string,
        statusText?: string,
    }
}


export async function fetchData<T>(request: Request): Promise<T | ErrorBody> {
    const response = await fetch(request);

    if (response.ok) {
        return await response.json() as T;
    } else {
        return {
            ...await response.json(),
            statusText: response.statusText,
        } as ErrorBody;
    }
}


async function getAlbum(accessToken: string, albumId: string) {
    const url = `${API_BASE_ENDPOINT}${albumId}`;

    const request: Request = new Request(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });

    const response = await fetch(request);

}