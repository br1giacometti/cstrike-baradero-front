// pages/index.tsx
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Fixture from "Landing/features/Fixture";
import IncomingMatch from "Landing/features/IncomingMatch";
import NavegationBar from "Landing/features/NavegationBar";

const FixturePage = () => {
  return (
    <Box bg="gray.900" minH="100vh">
      <NavegationBar />

      <Flex direction="column" minH="100vh" px={4} mt={50}>
        {/* Componente IncomingMatch con ajuste de ancho */}
        <Box maxW="1080px" w="100%" mx="auto" p={4}>
          {" "}
          {/* Ajuste para el ancho y padding */}
          <Fixture />
        </Box>
      </Flex>
    </Box>
  );
};

export default FixturePage;
