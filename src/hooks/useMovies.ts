import apiClient from "../services/api-client";
import { useEffect, useState } from "react";
import React from "react";
import { Text } from "@chakra-ui/react";
import { CanceledError } from "axios";

export interface MovieObjects {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;

}

interface FetchMovieResponse {
  results: MovieObjects[];
}

const useMovies = () => {
 
  const [data, setData] = useState<MovieObjects[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController(); 
    apiClient
      .get<FetchMovieResponse>("/movie/upcoming",  { signal: controller.signal })
      .then((res) => setData(res.data.results))
      .catch((err) => {
        if (err instanceof CanceledError) 
          return;
        setError(err.message)});

      return () => controller.abort();
  }, []);

  return {data, error}

}

export default useMovies