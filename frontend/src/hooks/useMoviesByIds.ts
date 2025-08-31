import { useQueries } from "@tanstack/react-query";
import APIClient, { APIClientMovie, fetchMovieResponse } from "../services/api-client";
import { MovieObjects } from "../entities/MovieObjects";

const apiClient = new APIClientMovie<MovieObjects>("/movie");

export const useMoviesByIds = (ids: number[] | undefined) => {
  const queries = useQueries({
    queries: (ids ?? []).map((id) => ({
      queryKey: ["movie", id],
      queryFn: (): Promise<MovieObjects> => apiClient.get(id.toString()),
      enabled: !!ids && ids.length > 0, // optional, disables fetch if no ids
    })),
  });

  return queries;
};