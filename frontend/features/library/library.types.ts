export type FilterKey = "genre" | "year" | "rating" | "language"

export type FilterOption = {
    key: FilterKey
    label: string
    options: string[]
}

export type Movie = {
    id?: number | string
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