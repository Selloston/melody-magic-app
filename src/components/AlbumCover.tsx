
import React from 'react';
import { cn } from "@/lib/utils";

interface AlbumCoverProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isPlaying?: boolean;
  onClick?: () => void;
  className?: string;
}

const AlbumCover: React.FC<AlbumCoverProps> = ({
  src,
  alt,
  size = 'md',
  isPlaying = false,
  onClick,
  className
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-56 h-56',
    xl: 'w-72 h-72'
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-xl shadow-xl",
        sizeClasses[size],
        isPlaying && 'album-rotate playing',
        className
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-black/20 z-10"></div>
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        loading="lazy"
      />
      {isPlaying && (
        <div className="absolute bottom-2 right-2 w-3 h-3 bg-music-accent rounded-full animate-pulse-subtle z-20"></div>
      )}
    </div>
  );
};

export default AlbumCover;
