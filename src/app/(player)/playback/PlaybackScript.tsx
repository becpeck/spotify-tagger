"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/stores/AppStoreProvider";
import { trpc } from "@/trpc/client";

declare global {
  interface Window {
    Spotify: {
      Player: SpotifyPlayerConstructor;
    };
    onSpotifyWebPlaybackSDKReady: undefined | (() => Promise<void>);
  }
}

interface PlaybackScriptProps {
  token: string;
}

export default function PlaybackScript({ token }: PlaybackScriptProps) {
  const router = useRouter();
  const { setPlayer, setPlaybackState } = useAppStore(
    ({ setPlayer, setPlaybackState }) => ({ setPlayer, setPlaybackState })
  );

  const playbackDevice = trpc.playback.transferToDevice.useMutation();

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = async () => {
      const player = new window.Spotify.Player({
        name: "Spotify Tagger",
        getOAuthToken: (cb: (token: string) => void) => cb(token),
        volume: 1,
      });

      player.addListener("ready", ({ device_id }) => {
        console.log("ready: Device ID", device_id);
        playbackDevice.mutate({ device_id });
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("not_ready: Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        console.log("player_state_changed");
        console.log(state);
        if (state === null) {
          throw new Error("===== PLAYER STATE IS NULL =====");
        }

        setPlaybackState(state);
      });

      player.addListener("autoplay_failed", () => {
        console.log("autoplay_failed");
      });

      player.addListener("initialization_error", ({ message }) => {
        console.log("initialization_error", message);
      });

      player.addListener("authentication_error", async ({ message }) => {
        console.log("authentication_error", message);
        // This should prevent errors on player functions after idle on page for 1hr+
        router.refresh();
      });

      player.addListener("account_error", ({ message }) => {
        console.log("account_error", message);
      });

      player.addListener("playback_error", ({ message }) => {
        console.log("playback_error", message);
      });

      player
        .connect()
        .then((success) => console.log("connect success", success))
        .catch((err) => console.error("connect failed", err));

      player
        .activateElement()
        .then(() => console.log("activateElement"))
        .catch((err) => console.error(err));

      setPlayer(player);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Script
      src="https://sdk.scdn.co/spotify-player.js"
      async={true}
      onLoad={() => {
        console.log("Spotify Web Playback SDK ** LOADED **");
      }}
      onReady={() => {
        console.log("Spotify Web Playback SDK ** READY **");
      }}
      onError={() => {
        console.error("Spotify Web Playback SDK ** ERROR **");
      }}
    />
  );
}
