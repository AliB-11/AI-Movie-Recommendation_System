import React from "react";
import { useParams } from "react-router-dom";
import useMovieId from "../hooks/useMovieId";
import { Heading, Spinner, Text } from "@chakra-ui/react";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data: movie, isLoading, error } = useMovieId(id!);

  if (isLoading) return <Spinner />;

  if (error || !movie) throw error;

  return (
    <>
      <Heading>{movie.title}</Heading>
      <Text>{movie.overview}</Text>
    </>
  );
};

export default MovieDetailPage;
