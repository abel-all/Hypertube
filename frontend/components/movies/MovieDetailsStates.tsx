"use client";

export function MovieDetailsLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#131314] text-[#e5e2e3]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-white/20 border-t-[#e50914] rounded-full animate-spin" />
        <p className="text-sm text-white/60 tracking-wide">Loading movie…</p>
      </div>
    </div>
  );
}

export interface MovieDetailsErrorProps {
  message: string;
  onRetry?: () => void;
}

export function MovieDetailsError({ message, onRetry }: MovieDetailsErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#131314] text-[#e5e2e3] px-6">
      <div className="text-center max-w-md flex flex-col items-center gap-4">
        <div>
          <p className="text-lg font-semibold mb-2">Couldn't load this title</p>
          <p className="text-sm text-white/60">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-[#e50914] text-white font-semibold text-sm px-6 py-2 rounded hover:bg-[#e50914]/90 transition-colors"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}