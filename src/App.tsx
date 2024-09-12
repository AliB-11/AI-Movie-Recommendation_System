import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import MovieGrid from "./components/MovieGrid";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "190px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar></NavBar>
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingLeft={"20px"}></GridItem>
      </Show>
      <GridItem area="main">
        <MovieGrid></MovieGrid>
      </GridItem>
    </Grid>
  );
}

export default App;
