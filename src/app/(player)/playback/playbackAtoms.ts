import { atom } from "jotai";

export const playerAtom = atom<SpotifyPlayer | undefined>(undefined);

export const playerStateAtom = atom<WebPlaybackState | undefined>(undefined);
