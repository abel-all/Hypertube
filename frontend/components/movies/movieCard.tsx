import Image from "next/image"
import { BookmarkPlus, CheckCircle2, Star } from "lucide-react"
import { Movie } from "@/features/library/library.types"

type MovieCardProps = {
  movie: Movie
  watched?: boolean
  imageUrl: string
}

function MovieCard({ movie, watched = false, imageUrl }: MovieCardProps) {
  return (
    <div className="group movie-card relative aspect-[2/3] overflow-hidden rounded-xl border border-white/10 bg-surface-container-high shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition-transform duration-300 hover:z-10 hover:scale-[1.04] hover:shadow-[0_0_20px_rgba(255,180,170,0.2)]">
      <Image
        alt={movie.alt}
        className="object-cover"
        src={imageUrl}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
      />

      <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between p-2">
        <div className="inline-flex items-center gap-1 rounded-md border border-white/20 bg-primary-container/95 px-2 py-1 text-xs font-semibold text-white backdrop-blur-md">
          4K HDR
        </div>

        <button
          type="button"
          aria-label="Save movie"
          className="rounded-full bg-surface/80 p-1.5 text-on-surface-variant backdrop-blur-md transition-colors hover:text-white"
        >
          <BookmarkPlus className="size-4" />
        </button>
      </div>

      <div className="movie-metadata-overlay absolute inset-x-0 bottom-0 z-20 flex h-1/2 flex-col justify-end bg-gradient-to-t from-black/90 to-transparent p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {watched && (
          <div className="mb-2 inline-flex w-fit items-center rounded-md border border-white/20 bg-surface/80 px-2 py-1 text-xs font-semibold text-white backdrop-blur-md">
            <CheckCircle2 className="mr-1 size-4 text-primary" />
            Watched
          </div>
        )}

        <h3 className="mb-1 truncate text-xl font-semibold text-white">{movie.title}</h3>

        <div className="flex items-center gap-3 text-sm text-on-surface-variant">
          <span>{movie.year}</span>
          <div className="flex items-center text-[#F5C518]">
            <Star className="mr-1 size-3.5 fill-current" />
            {movie.rating}
          </div>
        </div>

        {movie.tags.length > 0 && (
          <div className="mt-3 flex gap-2">
            {movie.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-white/20 px-2 py-0.5 text-xs text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieCard