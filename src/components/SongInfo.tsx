
import React from 'react';
import { cn } from "@/lib/utils";

interface SongInfoProps {
  title: string;
  artist: string;
  album?: string;
  variant?: 'default' | 'compact' | 'nowPlaying';
  className?: string;
  onClick?: () => void;
}

const SongInfo: React.FC<SongInfoProps> = ({
  title,
  artist,
  album,
  variant = 'default',
  className,
  onClick
}) => {
  const rootClassName = cn(
    "flex flex-col overflow-hidden", 
    onClick && "cursor-pointer",
    className
  );
  
  if (variant === 'compact') {
    return (
      <div className={rootClassName} onClick={onClick}>
        <div className="scroll-text">
          <div className="scroll-inner text-sm font-medium line-clamp-1">{title}</div>
        </div>
        <div className="text-xs text-music-muted line-clamp-1">{artist}</div>
      </div>
    );
  }
  
  if (variant === 'nowPlaying') {
    return (
      <div className={cn("flex flex-col items-center text-center space-y-1", className)} onClick={onClick}>
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
        <p className="text-base text-music-muted">{artist}</p>
        {album && <p className="text-sm text-music-muted/70">{album}</p>}
      </div>
    );
  }

  return (
    <div className={rootClassName} onClick={onClick}>
      <div className="scroll-text">
        <div className="scroll-inner text-base font-medium line-clamp-1">{title}</div>
      </div>
      <div className="text-sm text-music-muted line-clamp-1">{artist}</div>
      {album && <div className="text-xs text-music-muted/70 line-clamp-1">{album}</div>}
    </div>
  );
};

export default SongInfo;
