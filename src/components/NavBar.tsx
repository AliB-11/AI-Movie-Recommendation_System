import { Box, Flex, HStack, Icon, Image, useColorMode } from "@chakra-ui/react";
import { BiSolidCameraMovie } from "react-icons/bi";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import store_dark from "../assets/Store_dark.png";
import Store_light from "../assets/Store_light.png";

interface Props {
  onSearch: (search: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
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
        <Icon as={BiSolidCameraMovie} boxSize={9} />
        <Image src={logo} height={"23px"} marginTop={"7px"}></Image>
      </HStack>
      <Box marginTop={2} flex={"1"}>
        <SearchInput
          onSearch={(search) => {
            onSearch(search);
          }}
        ></SearchInput>
      </Box>
      <HStack marginLeft={6} marginTop={3}>
        <ColorModeSwitch></ColorModeSwitch>
      </HStack>
    </Flex>
  );
};

export default NavBar;
