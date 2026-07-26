export interface FindAllParams {
  search?: string;
  genre?: string;
  year?: string;
  rating?: string;
  language?: string;
  page?: number;
}

export interface Movie {
  id?: number | string;
  title: string;
  year: string;
  rating: string;
  tags: string[];
  image: string;
  alt: string;
  watched?: boolean;
}
