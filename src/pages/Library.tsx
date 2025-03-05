
import React, { useState } from 'react';
import Layout from '../components/Layout';
import MusicList from '../components/MusicList';
import { Song } from '../types/music';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Using the same mock data from Index.tsx
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

// For demo purposes
const playlists = [
  { id: 'p1', name: 'Favorites', songCount: 15 },
  { id: 'p2', name: 'Workout Mix', songCount: 23 },
  { id: 'p3', name: 'Chill Vibes', songCount: 18 },
  { id: 'p4', name: 'Study Focus', songCount: 12 },
];

const albums = [
  { id: 'a1', name: 'After Hours', artist: 'The Weeknd', year: 2020 },
  { id: 'a2', name: 'Future Nostalgia', artist: 'Dua Lipa', year: 2020 },
  { id: 'a3', name: 'Fine Line', artist: 'Harry Styles', year: 2019 },
  { id: 'a4', name: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?', artist: 'Billie Eilish', year: 2019 },
];

const Library = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
        <h1 className="text-2xl font-bold mb-6">Your Library</h1>
        
        <Tabs defaultValue="songs" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="songs">Songs</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            <TabsTrigger value="albums">Albums</TabsTrigger>
          </TabsList>
          
          <TabsContent value="songs" className="space-y-4">
            <MusicList
              songs={mockSongs}
              currentSong={currentSong}
              isPlaying={isPlaying}
              onSelectSong={handleSelectSong}
              onPlayPause={handleSelectSong}
            />
          </TabsContent>
          
          <TabsContent value="playlists" className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {playlists.map(playlist => (
                <div 
                  key={playlist.id}
                  className="bg-music-primary/10 rounded-xl p-4 hover:bg-music-primary/20 transition-colors duration-300"
                >
                  <h3 className="font-semibold">{playlist.name}</h3>
                  <p className="text-sm text-music-muted">{playlist.songCount} songs</p>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="albums" className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {albums.map(album => (
                <div 
                  key={album.id}
                  className="bg-music-primary/10 rounded-xl p-4 hover:bg-music-primary/20 transition-colors duration-300"
                >
                  <h3 className="font-semibold line-clamp-1">{album.name}</h3>
                  <p className="text-sm text-music-muted">{album.artist}</p>
                  <p className="text-xs text-music-muted/70">{album.year}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Library;
