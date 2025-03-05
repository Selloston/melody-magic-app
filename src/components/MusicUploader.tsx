
import React, { useState, useRef } from 'react';
import { Upload, Music } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Song } from '../types/music';
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

interface MusicUploaderProps {
  onSongUploaded: (song: Song) => void;
  className?: string;
}

const MusicUploader: React.FC<MusicUploaderProps> = ({ onSongUploaded, className }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    // Process each file
    Array.from(files).forEach(async (file) => {
      // Check if it's an audio file
      if (!file.type.startsWith('audio/')) {
        toast.error("Please upload only audio files");
        return;
      }

      try {
        // Create a URL for the audio file
        const audioUrl = URL.createObjectURL(file);
        
        // Get audio duration
        const audio = new Audio();
        audio.src = audioUrl;
        
        // Get metadata from the filename 
        let title = file.name.replace(/\.[^/.]+$/, "");
        let artist = "Unknown Artist";
        let album = "Local Upload";
        
        // Check if filename has format "Artist - Title"
        const nameParts = title.split(' - ');
        if (nameParts.length > 1) {
          artist = nameParts[0];
          title = nameParts.slice(1).join(' - ');
        }
        
        // Wait for audio metadata to load
        await new Promise((resolve) => {
          audio.onloadedmetadata = resolve;
        });
        
        // Create a new song object
        const newSong: Song = {
          id: generateRandomId(),
          title,
          artist,
          album,
          duration: audio.duration || 0,
          coverArt: 'https://picsum.photos/id/24/300/300', // Default cover art
          audioSrc: audioUrl,
          isLocal: true
        };
        
        // Add the song to the list
        onSongUploaded(newSong);
        toast.success(`Uploaded "${title}"`);
      } catch (error) {
        console.error("Error loading audio file:", error);
        toast.error("Failed to load audio file");
      }
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      className={cn(
        "w-full p-6 border-2 border-dashed rounded-xl transition-all duration-200",
        isDragging 
          ? "border-music-accent bg-music-primary/20" 
          : "border-music-primary/30 hover:border-music-primary/50",
        className
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-3 bg-music-primary/10 rounded-full">
          <Music size={28} className="text-music-accent" />
        </div>
        <div>
          <h3 className="font-medium">Upload Music Files</h3>
          <p className="text-sm text-music-muted mt-1">Drag and drop your music files here, or click to browse</p>
          <p className="text-xs text-music-muted mt-1">Supported formats: MP3, WAV, OGG, FLAC</p>
        </div>
        <Button 
          onClick={handleButtonClick}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Upload size={16} />
          <span>Browse Files</span>
        </Button>
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden"
          accept="audio/*"
          multiple
          onChange={(e) => handleFileUpload(e.target.files)}
        />
      </div>
    </div>
  );
};

export default MusicUploader;
