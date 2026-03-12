import { create } from "zustand";
import { Song } from "@/hooks/useSongs";

interface PlayerStore {
  currentSong: Song | undefined;
  songUrl: string | undefined;
  imageUrl: string | undefined;
  isPlaying: boolean;
  songs: Song[];
  songUrls: string[];
  imageUrls: string[];
  currentIndex: number;

  setSong: (song: Song, url: string, imgUrl: string, songs: Song[], songUrls: string[], imageUrls: string[], index: number) => void;
  setIsPlaying: (playing: boolean) => void;
  playNext: () => void;
  playPrev: () => void;
}

const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: undefined,
  songUrl: undefined,
  imageUrl: undefined,
  isPlaying: false,
  songs: [],
  songUrls: [],
  imageUrls: [],
  currentIndex: 0,

  setSong: (song, url, imgUrl, songs, songUrls, imageUrls, index) => set({
    currentSong: song,
    songUrl: url,
    imageUrl: imgUrl,
    songs,
    songUrls,
    imageUrls,
    currentIndex: index,
    isPlaying: true,
  }),

  setIsPlaying: (playing) => set({ isPlaying: playing }),

  playNext: () => {
    const { songs, songUrls, imageUrls, currentIndex } = get();
    if (songs.length === 0) return;
    const next = (currentIndex + 1) % songs.length;
    set({
      currentIndex: next,
      currentSong: songs[next],
      songUrl: songUrls[next],
      imageUrl: imageUrls[next],
    });
  },

  playPrev: () => {
    const { songs, songUrls, imageUrls, currentIndex } = get();
    if (songs.length === 0) return;
    const prev = (currentIndex - 1 + songs.length) % songs.length;
    set({
      currentIndex: prev,
      currentSong: songs[prev],
      songUrl: songUrls[prev],
      imageUrl: imageUrls[prev],
    });
  },
}));

export default usePlayerStore;