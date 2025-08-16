import { Grid, GridItem, HStack, Show, VStack } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import MovieGrid from "./components/MovieGrid";
import GenreList from "./components/GenreList";
import { GenreObjects } from "./hooks/useGenres";
import Heading from "./components/Heading";
import Filter from "./components/Filter";
import { Order } from "./components/Filter";
import useMovieQueryStore, { MovieQuery } from "./store";

function App() {
  // const [movieQuery, setMovieQuery] = useState<MovieQuery>({} as MovieQuery);
  const [search, setSearch] = useState<string | null>(null);

  console.log(search);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "160px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar></NavBar>
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingLeft={"15px"}>
          <GenreList />
        </GridItem>
      </Show>
      <GridItem area="main">
        <VStack align={"flex-start"} spacing={4} marginX={6}>
          <HStack>
            <Heading></Heading>
          </HStack>
          <HStack marginBottom={4}>
            <Filter></Filter>
          </HStack>
        </VStack>
        <MovieGrid></MovieGrid>
      </GridItem>
    </Grid>
  );
}

export default App;

//Nav Bar:    //onSearch={(searchText) => setSearch(searchText)}

//Filter: //setOrder={(filter) => setMovieQuery({ ...movieQuery, filter })} newOrder={movieQuery.filter}
