"use client";

import type { Movie } from "@/features/library/details/details.types";
import { getProgressPercent } from "../utils/time";
import Footer from "../layout/footer";
import Navbar from "../layout/navbar";
import { Play, Volume2, Settings, Maximize, Plus, Check, Download } from "lucide-react";

export interface MovieDetailsViewProps {
  movie: Movie;
  inMyList: boolean;
  onToggleMyList: () => void;
}

export function MovieDetailsView({ movie, inMyList, onToggleMyList }: MovieDetailsViewProps) {
  const progressPercent = getProgressPercent(
    movie.streaming.watchedPercent,
    movie.streaming.elapsed,
    movie.streaming.total
  );

  return (
    <div className="bg-[#131314] text-[#e5e2e3] antialiased min-h-screen flex flex-col font-sans selection:bg-[#e50914] selection:text-white">
      <Navbar />
      <main className="flex-grow flex flex-col">
        {/* Hero Section */}
        <section className="relative w-full h-[614px] md:h-[819px] flex items-end pb-12 px-4 md:px-16">
          <div className="absolute inset-0 z-0">
            <div
              className="bg-cover bg-center bg-no-repeat w-full h-full"
              style={{ backgroundImage: `url('${movie.heroImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131314] via-[#131314]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#131314] via-[#131314]/50 to-transparent w-2/3" />
          </div>

          <div className="relative z-10 w-full max-w-4xl flex flex-col gap-6">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#e5e2e3] [text-shadow:0_0_20px_rgba(229,9,20,0.5)]">
              {movie.title.toUpperCase()}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold tracking-wide text-[#e9bcb6]">
              <div className="flex items-center gap-1 text-[#ffb4aa]">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="font-bold">{movie.rating.toFixed(1)}</span>
              </div>
              <span>•</span>
              <span>{movie.year}</span>
              <span>•</span>
              <span>{movie.duration}</span>
              <span>•</span>
              <div className="flex gap-2 flex-wrap">
                {movie.genres.map((genre) => (
                  <span key={genre} className="px-2 py-0.5 rounded border border-white/20 bg-white/[0.03] backdrop-blur-xl">
                    {genre}
                  </span>
                ))}
              </div>
              <span className="px-2 py-0.5 rounded border border-white/40 font-bold ml-2">{movie.quality} HDR</span>
            </div>
            <p className="text-base md:text-lg text-[#e5e2e3] max-w-2xl line-clamp-3 md:line-clamp-none">
              {movie.synopsis}
            </p>
            <div className="flex gap-4 mt-3">
              <button className="bg-[#e50914] text-white font-semibold text-sm px-10 py-3 rounded flex items-center gap-2 hover:bg-[#e50914]/90 transition-colors shadow-[0_0_20px_rgba(229,9,20,0.4)]">
                <Play className="w-5 h-5" fill="currentColor" />
                PLAY NOW
              </button>
              <button
                onClick={onToggleMyList}
                className="bg-white/[0.03] backdrop-blur-xl border border-white/10 text-[#e5e2e3] font-semibold text-sm px-6 py-3 rounded flex items-center gap-2 hover:bg-white/10 transition-colors"
              >
                {inMyList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {inMyList ? "IN MY LIST" : "MY LIST"}
              </button>
            </div>
          </div>
        </section>

        {/* Streaming Section (Player Placeholder) */}
        <section className="px-4 md:px-16 py-20">
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden shadow-2xl relative aspect-video bg-[#0e0e0f] group cursor-pointer">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-20 transition-opacity duration-500"
              style={{ backgroundImage: `url('${movie.videoPreviewImage}')` }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-20 h-20 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 flex items-center justify-center text-[#e50914] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                <Play className="w-9 h-9" fill="currentColor" />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                <div className="h-full bg-[#e50914]" style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }} />
              </div>
              <div className="flex justify-between items-center text-white">
                <div className="flex items-center gap-6">
                  <Play className="w-5 h-5 hover:text-[#e50914] cursor-pointer transition-colors" fill="currentColor" />
                  <Volume2 className="w-5 h-5 hover:text-[#e50914] cursor-pointer transition-colors" />
                  <span className="text-sm font-semibold">
                    {movie.streaming.elapsed} / {movie.streaming.total}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs font-bold px-2 py-1 border border-white/30 rounded cursor-pointer hover:bg-white/10">
                    SUB
                  </span>
                  <Settings className="w-5 h-5 hover:text-[#e50914] cursor-pointer transition-colors" />
                  <Maximize className="w-5 h-5 hover:text-[#e50914] cursor-pointer transition-colors" />
                </div>
              </div>
            </div>

            <div className="absolute top-3 right-3 flex gap-2">
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${movie.streaming.ready ? "bg-emerald-500 animate-pulse" : "bg-white/40"}`} />
                <span className="text-xs font-semibold">{movie.streaming.ready ? "Ready to Stream" : "Preparing…"}</span>
              </div>
              {movie.streaming.downloadProgress < 100 && (
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2">
                  <Download className="w-3.5 h-3.5" />
                  <span className="text-xs font-semibold">{movie.streaming.downloadProgress}%</span>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}