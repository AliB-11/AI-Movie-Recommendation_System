import { useQuery } from "@tanstack/react-query";
import APIClient, { APIClientMovie } from "../services/api-client";
import { MovieObjects } from "./useMovies";

const apiClient = new APIClientMovie<MovieObjects>('/movie');
const useMovieId = (id: string) => useQuery({
  queryKey: ['movies', id],
  queryFn: () => apiClient.get(id)
});

export default useMovieId;