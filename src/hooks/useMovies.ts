import useData from "./useData";
import { GenreObjects } from "./useGenres";

export interface MovieObjects {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;

}



const useMovies = (selectedGenre: GenreObjects | null) => {

  const genre_name = (selectedGenre?.id)?.toString()

  return useData<MovieObjects>('/discover/movie', {params: {with_genres:genre_name}}, [selectedGenre?.id])
}

export default useMovies;