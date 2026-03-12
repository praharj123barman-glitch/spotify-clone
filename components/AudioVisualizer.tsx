"use client";

import { useEffect, useRef } from "react";

interface AudioVisualizerProps {
  isPlaying: boolean;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isPlaying, audioRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const connectedRef = useRef(false);

  useEffect(() => {
    if (!audioRef.current || !isPlaying) return;

    const setupAudio = () => {
      if (connectedRef.current) return;
      try {
        const context = new AudioContext();
        const analyser = context.createAnalyser();
        analyser.fftSize = 64;
        const source = context.createMediaElementSource(audioRef.current!);
        source.connect(analyser);
        analyser.connect(context.destination);
        contextRef.current = context;
        analyserRef.current = analyser;
        connectedRef.current = true;
      } catch (e) {
        console.log("Audio setup error:", e);
      }
    };

    setupAudio();

    const canvas = canvasRef.current;
    if (!canvas || !analyserRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    contextRef.current?.resume();

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        const green = Math.floor((dataArray[i] / 255) * 200) + 55;
        ctx.fillStyle = `rgb(0, ${green}, 80)`;
        ctx.beginPath();
        ctx.roundRect(x, canvas.height - barHeight, barWidth - 2, barHeight, 2);
        ctx.fill();
        x += barWidth;
      }
    };

    draw();

    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      cancelAnimationFrame(animationRef.current);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      width={180}
      height={32}
      style={{
        borderRadius: "4px",
        opacity: isPlaying ? 1 : 0,
        transition: "opacity 0.3s",
        display: "block",
        marginTop: "4px"
      }}
    />
  );
};

export default AudioVisualizer;