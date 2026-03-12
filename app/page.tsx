"use client";

import Header from "@/components/Header";
import PlayerBar from "@/components/PlayerBar";
import useSongs from "@/hooks/useSongs";
import usePlayerStore from "@/stores/usePlayerStore";

export default function Home() {
  const { songs, loading, getSongUrl, getImageUrl } = useSongs();
  const { currentSong, songUrl, imageUrl, setSong, playNext, playPrev } = usePlayerStore();

  const playSong = (index: number) => {
    const song = songs[index];
    const allSongUrls = songs.map(s => getSongUrl(s.song_path));
    const allImageUrls = songs.map(s => getImageUrl(s.image_path));
    setSong(song, getSongUrl(song.song_path), getImageUrl(song.image_path), songs, allSongUrls, allImageUrls, index);
  };

  const quickPlays = [
    { emoji: "🎵", label: "Liked Songs", color: "#22c55e" },
    { emoji: "🎸", label: "Top Hits", color: "#3b82f6" },
    { emoji: "🎤", label: "Podcasts", color: "#a855f7" },
  ];

  return (
    <div style={{ backgroundColor: "#111", borderRadius: "8px", height: "100%", overflowY: "auto" }}>
      <Header />
      <div style={{ padding: "24px", paddingBottom: "100px" }}>
        <h1 style={{ color: "white", fontSize: "28px", fontWeight: "700", marginBottom: "16px" }}>
          Welcome Back!
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "32px" }}>
          {quickPlays.map((item) => (
            <div
              key={item.label}
              style={{ display: "flex", alignItems: "center", gap: "16px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "6px", cursor: "pointer", overflow: "hidden" }}
            >
              <div style={{ backgroundColor: item.color, padding: "16px", fontSize: "24px" }}>{item.emoji}</div>
              <p style={{ color: "white", fontWeight: "600" }}>{item.label}</p>
            </div>
          ))}
        </div>

        <h2 style={{ color: "white", fontSize: "22px", fontWeight: "700", marginBottom: "16px" }}>
          {songs.length > 0 ? "Your Songs" : "No songs yet — upload one!"}
        </h2>

        {loading ? (
          <p style={{ color: "#a3a3a3" }}>Loading songs...</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px" }}>
            {songs.map((song, index) => (
              <div
                key={song.id}
                onClick={() => playSong(index)}
                style={{
                  backgroundColor: currentSong?.id === song.id ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.05)",
                  borderRadius: "8px",
                  padding: "16px",
                  cursor: "pointer",
                  border: currentSong?.id === song.id ? "1px solid #22c55e" : "1px solid transparent"
                }}
              >
                <div style={{ width: "100%", aspectRatio: "1", backgroundColor: "#333", borderRadius: "6px", marginBottom: "12px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px" }}>
                  {song.image_path
                    ? <img src={getImageUrl(song.image_path)} alt={song.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : "🎵"}
                </div>
                <p style={{ color: "white", fontWeight: "600", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {song.title}
                </p>
                <p style={{ color: "#a3a3a3", fontSize: "14px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {song.author}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <PlayerBar
        currentSong={currentSong}
        songUrl={songUrl}
        imageUrl={imageUrl}
        onNext={playNext}
        onPrev={playPrev}
      />
    </div>
  );
}