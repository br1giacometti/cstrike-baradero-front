import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAllFixtureService from "Tournament/data/TournamentRepository/hooks/useAllFixtureService";

// Tipos para equipos, jugadores y partidos
interface Player {
  id: number;
  name: string;
}

interface Team {
  id: number; // Este campo debe ser un número
  name: string; // Este campo debe ser un string, no opcional
  logoUrl?: string;
  players: Player[]; // Siempre debe haber un arreglo de jugadores
}

interface Match {
  id: number;
  matchDayId: number;
  teamA: Team;
  teamB: Team;
  resultTeamA: number | undefined;
  resultTeamB: number | undefined;
}

const Fixture = () => {
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const { fixtureList, loading, error } = useAllFixtureService();

  const [expandedMatch, setExpandedMatch] = useState<number | null>(null); // Estado para controlar qué partido está expandido

  // useEffect
  useEffect(() => {
    if (fixtureList && fixtureList.length > 0) {
      const matchesFromApi: Match[] = fixtureList[0].matches
        .filter((match) => match.teamA && match.teamB) // Filtrar partidos válidos
        .map((match) => ({
          id: match.id,
          matchDayId: match.matchDayId,
          teamA: {
            id: match.teamA?.id ?? -1, // Proporcionar un valor por defecto en caso de que sea undefined
            name: match.teamA?.name ?? "", // Asigna un valor por defecto si es undefined
            players: match.teamA?.players || [],
          },
          teamB: {
            id: match.teamB?.id ?? -1, // Proporcionar un valor por defecto en caso de que sea undefined
            name: match.teamB?.name ?? "", // Asigna un valor por defecto si es undefined
            players: match.teamB?.players || [],
          },
          resultTeamA: match.resultTeamA,
          resultTeamB: match.resultTeamB,
        }));

      setMatches(matchesFromApi);
    }
  }, [fixtureList]);

  const handleGoToHome = () => {
    router.push("/auth-public/public"); // Redirige a la ruta deseada
  };

  // Agrupar partidos por fecha
  const matchesGroupedByDate = matches.reduce((acc, match) => {
    const matchDay = fixtureList[0].MatchDay.find(
      (day) => day.id === match.matchDayId
    );

    if (matchDay) {
      const date = matchDay.id; // Cambia esto según la estructura real del objeto matchDay
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(match);
    }
    return acc;
  }, {} as { [key: string]: Match[] });

  // Filtrar partidos únicos por equipo en cada jornada
  const uniqueMatchesGroupedByDate = Object.entries(matchesGroupedByDate).map(
    ([date, matches]) => {
      const uniqueMatches = Array.from(
        new Map(
          matches.map((match) => [`${match.teamA.id}-${match.teamB.id}`, match])
        ).values()
      );
      return { date, matches: uniqueMatches };
    }
  );

  // Verificamos si alguno de los equipos ganó al menos un partido
  const teamAWon = matches.some(
    (match) =>
      match.resultTeamA !== undefined &&
      match.resultTeamA > (match.resultTeamB || -0)
  );
  const teamBWon = matches.some(
    (match) =>
      match.resultTeamB !== undefined &&
      match.resultTeamB > (match.resultTeamA || -0)
  );

  return (
    <Box mt={10} p={6} bg="gray.800" borderRadius="md" shadow="lg" w="100%">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h2" size="lg" color="rgb(177, 203, 2)">
          Fixture Completo
        </Heading>
      </Flex>

      <Stack spacing={4}>
        {uniqueMatchesGroupedByDate.length ? (
          uniqueMatchesGroupedByDate.map(({ date, matches }) => (
            <Box key={date} p={4} borderRadius="md">
              <Text color="rgb(177, 203, 2)" fontWeight="bold" mb={2}>
                {/* Formato de fecha */}
                {"Fecha " + date}
              </Text>
              {matches.map((match) => (
                <Box
                  key={match.id}
                  p={4}
                  bg="gray.700"
                  borderRadius="md"
                  mb={2}
                >
                  <Flex align="center" justify="space-between">
                    <Flex align="center">
                      {match.teamA.logoUrl ? (
                        <Image
                          src={match.teamA.logoUrl}
                          alt={match.teamA.name}
                          boxSize="40px"
                          borderRadius="md"
                          mr={2}
                        />
                      ) : (
                        <Box
                          bg="gray.500"
                          boxSize="40px"
                          borderRadius="md"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mr={2}
                        ></Box>
                      )}
                      <Text fontSize="lg" color="white" fontWeight="bold">
                        {match.teamA.name}
                      </Text>
                    </Flex>

                    {/* Cuadrados de resultado */}
                    <Flex align="center" mx={4}>
                      {[0, 1, 2].map((index) => {
                        // Verificamos si el equipo A ganó en esta posición
                        const teamAWonMatch =
                          teamAWon &&
                          index <
                            matches.filter(
                              (m) => (m.resultTeamA || 0) > (m.resultTeamB || 0)
                            ).length;

                        return (
                          <Box
                            key={index}
                            width="20px"
                            height="20px"
                            border="2px solid"
                            borderColor={
                              teamAWonMatch ? "green.400" : "gray.500"
                            }
                            mr={2}
                            backgroundColor={
                              teamAWonMatch ? "green.400" : "transparent"
                            } // Rellenar de verde si ganó
                            opacity={teamAWonMatch ? 0.5 : 1} // Ajustar opacidad
                          />
                        );
                      })}

                      <Text color="white" fontWeight="bold">
                        VS
                      </Text>

                      {[0, 1, 2].map((index) => {
                        // Verificamos si el equipo B ganó en esta posición
                        const teamBWonMatch =
                          teamBWon &&
                          index <
                            matches.filter(
                              (m) => (m.resultTeamB || 0) > (m.resultTeamA || 0)
                            ).length;

                        return (
                          <Box
                            key={index}
                            width="20px"
                            height="20px"
                            border="2px solid"
                            borderColor={
                              teamBWonMatch ? "green.400" : "gray.500"
                            }
                            ml={2}
                            backgroundColor={
                              teamBWonMatch ? "green.400" : "transparent"
                            } // Rellenar de verde si ganó
                            opacity={teamBWonMatch ? 0.5 : 1} // Ajustar opacidad
                          />
                        );
                      })}
                    </Flex>

                    <Flex align="center">
                      <Text fontSize="lg" color="white" fontWeight="bold">
                        {match.teamB.name}
                      </Text>
                      {match.teamB.logoUrl ? (
                        <Image
                          src={match.teamB.logoUrl}
                          alt={match.teamB.name}
                          boxSize="40px"
                          borderRadius="md"
                          ml={2}
                        />
                      ) : (
                        <Box
                          bg="gray.500"
                          boxSize="40px"
                          borderRadius="md"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          ml={2}
                        ></Box>
                      )}
                    </Flex>

                    <Box
                      onClick={() => {
                        setExpandedMatch(
                          expandedMatch === match.id ? null : match.id
                        );
                      }}
                      p={5}
                    >
                      <Text color="rgb(177, 203, 2)">+</Text>
                    </Box>
                  </Flex>

                  <Collapse in={expandedMatch === match.id}>
                    <Box mt={4} bg="gray.500" p={4} borderRadius="md">
                      <Flex justify="space-between">
                        <Box textAlign="left" width="50%">
                          {match.teamA.players.map((player) => (
                            <Text key={player.id} color="white" ml={4}>
                              {player.name}
                            </Text>
                          ))}
                        </Box>
                        <Box textAlign="right" width="50%">
                          {match.teamB.players.map((player) => (
                            <Text key={player.id} color="white" mr={4}>
                              {player.name}
                            </Text>
                          ))}
                        </Box>
                      </Flex>
                    </Box>
                  </Collapse>
                </Box>
              ))}
            </Box>
          ))
        ) : (
          <Text color="gray.400">No hay partidos próximos.</Text>
        )}
      </Stack>
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

export default Fixture;
