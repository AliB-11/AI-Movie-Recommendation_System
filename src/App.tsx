import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import MovieGrid from "./components/MovieGrid";
import GenreList from "./components/GenreList";
import { GenreObjects } from "./hooks/useGenres";

function App() {
  const [genre, setGenre] = useState<GenreObjects | null>(null);

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
        <GridItem area="aside" paddingLeft={"20px"}>
          <GenreList onSelectGenre={(genre) => setGenre(genre)} />
        </GridItem>
      </Show>
      <GridItem area="main">
        <MovieGrid selectedGenre={genre}></MovieGrid>
      </GridItem>
    </Grid>
  );
}

export default App;
