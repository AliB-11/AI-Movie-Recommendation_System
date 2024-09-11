import apiClient from "../services/api-client";
import { useEffect, useState } from "react";
import React from "react";
import { Text } from "@chakra-ui/react";

interface MovieObjects {
  id: number;
  title: string;
  vote_average: number;
}

interface FetchMovieResponse {
  results: MovieObjects[];
}

const MovieGrid = () => {
  const [data, setData] = useState<MovieObjects[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<FetchMovieResponse>("/movie/upcoming")
      .then((res) => setData(res.data.results))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      {error && <Text>{error}</Text>}

      <ul>
        {data.map((movie) => (
          <li key={movie.id}> {movie.title} </li>
        ))}
      </ul>
    </>
  );
};

export default MovieGrid;
