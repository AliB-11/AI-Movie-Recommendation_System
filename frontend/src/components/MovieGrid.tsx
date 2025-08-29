import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieSkeleton from "./MovieSkeleton";
import useMovieQueryStore, { MovieQuery } from "../store";

const MovieGrid = () => {
  const { movieQuery } = useMovieQueryStore();
  let endpoint;

  if (movieQuery.searchText) {
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
  } = useMovies(movieQuery, movieQuery.searchText, endpoint);

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
