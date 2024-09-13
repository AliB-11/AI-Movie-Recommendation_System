import useData from "./useData";
import { GenreObjects } from "./useGenres";
import useSearch from "./useSearch";

export interface MovieObjects {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;

}



const useMovies = (selectedGenre: GenreObjects | null, searchText :string | null, endpoint:string) => {

  if (endpoint === '/discover/movie') { 
    const genre_name = (selectedGenre?.id)?.toString()
    return useData<MovieObjects>(endpoint, {params: {with_genres:genre_name}}, [selectedGenre?.id])
  } else { 
    const search = (searchText)?.toString()
    return useSearch<MovieObjects>('/search/movie', {params: {query:search}}, [searchText])
  }


}

export default useMovies;