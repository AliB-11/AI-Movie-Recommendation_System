import { Box, Flex, HStack, Icon, useColorMode } from "@chakra-ui/react";
import { BiSolidCameraMovie } from "react-icons/bi";
import { Link } from "react-router-dom";

import ColorModeSwitch from "./ColorModeSwitch";

const RecomendNavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Flex
      width={"100%"}
      padding={"15px"}
      paddingRight={"30px"}
      justifyContent={"space-between"}
      flexDirection={"row"}
    >
      <HStack
        marginRight={4}
        width={{ base: "50px", md: "115px" }}
        marginLeft={3}
        spacing={3}
      >
        <Link to={"/"}>
          <Icon as={BiSolidCameraMovie} boxSize={9} objectFit={"cover"} />
        </Link>
      </HStack>

      <Box marginTop={2}>
        <ColorModeSwitch></ColorModeSwitch>
      </Box>
    </Flex>
  );
};

export default RecomendNavBar;
