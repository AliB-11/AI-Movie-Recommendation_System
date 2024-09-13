import { SimpleGrid, Text } from "@chakra-ui/react";
import MovieCard from "./MovieCard";
import MovieSkeleton from "./MovieSkeleton";
import useMovies from "../hooks/useMovies";
import { GenreObjects } from "../hooks/useGenres";

interface Props {
  selectedGenre: GenreObjects | null;
  searchText: string | null;
}

const MovieGrid = ({ selectedGenre, searchText }: Props) => {
  let endpoint;

  if (searchText) {
    endpoint = "/search/movie";
  } else {
    endpoint = "/discover/movie";
  }

  const { data, error, isLoading } = useMovies(
    selectedGenre,
    searchText,
    endpoint
  );

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; //map 6 skeletons

  return (
    <>
      {error && <Text>{error}</Text>}

      <SimpleGrid
        spacing={8}
        columns={{ base: 2, md: 3, lg: 4, xl: 5, "2xl": 6 }}
        padding={"25px"}
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
