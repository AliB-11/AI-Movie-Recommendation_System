import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Box } from "@chakra-ui/react";

const Layout = () => {
  return (
    <>
      <NavBar></NavBar>
      <Box paddingY={7} paddingX={12}>
        <Outlet></Outlet>
      </Box>
    </>
  );
};

export default Layout;
