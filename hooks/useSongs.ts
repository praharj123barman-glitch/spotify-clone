"use client";

import { useEffect, useState } from "react";
import supabase from "@/libs/supabaseClient";

export interface Song {
  id: string;
  title: string;
  author: string;
  song_path: string;
  image_path: string;
}

const useSongs = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      const { data, error } = await supabase
        .from("songs")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) setSongs(data);
      setLoading(false);
    };

    fetchSongs();
  }, []);

  const getSongUrl = (path: string) => {
    const { data } = supabase.storage.from("songs").getPublicUrl(path);
    return data.publicUrl;
  };

  const getImageUrl = (path: string) => {
    const { data } = supabase.storage.from("images").getPublicUrl(path);
    return data.publicUrl;
  };

  return { songs, loading, getSongUrl, getImageUrl };
};

export default useSongs;