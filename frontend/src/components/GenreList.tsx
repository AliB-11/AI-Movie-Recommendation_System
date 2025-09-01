import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  List,
  ListItem,
} from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import { GenreObjects } from "../entities/GenreObjects";
import Genreskeleton from "./GenresSkeleton";
import { useState } from "react";
import useMovieQueryStore from "../store";

const GenreList = () => {
  const { data, isLoading, error } = useGenres();

  const genre = useMovieQueryStore((s) => s.setGenre);
  const onSelectGenre = useMovieQueryStore((s) => s.setGenre);

  const [highlight, sethighlight] = useState(0);

  const setFontWeight = (id: number) => {
    const font = highlight === id ? "bold" : "400";
    return font;
  };

  if (error) return null;

  if (isLoading) {
    return <Genreskeleton></Genreskeleton>;
  }

  return (
    <Box marginLeft={3}>
      <Heading fontSize={"2xl"} marginBottom={3}>
        Genres
      </Heading>
      <List>
        {data?.map((genre) => (
          <ListItem key={genre.id} marginY={5}>
            <HStack>
              <Button
                whiteSpace={"normal"}
                textAlign={"left"}
                key={genre.id}
                variant="link"
                fontWeight={setFontWeight(genre.id)}
                fontSize={"md"}
                onClick={() => {
                  sethighlight(genre.id);
                  onSelectGenre(genre);
                }}
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GenreList;
