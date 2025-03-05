
import React from 'react';
import Layout from '../components/Layout';
import MusicPlayer from '../components/MusicPlayer';
import MusicList from '../components/MusicList';
import { Song } from '../types/music';

// Mock data - replace with real API data in a production app
const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 203,
    coverArt: 'https://picsum.photos/id/10/300/300',
    audioSrc: 'https://example.com/song1.mp3',
  },
  {
    id: '2',
    title: 'Save Your Tears',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 216,
    coverArt: 'https://picsum.photos/id/11/300/300',
    audioSrc: 'https://example.com/song2.mp3',
  },
  {
    id: '3',
    title: 'bad guy',
    artist: 'Billie Eilish',
    album: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?',
    duration: 194,
    coverArt: 'https://picsum.photos/id/12/300/300',
    audioSrc: 'https://example.com/song3.mp3',
  },
  {
    id: '4',
    title: 'Stay',
    artist: 'The Kid LAROI & Justin Bieber',
    album: 'F*CK LOVE 3: OVER YOU',
    duration: 138,
    coverArt: 'https://picsum.photos/id/13/300/300',
    audioSrc: 'https://example.com/song4.mp3',
  },
  {
    id: '5',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: 217,
    coverArt: 'https://picsum.photos/id/14/300/300',
    audioSrc: 'https://example.com/song5.mp3',
  },
  {
    id: '6',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    album: 'Fine Line',
    duration: 174,
    coverArt: 'https://picsum.photos/id/15/300/300',
    audioSrc: 'https://example.com/song6.mp3',
  },
  {
    id: '7',
    title: 'positions',
    artist: 'Ariana Grande',
    album: 'Positions',
    duration: 172,
    coverArt: 'https://picsum.photos/id/16/300/300',
    audioSrc: 'https://example.com/song7.mp3',
  },
  {
    id: '8',
    title: 'Mood',
    artist: '24kGoldn ft. iann dior',
    album: 'El Dorado',
    duration: 141,
    coverArt: 'https://picsum.photos/id/17/300/300',
    audioSrc: 'https://example.com/song8.mp3',
  }
];

const Index = () => {
  const [currentSong, setCurrentSong] = React.useState<Song | null>(mockSongs[0]);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleSelectSong = (song: Song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  return (
    <Layout>
      <div className="container px-4 py-6 mx-auto">
        <h1 className="text-2xl font-bold mb-6">Music Player</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Now Playing</h2>
          <MusicPlayer 
            songs={mockSongs} 
            className="bg-music-primary/10 p-4 rounded-xl"
          />
        </section>
        
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recently Played</h2>
            <button className="text-sm text-music-accent hover:underline">
              See All
            </button>
          </div>
          
          <MusicList 
            songs={mockSongs} 
            currentSong={currentSong}
            isPlaying={isPlaying}
            onSelectSong={handleSelectSong}
            onPlayPause={handleSelectSong}
          />
        </section>
      </div>
    </Layout>
  );
};

export default Index;
