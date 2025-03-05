
import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, VolumeX } from 'lucide-react';
import { cn } from "@/lib/utils";

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onShuffle?: () => void;
  onRepeat?: () => void;
  onVolumeChange?: (value: number) => void;
  onMute?: () => void;
  currentTime?: number;
  duration?: number;
  volume?: number;
  isMuted?: boolean;
  isShuffled?: boolean;
  repeatMode?: 'none' | 'all' | 'one';
  variant?: 'full' | 'compact' | 'mini';
  className?: string;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onShuffle,
  onRepeat,
  onVolumeChange,
  onMute,
  currentTime = 0,
  duration = 0,
  volume = 1,
  isMuted = false,
  isShuffled = false,
  repeatMode = 'none',
  variant = 'full',
  className
}) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (variant === 'mini') {
    return (
      <div className={cn("flex items-center justify-center space-x-2", className)}>
        <button 
          className="text-music-muted hover:text-music-text transition-colors"
          onClick={onPlayPause}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>
        <div className="flex items-center justify-between">
          <span className="text-xs text-music-muted">{formatTime(currentTime)}</span>
          <div className="flex items-center space-x-4">
            <button 
              className="text-music-muted hover:text-music-text transition-colors"
              onClick={onPrevious}
              aria-label="Previous"
            >
              <SkipBack size={18} />
            </button>
            <button 
              className="w-9 h-9 rounded-full bg-music-accent flex items-center justify-center btn-hover"
              onClick={onPlayPause}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} fill="white" />}
            </button>
            <button 
              className="text-music-muted hover:text-music-text transition-colors"
              onClick={onNext}
              aria-label="Next"
            >
              <SkipForward size={18} />
            </button>
          </div>
          <span className="text-xs text-music-muted">{formatTime(duration)}</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col space-y-3 w-full", className)}>
      {/* Progress bar */}
      <div className="flex items-center space-x-2">
        <span className="text-xs text-music-muted w-8 text-right">{formatTime(currentTime)}</span>
        <div className="progress-bar flex-1">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>
        <span className="text-xs text-music-muted w-8">{formatTime(duration)}</span>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className={cn(
              "p-2 rounded-full transition-colors",
              isShuffled ? "text-music-accent" : "text-music-muted hover:text-music-text"
            )}
            onClick={onShuffle}
            aria-label="Shuffle"
          >
            <Shuffle size={18} />
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 text-music-muted hover:text-music-text transition-colors"
            onClick={onPrevious}
            aria-label="Previous"
          >
            <SkipBack size={24} />
          </button>
          <button 
            className="w-14 h-14 rounded-full bg-music-accent flex items-center justify-center shadow-lg btn-hover"
            onClick={onPlayPause}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={28} /> : <Play size={28} fill="white" />}
          </button>
          <button 
            className="p-2 text-music-muted hover:text-music-text transition-colors"
            onClick={onNext}
            aria-label="Next"
          >
            <SkipForward size={24} />
          </button>
        </div>
        
        <div className="flex items-center">
          <button 
            className={cn(
              "p-2 rounded-full transition-colors",
              repeatMode !== 'none' ? "text-music-accent" : "text-music-muted hover:text-music-text"
            )}
            onClick={onRepeat}
            aria-label="Repeat"
          >
            <Repeat size={18} />
          </button>
        </div>
      </div>
      
      {/* Volume controls */}
      <div className="flex items-center space-x-2">
        <button 
          className="text-music-muted hover:text-music-text transition-colors"
          onClick={onMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={(e) => onVolumeChange && onVolumeChange(parseFloat(e.target.value))}
          className="flex-1 accent-music-accent h-1 bg-music-primary rounded-full appearance-none"
        />
      </div>
    </div>
  );
};

export default PlayerControls;
