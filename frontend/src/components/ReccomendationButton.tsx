import { Button, useColorMode } from "@chakra-ui/react";
import useSearch from "../hooks/useSearch";
import { useState } from "react";
import { Link } from "react-router-dom";

const ReccomendationButton = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  const color = colorMode == "dark" ? "" : "black";

  return (
    <Link to={"/recommend"}>
      <Button
        color={"gold"}
        backgroundColor={color}
        fontSize={{ base: 14, md: 16 }}
      >
        🎬 Get Movie Recommendations
      </Button>
    </Link>
  );
};

export default ReccomendationButton;
