import {
  Box,
  Flex,
  HStack,
  Icon,
  Image,
  Show,
  useColorMode,
} from "@chakra-ui/react";
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
      <HStack
        marginRight={4}
        width={{ base: "50px", md: "115px" }}
        marginLeft={3}
        spacing={3}
      >
        <Link to={"/"}>
          <Icon as={BiSolidCameraMovie} boxSize={9} objectFit={"cover"} />
        </Link>
        <Show above="md">
          <Image src={logo} height={"25px"} marginTop={"1px"}></Image>
        </Show>
      </HStack>

      <Box marginTop={2} flex={"1"}>
        <SearchInput></SearchInput>
      </Box>
      <Show above="md">
        <HStack marginLeft={6} marginTop={3}>
          <ColorModeSwitch></ColorModeSwitch>
        </HStack>
      </Show>
    </Flex>
  );
};

export default NavBar;

//searchInput:  onSearch={(search) => { onSearch(search); }}
