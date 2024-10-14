import {
  Box,
  Flex,
  Image,
  Text,
  Tooltip,
  Divider,
  Stack,
  Button,
} from "@chakra-ui/react";
import { Match } from "Match/data/MatchRepository";
import { useRouter } from "next/router";

interface MatchDetailProps {
  defaultValues: Match[]; // Cambia defaultValues a matches
}

const MatchDetail = ({ defaultValues }: MatchDetailProps) => {
  const router = useRouter();
  const handleGoToHome = () => {
    router.push("/auth-public/public"); // Redirige a la ruta deseada
  };

  return (
    <Box p={6} bg="gray.700" borderRadius="md">
      {defaultValues.map((match, index) => {
        const { teamA, teamB, map, resultTeamA, resultTeamB, matchStats } =
          match;

        // Asignar valores predeterminados para evitar undefined
        const teamAResult = resultTeamA ?? 0;
        const teamBResult = resultTeamB ?? 0;

        return (
          <Box
            key={index}
            mb={6}
            borderRadius="md"
            bg="gray.600"
            p={4}
            boxShadow="md"
          >
            <Flex justify="space-between" align="center" mb={4}>
              {/* Equipo A */}
              <Flex align="center">
                {teamA?.logoUrl ? (
                  <Image
                    src={teamA.logoUrl}
                    alt={teamA.name}
                    boxSize="50px"
                    borderRadius="md"
                    mr={2}
                  />
                ) : (
                  <Box
                    bg="gray.500"
                    boxSize="50px"
                    borderRadius="md"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mr={2}
                  />
                )}
                <Tooltip
                  label={
                    teamA?.players.map((p) => p.name).join(", ") ||
                    "Sin jugadores"
                  }
                  aria-label={`Jugadores de ${teamA?.name}`}
                >
                  <Text fontSize="lg" color="white" fontWeight="bold">
                    {teamA?.name}
                  </Text>
                </Tooltip>
              </Flex>

              {/* Resultados */}
              <Flex align="center">
                <Box
                  width="30px"
                  height="30px"
                  borderRadius="md"
                  bg={teamAResult > teamBResult ? "green.400" : "gray.500"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mr={2}
                >
                  <Text color="white" fontWeight="bold">
                    {teamAResult}
                  </Text>
                </Box>

                <Text color="white" mx={2} fontWeight="bold">
                  VS
                </Text>

                <Box
                  width="30px"
                  height="30px"
                  borderRadius="md"
                  bg={teamBResult > teamAResult ? "green.400" : "gray.500"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  ml={2}
                >
                  <Text color="white" fontWeight="bold">
                    {teamBResult}
                  </Text>
                </Box>
              </Flex>

              {/* Equipo B */}
              <Flex align="center">
                <Tooltip
                  label={
                    teamB?.players.map((p) => p.name).join(", ") ||
                    "Sin jugadores"
                  }
                  aria-label={`Jugadores de ${teamB?.name}`}
                >
                  <Text fontSize="lg" color="white" fontWeight="bold" mr={2}>
                    {teamB?.name}
                  </Text>
                </Tooltip>
                {teamB?.logoUrl ? (
                  <Image
                    src={teamB.logoUrl}
                    alt={teamB.name}
                    boxSize="50px"
                    borderRadius="md"
                  />
                ) : (
                  <Box
                    bg="gray.500"
                    boxSize="50px"
                    borderRadius="md"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  />
                )}
              </Flex>
            </Flex>
            <Divider my={4} />

            {/* Mapa */}
            <Text color="white" mb={4}>
              <strong>Mapa:</strong> {map || "No especificado"}
            </Text>

            <Stack spacing={3}>
              <Text color="white" fontWeight="bold">
                Estadísticas del Partido
              </Text>

              <Flex justify="space-between">
                {/* Estadísticas de Equipo A */}
                <Box>
                  {teamA &&
                    matchStats
                      ?.filter((stat) => stat.teamId === teamA.id) // Asegúrate de filtrar por equipo A
                      .map((stat) => (
                        <Text key={stat.id} color="white">
                          {stat.player.name} - Kills: {stat.kills}, Deads:{" "}
                          {stat.deaths}
                        </Text>
                      ))}
                </Box>

                {/* Estadísticas de Equipo B */}
                <Box>
                  {teamB &&
                    matchStats
                      ?.filter((stat) => stat.teamId === teamB.id) // Filtra por equipo B solo si teamB existe
                      .map((stat) => (
                        <Text key={stat.id} color="white">
                          {stat.player.name} - Kills: {stat.kills}, Deads:{" "}
                          {stat.deaths}
                        </Text>
                      ))}
                </Box>
              </Flex>
            </Stack>
          </Box>
        );
      })}

      <Button
        mt={6}
        bg="rgb(177, 203, 2)"
        color="black"
        _hover={{ bg: "rgb(140, 160, 2)" }}
        w="full"
        onClick={handleGoToHome}
      >
        Volver
      </Button>
    </Box>
  );
};

export default MatchDetail;
