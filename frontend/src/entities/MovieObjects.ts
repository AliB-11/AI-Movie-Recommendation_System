import { GenreObjects } from "./GenreObjects";

interface spoken_languages{
  english_name: string;
}


export interface MovieObjects {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  genres: GenreObjects[];
  overview: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  production_companies: GenreObjects[];
  spoken_languages: spoken_languages[];

}
