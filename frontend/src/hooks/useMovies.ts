import { useInfiniteQuery } from "@tanstack/react-query";

import ms from "ms";
import { APIClientMovie, fetchMovieResponse } from "../services/api-client";
import { MovieQuery } from "../store";
import { MovieObjects } from "../entities/MovieObjects";

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








// import apiClient, { fetchResponse } from "../services/api-client";
// import { useEffect, useState } from "react";
// import React from "react";
// import { Text } from "@chakra-ui/react";
// import { AxiosRequestConfig, CanceledError } from "axios";


// const delay = (ms:number) => new Promise( resolve => setTimeout(resolve, ms));

// const useSearch = <T>(endpoint:string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
 
//   const [data, setData] = useState<T[]>([]);
//   const [error, setError] = useState("");
//   const [isLoading, setLoading] = useState(false);

//   useEffect(() => {
//     const controller = new AbortController(); 
//     setLoading(true);
    
//     apiClient
//       .get<fetchResponse<T>>(endpoint,  { signal: controller.signal, ...requestConfig})
//       .then((res) => {setData(res.data.results); 
//         delay(1100).then(() => setLoading(false))
        
//       })
//       .catch((err) => {
//         if (err instanceof CanceledError) 
//           return;
//         setError(err.message);
//         setLoading(false);
//       });

//       return () => controller.abort();
//   }, deps? [...deps] : []);

//   return {data, error, isLoading}

// }

// export default useSearch