import React from 'react';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import Image from 'next/image';
import Link from 'next/link';
import { z } from 'zod';
import { GetAlbumSchema, GetAlbumResponse } from '../../lib/zod/albumsSchemas';

type Timestamp = {
	hours: number,
	minutes: number,
	seconds: number,
}

type AlbumProps = {
	authenticated: boolean,
	albumId: string,
	data?: {
		albumType: string,
		id: string,
		images: Array<{
			height: number,
			url: string,
			width: number,
		}>,
		name: string,
		artists: Array<{
			id: string,
			name: string,
		}>,
		copyrights: Array<{
			text: string,
			type: string,
		}>,
		releaseDate: string,
		releaseDatePrecision: string,
		totalTracks: number,
		tracks: {
			items: Array<{
				artists: Array<{
					id: string,
					name: string,
				}>,
				durationMs: number,
				discNumber: number,
				id: string,
				name: string,
				trackNumber: number,
			}>,
			limit: number,
			next: string | null,
			offset: number,
			total: number,
		}
	}
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await unstable_getServerSession(context.req, context.res, authOptions)
	// TODO: Get and merge db data

	if (!session) {
		return {
			props: {
				authenticated: false,
				albumId: context.params!.id,
			},
		}
	}

	const response = await fetch(`https://api.spotify.com/v1/albums/${context.params.id}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${session.user.accessToken}`
		},
	});
	const json = await response.json();
	const data: GetAlbumResponse = GetAlbumSchema.parse(json);

	return {
		props: {
			authenticated: true,
			albumId: context.params!.id,
			data: {
				albumType: data.album_type,
				id: data.id,
				images: data.images,
				name: data.name,
				artists: data.artists.map((artist: any) => ({ id: artist.id, name: artist.name })),
				copyrights: data.copyrights?.map((copyright: any) => ({ type: copyright.type, text: copyright.text })),
				releaseDate: data.release_date,
				releaseDatePrecision: data.release_date_precision,
				totalTracks: data.total_tracks,
				tracks: {
					items: data.tracks.items.map((track: any) => ({
						artists: track.artists.map(((artist: any) => ({ id: artist.id, name: artist.name }))),
						durationMs: track.duration_ms,
						discNumber: track.disc_number,
						id: track.id,
						name: track.name,
						trackNumber: track.track_number,
					})),
					limit: data.tracks.limit,
					next: data.tracks.next,
					offset: data.tracks.offset,
					total: data.tracks.total,
				}
			}
		},
	}
}

export default function Album(props: AlbumProps): JSX.Element {
	function getTimestamp(ms: number): Timestamp {
		const date = new Date(Date.UTC(0, 0, 0, 0, 0, 0, ms));
		return {
			hours: date.getUTCHours(),
			minutes: date.getUTCMinutes(),
			seconds: date.getUTCSeconds(),
		}
	}

	function getTimeString(ms: number): `${string}${string}:${string}` {
		const { hours, minutes, seconds } = getTimestamp(ms);
		if (hours) {
			return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
		} else {
			return `${minutes}:${String(seconds).padStart(2, '0')}`;
		}
	}

	// function getNumDiscs(tracks: any): number {
	// 	return tracks.items[tracks.items.length - 1].discNumber;
	// }

	if (props.data) {
		const { albumId, authenticated, data } = props;

		return (
			<div>
				<Image 
					src={data.images[0].url}
					alt={`${data.name} Cover Art`}
					width={data.images[1].width}
					height={data.images[1].height}
				/>
				<h4>{data.albumType}</h4>
				<h2>{data.name}</h2>
				<h3>
					<span>
						By {
							data.artists.map((artist, i, artists) => (
								i === artists.length - 1 
								? <Link key={artist.id} href={`/artist/${artist.id}`}>{artist.name}</Link>
								: <><Link key={artist.id} href={`/artist/${artist.id}`}>{artist.name}</Link>, </>
								))
						} ·
					</span>
					<span> {data.releaseDatePrecision === 'day' ? data.releaseDate.slice(0, 4) : data.releaseDate} ·</span>
					<span> {data.totalTracks} songs ·</span>
					<span> {getTimeString(data.tracks.items.reduce((acc, track) => acc + track.durationMs, 0))}</span>
				</h3>
				<div>
					{
						// TODO: display disc labels if multiple discs
					}
					<ol> 
						{
							data.tracks.items.map((track) => (
								<li key={track.id}>
									<span>{track.trackNumber} ·</span>
									<span>
										<> <Link href={`/track/${track.id}`}>{track.name}</Link> · </>
									</span>
									<span>
										{
											track.artists.map((artist, i, artists) => (
												i === artists.length - 1 
												? <Link key={artist.id} href={`/artist/${artist.id}`}>{artist.name}</Link>
												: <><Link key={artist.id} href={`/artist/${artist.id}`}>{artist.name}</Link>, </>
												))
										} ·
									</span>
									<span> {getTimeString(track.durationMs)}</span>
								</li>
							))
						}
					</ol>
				</div>
				<div>
					<h5>
						{data.releaseDate}
					</h5>
					{
						data.copyrights.map((copyright) => (
							<div key={copyright.type}>{copyright.text}</div>
						))
					}
				</div>
			</div>
		);
	} else {
		return (
			<div>
	
				<p>Album id: {props.albumId}</p>
				<p>Authenticated: {`${props.authenticated}`}</p>
			</div>
		);
	}
}