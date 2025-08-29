import { Grid, Show, GridItem, VStack, HStack } from "@chakra-ui/react";
import Filter from "../components/Filter";
import GenreList from "../components/GenreList";
import MovieGrid from "../components/MovieGrid";
import Heading from "../components/Heading";
import ReccomendationButton from "../components/ReccomendationButton";

const HomePage = () => {
  return (
    <>
      <Grid
        templateAreas={{
          base: `"main"`,
          lg: `"nav nav" "aside main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "160px 1fr",
        }}
      >
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
            <HStack marginBottom={{ base: 4, md: 4 }} gap={{ base: 2, md: 8 }}>
              <Filter></Filter>
              <ReccomendationButton />
            </HStack>
          </VStack>
          <MovieGrid></MovieGrid>
        </GridItem>
      </Grid>
    </>
  );
};

export default HomePage;
