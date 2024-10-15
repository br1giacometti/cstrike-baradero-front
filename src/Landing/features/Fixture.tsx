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
  Tooltip,
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

// ... (importaciones y definiciones de tipos)

const Fixture = () => {
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const { fixtureList, loading, error } = useAllFixtureService();

  // useEffect
  useEffect(() => {
    if (fixtureList && fixtureList.length > 0) {
      const matchesFromApi: Match[] = fixtureList[0].matches
        .filter((match) => match.teamA && match.teamB) // Filtrar partidos válidos
        .map((match) => ({
          id: match.id,
          matchDayId: match.matchDayId,
          teamA: {
            id: match.teamA?.id ?? -1,
            name: match.teamA?.name ?? "",
            players: match.teamA?.players || [],
          },
          teamB: {
            id: match.teamB?.id ?? -1,
            name: match.teamB?.name ?? "",
            players: match.teamB?.players || [],
          },
          resultTeamA: match.resultTeamA,
          resultTeamB: match.resultTeamB,
        }));

      setMatches(matchesFromApi);
    }
  }, [fixtureList]);

  // Agrupar partidos por fecha y por enfrentamiento
  const matchesGroupedByDate = matches.reduce((acc, match) => {
    const matchDay = fixtureList[0].MatchDay.find(
      (day) => day.id === match.matchDayId
    );

    if (matchDay) {
      const date = matchDay.name;
      if (!acc[date]) {
        acc[date] = {};
      }

      const matchKey = `${match.teamA.id}-${match.teamB.id}`;
      if (!acc[date][matchKey]) {
        acc[date][matchKey] = {
          teamA: match.teamA,
          teamB: match.teamB,
          results: [],
        };
      }
      acc[date][matchKey].results.push({
        resultTeamA: match.resultTeamA,
        resultTeamB: match.resultTeamB,
      });
    }
    return acc;
  }, {} as { [key: string]: { [key: string]: { teamA: Team; teamB: Team; results: { resultTeamA: number | undefined; resultTeamB: number | undefined }[] } } });

  // Convertir el objeto agrupado a una lista
  const uniqueMatchesGroupedByDate = Object.entries(matchesGroupedByDate).map(
    ([date, matchEntries]) => ({
      date,
      matches: Object.values(matchEntries),
    })
  );

  const handleGoToHome = () => {
    router.push("/auth-public/public"); // Redirige a la ruta deseada
  };

  const navigateToMatchList = (matchDayId: number, teamId: number) => {
    router.push(`/auth-public/filter/${matchDayId}/${teamId}`);
  };

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
                {date}
              </Text>
              {matches.map(({ teamA, teamB, results }) => (
                <Box
                  key={`${teamA.id}-${teamB.id}`}
                  p={4}
                  bg="gray.700"
                  borderRadius="md"
                  cursor="pointer"
                  _hover={{ bg: "gray.600" }} // Cambiar el fondo al pasar el mouse
                  mb={2}
                  onClick={() => navigateToMatchList(teamA.id, teamB.id)}
                >
                  <Flex align="center" justify="space-between">
                    <Flex align="center">
                      {teamA.logoUrl ? (
                        <Image
                          src={teamA.logoUrl}
                          alt={teamA.name}
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
                        />
                      )}
                      <Text
                        fontSize="lg"
                        color="white"
                        fontWeight="bold"
                        cursor="pointer"
                      >
                        {teamA.name}
                      </Text>
                    </Flex>

                    {/* Resultados */}
                    <Flex align="center" mx={4}>
                      {results.map((result, index) => {
                        const { resultTeamA = 0, resultTeamB = 0 } = result;

                        if (resultTeamA > 0 || resultTeamB > 0) {
                          return (
                            <Flex key={index} align="center">
                              {resultTeamA > resultTeamB ? (
                                <>
                                  <Box
                                    key={index}
                                    width="20px"
                                    height="20px"
                                    border="2px solid"
                                    borderColor={"green.400"}
                                    bg={"green.400"}
                                    opacity={0.5}
                                    mr={2}
                                  />
                                </>
                              ) : resultTeamA < resultTeamB ? (
                                <>
                                  <Box
                                    key={index}
                                    width="20px"
                                    height="20px"
                                    border="2px solid"
                                    borderColor={"green.400"}
                                    bg={"green.400"}
                                    opacity={0.5}
                                    mr={2}
                                  />
                                </>
                              ) : (
                                <Text
                                  color="white"
                                  fontWeight="bold"
                                  mr={2}
                                ></Text>
                              )}
                              {index < results.length - 1 && (
                                <Text
                                  color="white"
                                  fontWeight="bold"
                                  pl={4}
                                  pr={4}
                                >
                                  VS
                                </Text>
                              )}
                            </Flex>
                          );
                        } else {
                          // Si no hay resultados, mostramos un cuadradito transparente
                          return (
                            <Box
                              key={index}
                              width="20px"
                              height="20px"
                              borderRadius="md"
                              backgroundColor="transparent"
                              marginRight="2"
                            ></Box>
                          );
                        }
                      })}
                    </Flex>

                    <Flex align="center">
                      <Text
                        fontSize="lg"
                        color="white"
                        fontWeight="bold"
                        cursor="pointer"
                      >
                        {teamB.name}
                      </Text>
                      {teamB.logoUrl ? (
                        <Image
                          src={teamB.logoUrl}
                          alt={teamB.name}
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
                        />
                      )}
                    </Flex>
                  </Flex>
                </Box>
              ))}
            </Box>
          ))
        ) : (
          <Text color="white">No hay partidos disponibles.</Text>
        )}
      </Stack>
    </Box>
  );
};

export default Fixture;
