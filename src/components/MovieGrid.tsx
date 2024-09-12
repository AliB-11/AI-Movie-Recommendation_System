import { SimpleGrid, Text } from "@chakra-ui/react";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";

const MovieGrid = () => {
  const { data, error } = useMovies();

  return (
    <>
      {error && <Text>{error}</Text>}

      <SimpleGrid
        spacing={10}
        columns={{ base: 2, md: 4, lg: 4, xl: 5 }}
        padding={"20px"}
      >
        {data.map((movie) => (
          <MovieCard key={movie.id} movie={movie}></MovieCard>
        ))}
      </SimpleGrid>
    </>
  );
};

export default MovieGrid;
