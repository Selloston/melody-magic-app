
import { useState, useEffect } from 'react';
import { Song, PlayerState } from '../types/music';

interface UsePlayerStateProps {
  initialSongs: Song[];
}

export const usePlayerState = ({ initialSongs }: UsePlayerStateProps) => {
  const [songs, setSongs] = useState<Song[]>(initialSongs);
  
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentSong: songs.length > 0 ? songs[0] : null,
    isPlaying: false,
    progress: 0,
    volume: 0.7,
    isMuted: false,
    isShuffled: false,
    repeatMode: 'none'
  });

  useEffect(() => {
    // Update songs when initialSongs changes
    setSongs(initialSongs);
    // If no current song is set, set the first song as current
    if (!playerState.currentSong && initialSongs.length > 0) {
      setPlayerState(prev => ({
        ...prev,
        currentSong: initialSongs[0]
      }));
    }
  }, [initialSongs]);

  const handlePlayPause = () => {
    setPlayerState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying
    }));
  };

  const handleSelectSong = (song: Song) => {
    if (playerState.currentSong?.id === song.id) {
      handlePlayPause();
    } else {
      setPlayerState(prev => ({
        ...prev,
        currentSong: song,
        isPlaying: true,
        progress: 0
      }));
    }
  };

  const handleNext = () => {
    if (!playerState.currentSong || songs.length <= 1) return;
    
    const currentIndex = songs.findIndex(song => song.id === playerState.currentSong?.id);
    let nextIndex: number;
    
    if (playerState.isShuffled) {
      // Get random index different from current
      do {
        nextIndex = Math.floor(Math.random() * songs.length);
      } while (nextIndex === currentIndex && songs.length > 1);
    } else {
      // Get next index with wraparound
      nextIndex = (currentIndex + 1) % songs.length;
    }
    
    setPlayerState(prev => ({
      ...prev,
      currentSong: songs[nextIndex],
      isPlaying: true,
      progress: 0
    }));
  };

  const handlePrevious = () => {
    if (!playerState.currentSong || songs.length <= 1) return;
    
    const currentIndex = songs.findIndex(song => song.id === playerState.currentSong?.id);
    
    // If more than 3 seconds into song, restart it
    if (playerState.progress > 3) {
      setPlayerState(prev => ({
        ...prev,
        progress: 0
      }));
      return;
    }
    
    let prevIndex: number;
    
    if (playerState.isShuffled) {
      // Get random index different from current
      do {
        prevIndex = Math.floor(Math.random() * songs.length);
      } while (prevIndex === currentIndex && songs.length > 1);
    } else {
      // Get previous index with wraparound
      prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    }
    
    setPlayerState(prev => ({
      ...prev,
      currentSong: songs[prevIndex],
      isPlaying: true,
      progress: 0
    }));
  };

  const handleVolumeChange = (value: number) => {
    setPlayerState(prev => ({
      ...prev,
      volume: value,
      isMuted: false
    }));
  };

  const handleToggleMute = () => {
    setPlayerState(prev => ({
      ...prev,
      isMuted: !prev.isMuted
    }));
  };

  const handleToggleShuffle = () => {
    setPlayerState(prev => ({
      ...prev,
      isShuffled: !prev.isShuffled
    }));
  };

  const handleToggleRepeat = () => {
    setPlayerState(prev => {
      const modes: PlayerState['repeatMode'][] = ['none', 'all', 'one'];
      const currentIndex = modes.indexOf(prev.repeatMode);
      const nextIndex = (currentIndex + 1) % modes.length;
      return {
        ...prev,
        repeatMode: modes[nextIndex]
      };
    });
  };

  const updateProgress = (time: number) => {
    setPlayerState(prev => ({
      ...prev,
      progress: time
    }));
  };

  return {
    songs,
    playerState,
    setPlayerState,
    handlePlayPause,
    handleSelectSong,
    handleNext,
    handlePrevious,
    handleVolumeChange,
    handleToggleMute,
    handleToggleShuffle,
    handleToggleRepeat,
    updateProgress
  };
};
