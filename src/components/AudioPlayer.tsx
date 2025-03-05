
import React, { useEffect, useRef } from 'react';
import { PlayerState } from '../types/music';

interface AudioPlayerProps {
  playerState: PlayerState;
  onEnded: () => void;
  onUpdateProgress: (time: number) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  playerState,
  onEnded,
  onUpdateProgress,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
      onUpdateProgress(audio.currentTime);
    };
    
    const handleEnded = () => {
      if (playerState.repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play().catch(console.error);
      } else {
        onEnded();
      }
    };
    
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playerState.repeatMode, onEnded, onUpdateProgress]);

  // Handle seeking
  useEffect(() => {
    if (audioRef.current && playerState.progress === 0) {
      audioRef.current.currentTime = 0;
    }
  }, [playerState.progress]);

  return null; // This is a non-visual component
};

export default AudioPlayer;
