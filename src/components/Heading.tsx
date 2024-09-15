import { Text } from "@chakra-ui/react";
import { MovieQuery } from "../App";
import MovieCard from "./MovieCard";

interface Props {
  movieObject: MovieQuery;
  searchText: string | null;
}

const Heading = ({ searchText, movieObject }: Props) => {
  const searchtitle = searchText ? "Search" : null;
  const filterlabel = [
    movieObject?.filter?.label,
    " ",
    movieObject?.genre?.name,
  ];

  return (
    <Text fontSize={"50"} fontWeight={"700"}>
      {searchtitle ? searchtitle : filterlabel.map((filter) => filter)} Movies
    </Text>
  );
};

export default Heading;
