export type FilterKey = "genre" | "year" | "rating" | "language"

export type FilterOption = {
    key: FilterKey
    label: string
    options: string[]
}

export type Movie = {
    id?: string | number
    title: string
    year: string
    rating: string
    tags: string[]
    image: string
    alt: string
    watched?: boolean
}

export type LibraryFilters = {
    search: string
    genre: string
    year: string
    rating: string
    language: string
    page: number
}

export type CastMember = {
    id: string | number
    name: string
    character: string
    photo: string
    alt?: string
}

export type MovieDetails = {
    id: string | number
    title: string
    year: string
    duration: string
    rating: number
    genres: string[]
    quality?: string
    synopsis: string
    heroImage: string
    heroImageAlt?: string
    videoPreviewImage?: string
    videoPreviewImageAlt?: string
    inMyList: boolean
    streaming: {
        ready: boolean
        downloadProgress: number
        watchedPercent: number
        elapsed: string
        total: string
    }
    details: {
        director: string
        writers: string[]
        studio: string
        language: string
    }
    cast: CastMember[]
}