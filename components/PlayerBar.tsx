"use client";

import { useState, useRef, useEffect } from "react";
import { BsPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Song } from "@/hooks/useSongs";


interface PlayerBarProps {
  currentSong?: Song;
  songUrl?: string;
  imageUrl?: string;
  onNext?: () => void;
  onPrev?: () => void;
}

const PlayerBar: React.FC<PlayerBarProps> = ({ currentSong, songUrl, imageUrl, onNext, onPrev }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!songUrl || !audioRef.current) return;
    const audio = audioRef.current;
    audio.pause();
    audio.src = songUrl;
    audio.volume = volume / 100;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [songUrl]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (e) {
        console.log("Play error:", e);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "#111", borderTop: "1px solid #282828", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "90px", zIndex: 100 }}>
      <audio
        ref={audioRef}
        onTimeUpdate={() => setProgress(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={() => { setIsPlaying(false); onNext?.(); }}
      />

      {/* Left - Song Info + Visualizer */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "280px" }}>
        <div style={{ width: "48px", height: "48px", backgroundColor: "#333", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0, overflow: "hidden" }}>
          {imageUrl
            ? <img src={imageUrl} alt="cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : "🎵"}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: "white", fontSize: "14px", fontWeight: "600", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {currentSong?.title || "No song selected"}
          </p>
          <p style={{ color: "#a3a3a3", fontSize: "12px" }}>{currentSong?.author || "..."}</p>
          
        </div>
        <button
          onClick={() => setIsLiked(!isLiked)}
          style={{ background: "none", border: "none", cursor: "pointer", color: isLiked ? "#22c55e" : "#a3a3a3", fontSize: "20px" }}
        >
          {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
      </div>

      {/* Center - Controls */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <button onClick={onPrev} style={{ background: "none", border: "none", cursor: "pointer", color: "#a3a3a3", fontSize: "24px" }}>
            <MdSkipPrevious />
          </button>
          <button onClick={togglePlay} style={{ background: "none", border: "none", cursor: "pointer", color: "white", fontSize: "40px" }}>
            {isPlaying ? <BsPauseCircleFill /> : <BsPlayCircleFill />}
          </button>
          <button onClick={onNext} style={{ background: "none", border: "none", cursor: "pointer", color: "#a3a3a3", fontSize: "24px" }}>
            <MdSkipNext />
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", maxWidth: "400px" }}>
          <span style={{ color: "#a3a3a3", fontSize: "11px" }}>{formatTime(progress)}</span>
          <div
            style={{ flex: 1, height: "4px", backgroundColor: "#333", borderRadius: "2px", cursor: "pointer" }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - rect.left) / rect.width;
              if (audioRef.current) audioRef.current.currentTime = pct * duration;
            }}
          >
            <div style={{ width: `${duration ? (progress / duration) * 100 : 0}%`, height: "100%", backgroundColor: "#22c55e", borderRadius: "2px" }} />
          </div>
          <span style={{ color: "#a3a3a3", fontSize: "11px" }}>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right - Volume */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "200px", justifyContent: "flex-end" }}>
        <button
          onClick={() => setVolume(volume === 0 ? 70 : 0)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#a3a3a3", fontSize: "20px" }}
        >
          {volume === 0 ? <HiSpeakerXMark /> : <HiSpeakerWave />}
        </button>
        <input
          type="range" min={0} max={100} value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          style={{ width: "100px", accentColor: "#22c55e", cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default PlayerBar;