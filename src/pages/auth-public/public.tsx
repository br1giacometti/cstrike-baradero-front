// pages/index.tsx
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import IncomingMatch from "Landing/features/IncomingMatch";
import NavegationBar from "Landing/features/NavegationBar";
import ScoreTable from "Landing/features/ScoreTable";
import TeamsList from "Landing/features/Teams";
import TopPlayersTable from "Landing/features/TopPlayersTable";

import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();

  // Función para redirigir a la página de fixture
  const handleFixtureRedirect = () => {
    router.push("/auth-public/fixture/fixture"); // Redirige a la ruta especificada
  };

  return (
    <Box bg="gray.900" minH="100vh">
      <NavegationBar />

      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="100vh"
        mt="60px"
        px={4}
      >
        <Box mt={100}>
          <Heading as="h1" size="2xl" mb={4} color="white">
            ¡Bienvenido a CStrike Baradero!
          </Heading>
          <Text fontSize="xl" color="gray.400" mb={8}>
            El mejor lugar para seguir tus torneos de Counter Strike.
          </Text>
        </Box>

        {/* Componente IncomingMatch con ajuste de ancho */}
        <Box maxW="1080px" w="100%" mx="auto" p={4}>
          {" "}
          {/* Ajuste para el ancho y padding */}
          <IncomingMatch handleFixtureRedirect={handleFixtureRedirect} />
          <ScoreTable />
          <Box mt={10}>
            <TopPlayersTable />
          </Box>
          <Box mt={10}>
            <TeamsList />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default HomePage;
