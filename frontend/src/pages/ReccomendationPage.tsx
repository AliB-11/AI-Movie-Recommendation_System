import { Flex, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import RecomendNavBar from "../components/RecomendNavBar";
import RecommendSearch from "../components/RecommendSearch";
import { useState } from "react";
import RecommendedMovieGrid from "../components/RecommendedMovieGrid";
const ReccomendationPage = () => {
  const [query, setQuery] = useState("");

  return (
    <>
      <RecomendNavBar></RecomendNavBar>
      <Grid>
        <GridItem>
          <VStack marginTop={5}>
            <Text
              marginTop={15}
              fontSize={{ base: "35", md: "40" }}
              fontWeight={"700"}
            >
              AI Movie Recommender
            </Text>
            <Flex
              textAlign="center"
              maxW={{ base: "450px", md: "720px" }} // keeps it readable, adjust as needed
              mx="auto" // centers horizontally
            >
              <Text
                marginTop={5}
                fontSize={{ base: "15", md: "16" }}
                fontWeight={"200"}
              >
                Welcome to the movie recommendation system. Enter the movie
                title and release year of a movie you recently enjoyed watching
                to get recommeneded similar movies you may also enjoy! The
                recommendation engine combines insights from similar users,
                overall popularity, and shared genres to suggest movies you’ll
                likely enjoy.
              </Text>
            </Flex>
            <Flex marginTop={12} width="100%" justify="center">
              <RecommendSearch setQuery={setQuery}></RecommendSearch>
            </Flex>

            {query && <RecommendedMovieGrid query={query} />}
          </VStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default ReccomendationPage;
