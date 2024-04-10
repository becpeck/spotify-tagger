import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';

import qs from 'qs';
const BASE_API_URL = 'https://api.spotify.com/v1'

export type SpotifyAxiosConfig = AxiosRequestConfig & { contentType?: string };

export async function spotifyFetch<T>(
    url: string,
    baseURL: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    accessToken: string,
    
) {
    try {
        const request: RequestInit = {
            method,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            body: {

            }
        }
        const response = await fetch(url, {

        })
    }
}

export async function spotifyAxios<T>(
  url: string,
  method: Method,
  accessToken: string,
  config?: SpotifyAxiosConfig,
) {
  try {
    const { contentType, ...axiosConfig } = config ?? {};
    const response = await axios({
      ...axiosConfig,
      baseURL: BASE_API_URL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': contentType ?? 'application/json',
      },
    //   paramsSerializer: () => 'foo=bar'
      url,
      method,
      paramsSerializer: {}
    });

    const res = axios({
        ...axiosConfig,
        baseURL: BASE_API_URL,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': contentType ?? 'application/json',
        },
        url,
        method,
    })

    // const resFetch = fetch()

    return response.data as T;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(err.message);
  }
}

export function paramsSerializer(params: any) {
  return qs.stringify(params, { arrayFormat: 'comma' });
}