# 🎵 Spotify Clone

A full-stack music streaming app built with **Next.js**, **Supabase**, and **TypeScript** — inspired by Spotify.

🔗 **Live Demo**: https://spotify-clone-theta-rust-38.vercel.app

---

## ✨ Features

- 🔐 **Authentication** — Email/password sign up & login via Supabase Auth
- 🎵 **Music Upload** — Upload MP3 files and cover images to Supabase Storage
- ▶️ **Real Audio Playback** — Play, pause, skip, seek, and volume control
- 🌍 **Global Player State** — Music keeps playing while navigating, powered by Zustand
- 📱 **Responsive UI** — Dark theme inspired by Spotify

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | Frontend framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Supabase | Auth + Database + Storage |
| Zustand | Global state management |
| Vercel | Deployment |

---

## 🚀 Getting Started
```bash
git clone https://github.com/praharj123barman-glitch/spotify-clone.git
cd spotify-clone
npm install
```

Create a `.env.local` file:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
```bash
npm run dev
```

---

## 💡 Challenges I Faced

- **Global audio state**: Managing a persistent audio player across page navigations was tricky. I solved this using Zustand to store the current song, URL, and playback state globally.
- **Supabase Storage URLs**: Getting public URLs for uploaded files required understanding Supabase's storage API and bucket policies.
- **Play/Pause race condition**: The browser's `play()` returns a Promise, so calling `pause()` immediately after caused errors. Fixed by properly handling the Promise before pausing.

---

## 📸 Screenshot

> *(Add a screenshot of your app here)*

---

Built with ❤️ by [Praha](https://github.com/praharj123barman-glitch)