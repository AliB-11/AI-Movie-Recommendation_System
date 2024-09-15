import { MovieQuery } from "../App";
import useData from "./useData";
import { GenreObjects } from "./useGenres";
import useSearch from "./useSearch";

export interface MovieObjects {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;

}



const useMovies = (selectedParams: MovieQuery | null, searchText :string | null, endpoint:string) => {

  if (endpoint === '/discover/movie') { 
    const genre_name = (selectedParams?.genre?.id)?.toString();
    return useData<MovieObjects>(endpoint, {params: {with_genres:genre_name, sort_by:selectedParams?.filter?.value}}, [selectedParams])
  } else { 
    const search = (searchText)?.toString()
    return useSearch<MovieObjects>('/search/movie', {params: {query:search}}, [searchText])
  }


}

export default useMovies;