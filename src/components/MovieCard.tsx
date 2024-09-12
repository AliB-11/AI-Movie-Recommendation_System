import React from "react";
import { MovieObjects } from "../hooks/useMovies";
import { Card, CardBody, Heading, HStack, Image } from "@chakra-ui/react";
import getImage from "../services/image-url";

interface Props {
  movie: MovieObjects;
}

const MovieCard = ({ movie }: Props) => {
  return (
    <Card key={movie.title} borderRadius={7} overflow={"hidden"}>
      <Image src={getImage(movie.poster_path)} />
      <CardBody>
        <Heading fontSize={"lg"}>{movie.title}</Heading>
      </CardBody>
    </Card>
  );
};

export default MovieCard;
