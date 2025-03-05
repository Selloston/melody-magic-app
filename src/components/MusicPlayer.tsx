
import React, { useState, useEffect, useRef } from 'react';
import { Song, PlayerState } from '../types/music';
import PlayerControls from './PlayerControls';
import AlbumCover from './AlbumCover';
import SongInfo from './SongInfo';
import { cn } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';

interface MusicPlayerProps {
  songs: Song[];
  className?: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ songs, className }) => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentSong: songs.length > 0 ? songs[0] : null,
    isPlaying: false,
    progress: 0,
    volume: 0.7,
    isMuted: false,
    isShuffled: false,
    repeatMode: 'none'
  });

  // Create audio element
  useEffect(() => {
    audioRef.current = new Audio();
    
    // Set initial volume
    if (audioRef.current) {
      audioRef.current.volume = playerState.volume;
    }
    
    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Load song when it changes
  useEffect(() => {
    if (audioRef.current && playerState.currentSong) {
      audioRef.current.src = playerState.currentSong.audioSrc;
      if (playerState.isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
          setPlayerState(prev => ({ ...prev, isPlaying: false }));
        });
      }
    }
  }, [playerState.currentSong]);

  // Handle play/pause changes
  useEffect(() => {
    if (audioRef.current) {
      if (playerState.isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
          setPlayerState(prev => ({ ...prev, isPlaying: false }));
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [playerState.isPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = playerState.isMuted ? 0 : playerState.volume;
    }
  }, [playerState.volume, playerState.isMuted]);

  // Setup audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    
    if (!audio) return;
    
    const updateProgress = () => {
      setPlayerState(prev => ({
        ...prev,
        progress: audio.currentTime
      }));
    };
    
    const handleEnded = () => {
      if (playerState.repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play().catch(console.error);
      } else {
        handleNext();
      }
    };
    
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playerState.repeatMode]);

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
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
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

  const handleOpenNowPlaying = () => {
    if (playerState.currentSong) {
      navigate('/now-playing');
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center space-x-3 mb-4">
        {playerState.currentSong && (
          <>
            <div onClick={handleOpenNowPlaying}>
              <AlbumCover
                src={playerState.currentSong.coverArt}
                alt={playerState.currentSong.album}
                size="md"
                isPlaying={playerState.isPlaying}
                className="cursor-pointer"
              />
            </div>
            <div className="flex-1 min-w-0">
              <SongInfo
                title={playerState.currentSong.title}
                artist={playerState.currentSong.artist}
                album={playerState.currentSong.album}
                className="cursor-pointer"
                onClick={handleOpenNowPlaying}
              />
              <PlayerControls
                isPlaying={playerState.isPlaying}
                onPlayPause={handlePlayPause}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onShuffle={handleToggleShuffle}
                onRepeat={handleToggleRepeat}
                onVolumeChange={handleVolumeChange}
                onMute={handleToggleMute}
                currentTime={playerState.progress}
                duration={playerState.currentSong.duration}
                volume={playerState.volume}
                isMuted={playerState.isMuted}
                isShuffled={playerState.isShuffled}
                repeatMode={playerState.repeatMode}
                variant="compact"
                className="mt-3"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
