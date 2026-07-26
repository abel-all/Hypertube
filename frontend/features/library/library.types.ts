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
    results?: Movie[]
    totalPages?: number
    page?: number

}

export type LibraryFilters = {
    search: string
    genre: string
    year: string
    rating: string
    language: string
    page: number
}

export interface MoviesResponse {
  page: number
  totalPages: number
  totalResults: number
  results: Movie[]
}