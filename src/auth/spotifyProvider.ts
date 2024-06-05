import Spotify from "next-auth/providers/spotify";

interface SpotifyProfile {
  id: string;
  display_name: string;
  email: string;
  images: {
    url: string;
    width: number;
    height: number;
  }[];
  followers: {
    total: number;
  };
  country: string;
  product: "premium" | "free" | "open";
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
}

const spotifyScopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
  "user-follow-modify",
  "user-follow-read",
  "user-read-playback-position",
  "user-top-read",
  "user-read-recently-played",
  "user-library-modify",
  "user-library-read",
  "user-read-email",
  "user-read-private",
];

export default Spotify<SpotifyProfile>({
  authorization:
    "https://accounts.spotify.com/authorize?scope=" + spotifyScopes.join(" "),
  checks: ["state"],
  profile: (profile) => {
    return {
      id: profile.id,
      spotifyId: profile.id,
      name: profile.display_name,
      email: profile.email,
      images: profile.images.sort((a, b) => a.height - b.height),
      followers: profile.followers.total,
      country: profile.country,
      product: profile.product,
      explicitFiltered: profile.explicit_content.filter_enabled,
      explicitLocked: profile.explicit_content.filter_locked,
    };
  },
});
