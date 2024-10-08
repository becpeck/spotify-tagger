// Player

interface SpotifyPlayerConstructorOptions {
  name: string;
  getOAuthToken: (cb: (token: string) => void) => void;
  volume?: number;
  enableMediaSession?: boolean;
}

type SpotifyPlayerConstructor = new (
  options: SpotifyPlayerConstructorOptions
) => SpotifyPlayer;

interface SpotifyPlayer {
  connect: () => Promise<boolean>;
  disconnect: () => void;
  addListener: <K extends keyof PlayerEventMap>(
    type: K,
    listener: (ev: PlayerEventMap[K]) => unknown
  ) => boolean;
  removeListener: <K extends keyof PlayerEventMap>(
    type: K,
    listener?: (ev: PlayerEventMap[K]) => unknown
  ) => boolean;
  on: SpotifyPlayer["addListener"];
  getCurrentState: () => Promise<WebPlaybackState | null>;
  setName: (name: string) => Promise<void>;
  getVolume: () => Promise<number>;
  setVolume: (volume: number) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  togglePlay: () => Promise<void>;
  seek: (position_ms: number) => Promise<void>;
  previousTrack: () => Promise<void>;
  nextTrack: () => Promise<void>;
  activateElement: () => Promise<void>;
}

// Events

interface PlayerEventMap extends PlayerErrorMap {
  ready: WebPlaybackPlayer;
  not_ready: WebPlaybackPlayer;
  player_state_changed: WebPlaybackState;
  autoplay_failed: null;
}

// Errors

interface PlayerErrorMap {
  initialization_error: WebPlaybackError;
  authentication_error: WebPlaybackError;
  account_error: WebPlaybackError;
  playback_error: WebPlaybackError;
}

// Objects

interface WebPlaybackPlayer {
  device_id: string;
}

interface WebPlaybackState {
  context: {
    uri: string | null;
    metadata: Record<string, unknown> | null;
  };
  disallows: {
    pausing: boolean | undefined;
    peeking_next: boolean | undefined;
    peeking_prev: boolean | undefined;
    resuming: boolean | undefined;
    seeking: boolean | undefined;
    skipping_next: boolean | undefined;
    skipping_prev: boolean | undefined;
    toggling_repeat_context: boolean | undefined;
    toggling_repeat_track: boolean | undefined;
    toggling_shuffle: boolean | undefined;
    undefined: boolean | undefined;
  };
  duration: number;
  loading: boolean;
  paused: boolean;
  playback_speed: number;
  position: number;
  repeat_mode: 0 | 1 | 2;
  shuffle: boolean;
  track_window: {
    current_track: WebPlaybackTrack;
    previous_tracks: WebPlaybackTrack[];
    next_tracks: WebPlaybackTrack[];
  };
}

interface WebPlaybackTrack {
  uri: string;
  id: string;
  type: "track" | "episode" | "ad";
  media_type: "audio" | "video";
  name: string;
  is_playable: boolean;
  album: {
    uri: string;
    name: string;
    images: Array<{
      height: number;
      size: string;
      url: string;
      width: number;
    }>;
  };
  artists: Array<{ uri: string; name: string }>;
}

interface WebPlaybackError {
  message: string;
}
