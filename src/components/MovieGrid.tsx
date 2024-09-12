import { SimpleGrid, Text } from "@chakra-ui/react";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieSkeleton from "./MovieSkeleton";

const MovieGrid = () => {
  const { data, error, isLoading } = useMovies();

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //map 6 skeletons

  return (
    <>
      {error && <Text>{error}</Text>}

      <SimpleGrid
        spacing={12}
        columns={{ base: 2, md: 3, lg: 4, xl: 5 }}
        padding={"15px"}
      >
        {isLoading
          ? skeletons.map((skeleton) => <MovieSkeleton key={skeleton} />)
          : data.map((movie) => (
              <MovieCard key={movie.id} movie={movie}></MovieCard>
            ))}
      </SimpleGrid>
    </>
  );
};

export default MovieGrid;
