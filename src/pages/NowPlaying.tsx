
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Song } from '../types/music';
import AlbumCover from '../components/AlbumCover';
import SongInfo from '../components/SongInfo';
import PlayerControls from '../components/PlayerControls';
import { ChevronDown, ListMusic } from 'lucide-react';

// Mock data for the current song (in a real app, this would be from a state management system)
const currentSong: Song = {
  id: '1',
  title: 'Blinding Lights',
  artist: 'The Weeknd',
  album: 'After Hours',
  duration: 203,
  coverArt: 'https://picsum.photos/id/10/300/300',
  audioSrc: 'https://example.com/song1.mp3',
};

const NowPlaying = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(30); // Mock progress (30 seconds in)
  
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-music-primary/10 to-music-background">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 text-music-text hover:text-music-accent transition-colors"
        >
          <ChevronDown size={24} />
        </button>
        <h1 className="text-lg font-semibold">Now Playing</h1>
        <button className="p-2 text-music-text hover:text-music-accent transition-colors">
          <ListMusic size={22} />
        </button>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-10">
        {/* Album artwork */}
        <div className="animate-scale-in">
          <AlbumCover 
            src={currentSong.coverArt} 
            alt={currentSong.album} 
            size="xl"
            isPlaying={isPlaying}
            className="shadow-2xl"
          />
        </div>
        
        {/* Song info */}
        <div className="w-full max-w-xs animate-fade-in">
          <SongInfo 
            title={currentSong.title}
            artist={currentSong.artist}
            album={currentSong.album}
            variant="nowPlaying"
          />
        </div>
        
        {/* Player controls */}
        <div className="w-full max-w-xs animate-fade-in">
          <PlayerControls 
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onNext={() => console.log('Next')}
            onPrevious={() => console.log('Previous')}
            onShuffle={() => console.log('Shuffle')}
            onRepeat={() => console.log('Repeat')}
            onVolumeChange={(vol) => console.log('Volume', vol)}
            onMute={() => console.log('Mute')}
            currentTime={progress}
            duration={currentSong.duration}
            volume={0.7}
            isMuted={false}
            isShuffled={false}
            repeatMode="none"
            variant="full"
          />
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
