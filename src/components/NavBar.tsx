import { Box, Flex, HStack, Icon, Image, useColorMode } from "@chakra-ui/react";
import { BiSolidCameraMovie } from "react-icons/bi";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import store_dark from "../assets/Store_dark.png";
import Store_light from "../assets/Store_light.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  let logo = store_dark;
  colorMode === "dark" ? (logo = store_dark) : (logo = Store_light);

  return (
    <Flex
      width={"100%"}
      padding={"15px"}
      paddingRight={"30px"}
      justifyContent={"space-between"}
      flexDirection={"row"}
    >
      <HStack marginRight={4} width={115} marginLeft={3} spacing={3}>
        <Link to={"/"}>
          <Icon as={BiSolidCameraMovie} boxSize={9} objectFit={"cover"} />
        </Link>
        <Image src={logo} height={"25px"} marginTop={"1px"}></Image>
      </HStack>

      <Box marginTop={2} flex={"1"}>
        <SearchInput></SearchInput>
      </Box>
      <HStack marginLeft={6} marginTop={3}>
        <ColorModeSwitch></ColorModeSwitch>
      </HStack>
    </Flex>
  );
};

export default NavBar;

//searchInput:  onSearch={(search) => { onSearch(search); }}
