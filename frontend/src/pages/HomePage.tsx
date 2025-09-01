import { Grid, Show, GridItem, VStack, HStack, Stack } from "@chakra-ui/react";
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
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={{ base: 5, md: 8 }}
              align="start"
              marginY={{ base: 1, md: 4 }}
            >
              <Filter />
              <ReccomendationButton />
            </Stack>
          </VStack>
          <MovieGrid></MovieGrid>
        </GridItem>
      </Grid>
    </>
  );
};

export default HomePage;
