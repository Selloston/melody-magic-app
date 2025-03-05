
import React from 'react';
import { Song } from '../types/music';
import AlbumCover from './AlbumCover';
import SongInfo from './SongInfo';
import { cn } from "@/lib/utils";
import { Play, Pause, MoreHorizontal } from 'lucide-react';

interface MusicListProps {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  onSelectSong: (song: Song) => void;
  onPlayPause: (song: Song) => void;
  className?: string;
}

const MusicList: React.FC<MusicListProps> = ({
  songs,
  currentSong,
  isPlaying,
  onSelectSong,
  onPlayPause,
  className
}) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={cn("space-y-1", className)}>
      {songs.map((song) => {
        const isCurrentSong = currentSong?.id === song.id;
        const isCurrentPlaying = isCurrentSong && isPlaying;
        
        return (
          <div 
            key={song.id}
            className={cn(
              "flex items-center p-3 rounded-lg transition-all duration-200",
              isCurrentSong 
                ? "bg-music-highlight" 
                : "hover:bg-music-highlight/50"
            )}
            onClick={() => onSelectSong(song)}
          >
            <div className="relative w-10 h-10 mr-3">
              <AlbumCover 
                src={song.coverArt} 
                alt={song.album} 
                size="sm"
                isPlaying={isCurrentPlaying}
              />
              <div 
                className={cn(
                  "absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-200",
                  isCurrentPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayPause(song);
                  }}
                  className="text-white"
                >
                  {isCurrentPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
              </div>
            </div>
            
            <SongInfo 
              title={song.title}
              artist={song.artist}
              variant="compact"
              className="flex-1 min-w-0"
            />
            
            <div className="flex items-center space-x-4">
              <span className="text-xs text-music-muted">{formatTime(song.duration)}</span>
              <button 
                className="text-music-muted hover:text-music-text p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  // Menu actions will be implemented later
                }}
              >
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MusicList;
