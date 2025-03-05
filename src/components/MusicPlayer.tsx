
import React from 'react';
import { Song } from '../types/music';
import PlayerControls from './PlayerControls';
import AlbumCover from './AlbumCover';
import SongInfo from './SongInfo';
import AudioPlayer from './AudioPlayer';
import { usePlayerState } from '../hooks/usePlayerState';
import { cn } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';

interface MusicPlayerProps {
  songs: Song[];
  className?: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ songs, className }) => {
  const navigate = useNavigate();
  
  const { 
    playerState, 
    handlePlayPause, 
    handleNext, 
    handlePrevious, 
    handleVolumeChange, 
    handleToggleMute, 
    handleToggleShuffle, 
    handleToggleRepeat,
    updateProgress
  } = usePlayerState({ initialSongs: songs });

  const handleOpenNowPlaying = () => {
    if (playerState.currentSong) {
      navigate('/now-playing');
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <AudioPlayer 
        playerState={playerState}
        onEnded={handleNext}
        onUpdateProgress={updateProgress}
      />
      
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
