import { Card, CardBody, Heading, HStack, Image } from "@chakra-ui/react";
import { MovieObjects } from "../hooks/useMovies";
import getImage from "../services/image-url";
import Rating from "./Rating";

interface Props {
  movie: MovieObjects;
}

const MovieCard = ({ movie }: Props) => {
  return (
    <Card
      key={movie.title}
      borderRadius={7}
      overflow={"hidden"}
      width={"185px"}
    >
      <Image src={getImage(movie.poster_path)} height={"280px"} />
      <CardBody>
        <HStack justifyContent={"space-between"}>
          <Heading fontSize={"lg"} marginTop={2}>
            {movie.title}
          </Heading>
          <Rating vote_average={movie.vote_average}></Rating>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default MovieCard;
