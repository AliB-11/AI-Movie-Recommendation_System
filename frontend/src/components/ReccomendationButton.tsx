import { Button } from "@chakra-ui/react";
import useSearch from "../hooks/useSearch";
import { useState } from "react";

const ReccomendationButton = () => {
  const movieName = "Forrest Gump 1994";
  const [searchEnabled, setSearchEnabled] = useState(false);

  const { data, error, isLoading } = useSearch(movieName, searchEnabled);

  if (data) console.log(data.recommendation[0]);

  return (
    <Button color={"gold"} onClick={() => setSearchEnabled(true)}>
      🎬 Get Movie Recommendations
    </Button>
  );
};

export default ReccomendationButton;
