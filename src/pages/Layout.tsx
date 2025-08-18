import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Box } from "@chakra-ui/react";

const Layout = () => {
  return (
    <>
      <NavBar></NavBar>
      <Box paddingY={2} paddingX={3}>
        <Outlet></Outlet>
      </Box>
    </>
  );
};

export default Layout;
