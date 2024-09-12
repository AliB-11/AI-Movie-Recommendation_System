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

const delay = (ms:number) => new Promise( resolve => setTimeout(resolve, ms));

const useMovies = () => {
 
  const [data, setData] = useState<MovieObjects[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController(); 
    setLoading(true);
    
    apiClient
      .get<FetchMovieResponse>("/discover/movie",  { signal: controller.signal })
      .then((res) => {setData(res.data.results); 
        delay(1100).then(() => setLoading(false))
        
      })
      .catch((err) => {
        if (err instanceof CanceledError) 
          return;
        setError(err.message);
        setLoading(false);
      });

      return () => controller.abort();
  }, []);

  return {data, error, isLoading}

}

export default useMovies