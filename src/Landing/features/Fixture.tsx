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

  const navigateToMatchList = (matchDayId: number, teamId: number) => {
    router.push(`/auth-public/filter/${matchDayId}/${teamId}`);
  };

  // Agrupar partidos por fecha
  // Agrupar partidos por fecha
  const matchesGroupedByDate = matches.reduce((acc, match) => {
    const matchDay = fixtureList[0].MatchDay.find(
      (day) => day.id === match.matchDayId
    );

    if (matchDay) {
      const date = matchDay.name; // Cambia esto según la estructura real del objeto matchDay
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(match);
    }
    return acc;
  }, {} as { [key: string]: Match[] });

  // Convertir el objeto en un array y ordenar por matchDayId en orden descendente
  // Convertir el objeto en un array y ordenar por matchDayId en orden ascendente
  const uniqueMatchesGroupedByDate = Object.entries(matchesGroupedByDate)
    .map(([date, matches]) => {
      const uniqueMatches = Array.from(
        new Map(
          matches.map((match) => [`${match.teamA.id}-${match.teamB.id}`, match])
        ).values()
      );
      return { date, matches: uniqueMatches };
    })
    .sort((a, b) => {
      // Aquí asumo que el date es el nombre del matchDay
      // Necesitarás extraer el matchDayId desde tu fixtureList o match
      const matchDayA = fixtureList[0].MatchDay.find(
        (day) => day.name === a.date
      );
      const matchDayB = fixtureList[0].MatchDay.find(
        (day) => day.name === b.date
      );

      return (matchDayA?.id || 0) - (matchDayB?.id || 0); // Orden ascendente
    });

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
                {date}
              </Text>
              {matches.map((match) => (
                <Box
                  key={match.id}
                  p={4}
                  bg="gray.700"
                  borderRadius="md"
                  cursor="pointer" // Cambiar el cursor para indicar que es clickeable
                  _hover={{ bg: "gray.600" }} // Cambiar el fondo al pasar el mouse
                  mb={2}
                  onClick={() =>
                    navigateToMatchList(match.matchDayId, match.teamA.id)
                  }
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
                      <Tooltip
                        label={match.teamA.players
                          .map((player) => player.name)
                          .join(", ")}
                        placement="top"
                        hasArrow
                        bg="gray.600"
                      >
                        <Text
                          fontSize="lg"
                          color="white"
                          fontWeight="bold"
                          cursor="pointer"
                        >
                          {match.teamA.name}
                        </Text>
                      </Tooltip>
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
                      <Tooltip
                        label={match.teamB.players
                          .map((player) => player.name)
                          .join(", ")}
                        placement="top"
                        hasArrow
                        bg="gray.600"
                      >
                        <Text
                          fontSize="lg"
                          color="white"
                          fontWeight="bold"
                          cursor="pointer"
                        >
                          {match.teamB.name}
                        </Text>
                      </Tooltip>
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
                  </Flex>
                </Box>
              ))}
            </Box>
          ))
        ) : (
          <Text color="white">No hay partidos disponibles.</Text>
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
