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
import { Link } from "react-router-dom";
import { IoTvOutline } from "react-icons/io5";

const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  // let logo = store_dark;
  // colorMode === "dark" ? (logo = store_dark) : (logo = Store_light);

  return (
    <Flex
      width={"100%"}
      padding={"15px"}
      paddingRight={"30px"}
      justifyContent={"space-between"}
      flexDirection={"row"}
    >
      <HStack
        marginLeft={3}
        width={{ base: "50px", md: "70px" }}
        spacing={3}
        marginTop={{ base: 1, md: 0.5 }}
      >
        <Link to={"/"}>
          <Icon
            as={BiSolidCameraMovie}
            boxSize={{ base: 9, md: 10 }}
            objectFit={"cover"}
          />
        </Link>
      </HStack>

      <Box marginTop={1} flex={"1"}>
        <SearchInput></SearchInput>
      </Box>
      <Show above="md">
        <HStack marginLeft={10} marginTop={1}>
          <ColorModeSwitch></ColorModeSwitch>
        </HStack>
      </Show>
    </Flex>
  );
};

export default NavBar;

//searchInput:  onSearch={(search) => { onSearch(search); }}
