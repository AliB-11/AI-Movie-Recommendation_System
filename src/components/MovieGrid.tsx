import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { MovieQuery } from "../App";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieSkeleton from "./MovieSkeleton";

interface Props {
  selectedParams: MovieQuery | null;
  searchText: string | null;
}

const MovieGrid = ({ selectedParams, searchText }: Props) => {
  let endpoint;

  if (searchText) {
    endpoint = "/search/movie";
  } else {
    endpoint = "/discover/movie";
  }

  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useMovies(selectedParams, searchText, endpoint);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; //map 6 skeletons

  const fetchedMoviesCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  return (
    <>
      {error && <Text>{error.message}</Text>}
      <InfiniteScroll
        dataLength={fetchedMoviesCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner></Spinner>}
      >
        <SimpleGrid
          padding={"25px"}
          spacing={8}
          columns={{ base: 2, md: 3, lg: 4, xl: 5, "2xl": 6 }}
        >
          {isLoading
            ? skeletons.map((skeleton) => <MovieSkeleton key={skeleton} />)
            : data?.pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page.results.map((movie) => (
                    <MovieCard key={movie.id} movie={movie}></MovieCard>
                  ))}
                </React.Fragment>
              ))}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  );
};

export default MovieGrid;
