"use client";

import { useState } from "react";
import supabase from "@/libs/supabaseClient";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [songFile, setSongFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleUpload = async () => {
    if (!title || !author || !songFile || !imageFile) {
      setMessage("Please fill all fields and select files!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setMessage("Please log in first!"); setLoading(false); return; }

      // Upload song file
      const songFileName = `${user.id}-${Date.now()}-${songFile.name}`;
      const { error: songError } = await supabase.storage
        .from("songs").upload(songFileName, songFile);
      if (songError) throw songError;

      // Upload image file
      const imageFileName = `${user.id}-${Date.now()}-${imageFile.name}`;
      const { error: imageError } = await supabase.storage
        .from("images").upload(imageFileName, imageFile);
      if (imageError) throw imageError;

      // Save to database
      const { error: dbError } = await supabase.from("songs").insert({
        title, author,
        song_path: songFileName,
        image_path: imageFileName,
        user_id: user.id,
      });
      if (dbError) throw dbError;

      setMessage("Song uploaded successfully! 🎵");
      setTitle(""); setAuthor(""); setSongFile(null); setImageFile(null);
      setTimeout(() => { onClose(); setMessage(""); }, 1500);

    } catch (error: any) {
      setMessage(error.message || "Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: "#1a1a1a", borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "400px", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", color: "white", fontSize: "20px", cursor: "pointer" }}>✕</button>

        <h2 style={{ color: "white", fontSize: "24px", fontWeight: "700", marginBottom: "24px", textAlign: "center" }}>
          Upload a Song 🎵
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="text" placeholder="Song title" value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #333", backgroundColor: "#2a2a2a", color: "white", fontSize: "14px", outline: "none" }}
          />
          <input
            type="text" placeholder="Artist name" value={author}
            onChange={e => setAuthor(e.target.value)}
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #333", backgroundColor: "#2a2a2a", color: "white", fontSize: "14px", outline: "none" }}
          />

          <div>
            <p style={{ color: "#a3a3a3", fontSize: "13px", marginBottom: "6px" }}>Select song file (.mp3)</p>
            <input type="file" accept=".mp3,audio/*"
              onChange={e => setSongFile(e.target.files?.[0] || null)}
              style={{ color: "white", fontSize: "13px" }}
            />
          </div>

          <div>
            <p style={{ color: "#a3a3a3", fontSize: "13px", marginBottom: "6px" }}>Select cover image</p>
            <input type="file" accept="image/*"
              onChange={e => setImageFile(e.target.files?.[0] || null)}
              style={{ color: "white", fontSize: "13px" }}
            />
          </div>

          {message && (
            <p style={{ color: message.includes("success") ? "#22c55e" : "#ef4444", fontSize: "14px", textAlign: "center" }}>
              {message}
            </p>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            style={{ padding: "12px", borderRadius: "24px", border: "none", backgroundColor: "#22c55e", color: "black", fontWeight: "700", fontSize: "16px", cursor: "pointer", marginTop: "8px" }}
          >
            {loading ? "Uploading..." : "Upload Song"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;