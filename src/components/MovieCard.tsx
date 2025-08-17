import { Box, Card, CardBody, Heading, HStack, Image } from "@chakra-ui/react";
import { MovieObjects } from "../hooks/useMovies";
import getImage from "../services/image-url";
import Rating from "./Rating";
import { Link } from "react-router-dom";

interface Props {
  movie: MovieObjects;
}

const MovieCard = ({ movie }: Props) => {
  return (
    <Box
      _hover={{
        transform: "scale(1.08)",
        transition: "transform .15s ease-in",
      }}
    >
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
              <Link to={"/movies/" + movie.id}> {movie.title}</Link>
            </Heading>
            <Rating vote_average={movie.vote_average}></Rating>
          </HStack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default MovieCard;
