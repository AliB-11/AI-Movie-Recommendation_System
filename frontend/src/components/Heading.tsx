import { Text } from "@chakra-ui/react";

import MovieCard from "./MovieCard";
import useMovieQueryStore from "../store";

// interface Props {
//   movieObject: MovieQuery;
//   searchText: string | null;
// }

const Heading = () => {
  const { movieQuery } = useMovieQueryStore();

  const searchtitle = movieQuery.searchText ? movieQuery.searchText : null;
  const filterlabel = [movieQuery?.filter?.label, " ", movieQuery?.genre?.name];

  return (
    <Text fontSize={{ base: "35", md: "50" }} fontWeight={"700"}>
      {searchtitle ? searchtitle : filterlabel.map((filter) => filter)} Movies
    </Text>
  );
};

export default Heading;
