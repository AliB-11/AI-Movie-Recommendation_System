import { useParams } from "react-router-dom";
import useMovieId from "../hooks/useMovieId";
import {
  Box,
  Heading,
  HStack,
  Image,
  Show,
  Spinner,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import getPoster from "../services/poster-url";
import star1 from "../assets/stars/1_star.png";
import star2 from "../assets/stars/2_star.png";
import star3 from "../assets/stars/3_star.png";
import star4 from "../assets/stars/4_star.png";
import star5 from "../assets/stars/5_star.png";
import getImage from "../services/image-url";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data: movie, isLoading, error } = useMovieId(id!);

  if (isLoading) return <Spinner />;

  if (error || !movie) throw error;

  const starRating = Math.round((movie.vote_average / 10) * 5);

  type StarKeys = 1 | 2 | 3 | 4 | 5;
  const starImages: Record<StarKeys, string> = {
    1: star1,
    2: star2,
    3: star3,
    4: star4,
    5: star5,
  };

  const starImage = starImages[starRating as StarKeys];

  const formatRuntime = (min: number) => {
    const hours = Math.floor(min / 60);
    const mins = min % 60;
    return `${hours}h ${mins}min`;
  };

  const runtimeString = formatRuntime(movie.runtime);

  const releaseYear = movie.release_date?.slice(0, 4);

  return (
    <>
      {/* Backdrop container */}
      <Box
        position="relative"
        w="95%"
        h="46vh"
        overflow="hidden"
        paddingX={5}
        mx="auto"
        height={{ base: "30vh", md: "46vh" }} // responsive height
      >
        <Image
          src={getPoster(movie.backdrop_path)} // request smaller version
          alt={movie.title}
          objectFit="cover"
          objectPosition="50% 20%" // 👈 shift down: crop ~10% from top, rest from bottom
          w="100%"
          h="100%"
        />
        <Box
          position="absolute"
          top={0} // start from top
          left={5} // start from left edge
          right={5} // end at right edge
          bottom={0} // end at bottom
          h="100%"
          bgGradient="linear(to-b, transparent 2%, #202020 100%)"
        />
      </Box>
      {/* Movie info */}
      <HStack
        align="flex-start"
        marginX={9}
        spacing={10}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box p={6} width={{ base: "100%", md: "77%" }}>
          <Heading mb={4} marginX={2}>
            {movie.title}
          </Heading>
          <Text mb={4} marginX={2}>
            {movie.overview}
          </Text>

          {/* Row with star rating, runtime, release year */}
          <HStack spacing={6}>
            {/* Star image */}
            <Image
              src={starImage}
              alt={`${starRating} stars`}
              w="125px" // adjust width
              h="40px" // adjust height proportionally
              objectFit="contain"
            />

            {/* Runtime */}
            <Text>{runtimeString}</Text>

            {/* Release year */}
            <Text>{releaseYear}</Text>

            <Show above="md">
              <Text>{movie.production_companies?.[0]?.name || ""}</Text>

              {/* First spoken language */}
              <Text>{movie.spoken_languages?.[0]?.english_name || ""}</Text>
            </Show>
          </HStack>

          {/* Genres */}
          <Wrap spacing={3} mt={2} marginX={2}>
            {movie.genres.map((genre) => (
              <WrapItem key={genre.id}>
                <Text>{genre.name}</Text>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
        <Show above="md">
          <Box
            maxWidth="250px"
            rounded="md"
            marginY={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src={getImage(movie.poster_path)}
              alt={movie.title}
              objectFit="cover"
              maxWidth="180px"
              rounded="md"
              h="auto"
            />
          </Box>
        </Show>
      </HStack>
    </>
  );
};

export default MovieDetailPage;
