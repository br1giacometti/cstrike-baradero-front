// pages/index.tsx
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Fixture from "Landing/features/Fixture";
import IncomingMatch from "Landing/features/IncomingMatch";
import NavegationBar from "Landing/features/NavegationBar";
import TopAllPlayers from "Landing/features/TopAllPlayers";

import TopTeams from "Landing/features/TopTeam";

const StatsPage = () => {
  return (
    <Box bg="gray.900" minH="100vh">
      <NavegationBar />

      <Flex direction="column" minH="100vh" px={4} mt={50}>
        {/* Componente IncomingMatch con ajuste de ancho */}

        <Box maxW="1080px" w="100%" mx="auto" mt={50} p={4}>
          {" "}
          {/* Ajuste para el ancho y padding */}
          <Heading mb={4} as="h2" size="lg" color="rgb(177, 203, 2)">
            Top Equipos
          </Heading>
          <TopTeams />
        </Box>
        <Box maxW="1080px" w="100%" mx="auto" mt={50} p={4}>
          {" "}
          {/* Ajuste para el ancho y padding */}
          <Heading mb={4} as="h2" size="lg" color="rgb(177, 203, 2)">
            Top Jugadores
          </Heading>
          <TopAllPlayers />
        </Box>
      </Flex>
    </Box>
  );
};

export default StatsPage;
