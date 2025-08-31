import { Button } from "@chakra-ui/react";
import useSearch from "../hooks/useSearch";
import { useState } from "react";
import { Link } from "react-router-dom";

const ReccomendationButton = () => {
  // const movieName = "Forrest Gump 1994";
  // const [searchEnabled, setSearchEnabled] = useState(false);
  // const { data, error, isLoading } = useSearch(movieName, searchEnabled);
  // if (data) console.log(data.recommendation[0]);

  return (
    <Link to={"/recommend"}>
      <Button color={"gold"} backgroundColor={"black"}>
        🎬 Get Movie Recommendations
      </Button>
    </Link>
  );
};

export default ReccomendationButton;
