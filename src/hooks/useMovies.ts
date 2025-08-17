import { useInfiniteQuery } from "@tanstack/react-query";

import ms from "ms";
import { APIClientMovie, fetchMovieResponse } from "../services/api-client";
import { MovieQuery } from "../store";
import { GenreObjects } from "./useGenres";

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
}


const apiClient = new APIClientMovie<MovieObjects>('/discover/movie');
const apiClientSearch = new APIClientMovie<MovieObjects>('/search/movie');



const useMovies = (selectedParams: MovieQuery | undefined, searchText :string | undefined, endpoint:string) => {
  

  if (endpoint === '/discover/movie') { 
    const genre_name = (selectedParams?.genre?.id)?.toString();
    return useInfiniteQuery<fetchMovieResponse<MovieObjects>,Error>({
      queryKey: ['movies', selectedParams],
      enabled: true, // will not run until selectedParams is truthy
      queryFn: ({ pageParam = 1}) => apiClient.getAll({
        params: {
          with_genres:genre_name, 
          sort_by:selectedParams?.filter?.value, 
          page: pageParam}}),
          getNextPageParam:(lastPage, allPages) => {
            return  (lastPage.total_pages >= allPages.length + 1 ? allPages.length + 1 : undefined);
          },
          staleTime: ms('24')

    })

  } else { 
    const search = (searchText)?.toString()
    return useInfiniteQuery<fetchMovieResponse<MovieObjects>,Error>({
      queryKey: ['searchMovies',searchText], 
      enabled: !!searchText, // only runs when you actually have text
      queryFn: ({pageParam = 1}) => apiClientSearch.getAll({
        params:{ 
          query:search,
          page: pageParam}}),
          getNextPageParam:(lastPage, allPages) => {
            return  (lastPage.total_pages >= allPages.length + 1 ? allPages.length + 1 : undefined);
          }
    })
  
  }
}
export default useMovies;


















//return useData<MovieObjects>(endpoint, {params: {with_genres:genre_name, sort_by:selectedParams?.filter?.value, page:1}}, [selectedParams])
// return useSearch<MovieObjects>('/search/movie', {params: {query:search}}, [searchText])