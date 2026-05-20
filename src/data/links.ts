export type StreamingLink = {
  name: "Apple Music" | "Spotify" | "TIDAL";
  url: string;
};

export const links: StreamingLink[] = [
  {
    name: "Apple Music",
    url: "https://music.apple.com/us/album/side-gate-summer/6770920963",
  },
  {
    name: "Spotify",
    url: "https://open.spotify.com/album/63hBXiIFRh4ZTCB9FtAK3g",
  },
  {
    name: "TIDAL",
    url: "https://tidal.com/album/526137406",
  },
];