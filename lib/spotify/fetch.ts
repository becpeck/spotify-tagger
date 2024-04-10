interface FetchError extends Error {
    error: {
        status: number,
        message: string,
        statusText?: string,
    }
}



export async function fetchData<T, E extends FetchError>(request: Request): Promise<T | E> {
    const response = await fetch(request);

    if (response.ok) {
        return await response.json() as T;
    } else {
        return {
            ...await response.json(),
            statusText: response.statusText,
        } as E;
    }
}