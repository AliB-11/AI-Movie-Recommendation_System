import { useQuery } from "@tanstack/react-query";
import { MovieQuery } from "../App";

import APIClient from "../services/api-client";

export interface MovieObjects {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;

}

interface MovieResponse{
  results: MovieObjects[]
}


const apiClient = new APIClient<MovieObjects>('/discover/movie', 'results');
const apiClientSearch = new APIClient<MovieObjects>('/search/movie', 'results');


const useMovies = (selectedParams: MovieQuery | null, searchText :string | null, endpoint:string) => {

  if (endpoint === '/discover/movie') { 
    const genre_name = (selectedParams?.genre?.id)?.toString();
    return useQuery<MovieObjects[],Error>({
      queryKey: ['movies', selectedParams],
      enabled: !!selectedParams, // will not run until selectedParams is truthy
      queryFn: () => apiClient.getAll({
        params: {
          with_genres:genre_name, 
          sort_by:selectedParams?.filter?.value, 
          page:1}})




      // ()=> 
      //   apiClient.get<MovieResponse>(endpoint,{params: {with_genres:genre_name, sort_by:selectedParams?.filter?.value, page:1}}).then(res=>res.data.results)
    })



    //return useData<MovieObjects>(endpoint, {params: {with_genres:genre_name, sort_by:selectedParams?.filter?.value, page:1}}, [selectedParams])
  } else { 
    const search = (searchText)?.toString()
    return useQuery<MovieObjects[],Error>({
      queryKey: ['searchMovies',searchText], 
      enabled: !!searchText, // only runs when you actually have text
      queryFn: () => apiClientSearch.getAll({params: {query:search}})



      // () => apiClient.get<MovieResponse>('/search/movie', {params: {query:search}}).then(res=>res.data.results)

    })




  // return useSearch<MovieObjects>('/search/movie', {params: {query:search}}, [searchText])
  }


}

export default useMovies;