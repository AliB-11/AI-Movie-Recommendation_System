import { Box, Card, CardBody, Heading, HStack, Image } from "@chakra-ui/react";
import { MovieObjects } from "../entities/MovieObjects";
import getImage from "../services/image-url";
import Rating from "./Rating";
import { Link } from "react-router-dom";

interface Props {
  movie: MovieObjects;
  movieEndpoint: string;
}

const MovieCard = ({ movie, movieEndpoint }: Props) => {
  return (
    <Link to={movieEndpoint + movie.id}>
      <Box
        _hover={{
          transform: "scale(1.08)",
          transition: "transform .15s ease-in", // "/movies/"
        }}
      >
        <Card
          key={movie.title}
          borderRadius={7}
          overflow={"hidden"}
          width={{ base: "140px", md: "185px" }} // smaller on phones
        >
          <Image
            src={getImage(movie.poster_path)}
            height={{ base: "210px", md: "280px" }}
          />
          <CardBody>
            <HStack justifyContent={"space-between"}>
              <Heading fontSize={{ base: "sm", md: "lg" }} marginTop={2}>
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
