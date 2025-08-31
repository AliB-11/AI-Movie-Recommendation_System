import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieSkeleton";
import { useMoviesByIds } from "../hooks/useMoviesByIds";
import useSearch from "../hooks/useSearch";

interface Props {
  query: string;
}

const RecommendedMovieGrid = ({ query }: Props) => {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; //map 6 skeletons

  const { data: searchResults, isLoading } = useSearch(query, query.length > 0); // e.g. ["101", "102"]

  const movieQueries = useMoviesByIds(searchResults?.recommendation);

  return (
    <SimpleGrid
      padding={"25px"}
      spacing={8}
      columns={{ base: 2, md: 3, lg: 4, xl: 5, "2xl": 6 }}
    >
      {isLoading
        ? skeletons.map((skeleton) => <MovieCardSkeleton key={skeleton} />)
        : movieQueries.map((movie) =>
            movie.data ? (
              <MovieCard key={movie.data.id} movie={movie.data} />
            ) : null
          )}
    </SimpleGrid>
  );
};

export default RecommendedMovieGrid;
