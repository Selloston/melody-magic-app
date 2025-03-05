
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverArt: string;
  audioSrc: string;
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  isMuted: boolean;
  isShuffled: boolean;
  repeatMode: 'none' | 'all' | 'one';
}
