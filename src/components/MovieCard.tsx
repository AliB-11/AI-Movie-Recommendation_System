import { Box, Card, CardBody, Heading, HStack, Image } from "@chakra-ui/react";
import { MovieObjects } from "../entities/MovieObjects";
import getImage from "../services/image-url";
import Rating from "./Rating";
import { Link } from "react-router-dom";

interface Props {
  movie: MovieObjects;
}

const MovieCard = ({ movie }: Props) => {
  return (
    <Link to={"/movies/" + movie.id}>
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
                {movie.title}
              </Heading>
              <Rating vote_average={movie.vote_average}></Rating>
            </HStack>
          </CardBody>
        </Card>
      </Box>
    </Link>
  );
};

export default MovieCard;
