import {
  Box,
  Flex,
  Text,
  Stack,
  Tooltip,
  Heading,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Player } from "Player/data/PlayerRepository";
import { useEffect, useState } from "react";
import useAllFixtureService from "Tournament/data/TournamentRepository/hooks/useAllFixtureService";

export interface Team {
  id: number;
  name: string;
  players: Player[];
}

export interface Match {
  id: number;
  matchDayId: number;
  teamA?: Team;
  teamB?: Team;
  resultTeamA?: number;
  resultTeamB?: number;
}

export interface MatchDay {
  id: number;
  name: string;
  tournamentId: number;
  matches: Match[];
}

const Fixture = () => {
  const router = useRouter();
  const { fixtureList, loading, error } = useAllFixtureService();
  const [selectedMatchDays, setSelectedMatchDays] = useState<MatchDay[]>([]);

  useEffect(() => {
    console.log("fixtureList:", fixtureList); // Verificar qué contiene fixtureList
    if (fixtureList?.length > 0) {
      setSelectedMatchDays(fixtureList);
    } else {
      setSelectedMatchDays([]);
    }
  }, [fixtureList]);

  console.log("hola");

  const renderSquares = (wins: number) =>
    [0, 1, 2].map((index) => (
      <Box
        key={index}
        width="20px"
        height="20px"
        border="2px solid"
        borderColor={index < wins ? "green.400" : "gray.500"}
        bg={index < wins ? "green.400" : "transparent"}
        opacity={index < wins ? 0.5 : 1}
        mr={2}
      />
    ));

  const groupedMatches: { [key: string]: { match: Match; wins: number[] } } =
    {};

  selectedMatchDays.forEach((matchDay) => {
    matchDay.matches.forEach((match) => {
      // Cambiamos la clave para incluir matchDayId
      const key = `${matchDay.id}-${match.teamA?.id}-${match.teamB?.id}`;

      if (!groupedMatches[key]) {
        groupedMatches[key] = { match, wins: [0, 0] };
      }

      // Se registran los resultados sin importar si son cero
      const resultTeamA = match.resultTeamA ?? 0;
      const resultTeamB = match.resultTeamB ?? 0;

      // Si hay resultados, se cuentan las victorias
      if (resultTeamA > resultTeamB) {
        groupedMatches[key].wins[0] += 1; // Equipo A gana
      } else if (resultTeamB > resultTeamA) {
        groupedMatches[key].wins[1] += 1; // Equipo B gana
      }

      // Se mantienen los partidos con resultados iguales
    });
  });

  const getMatchDayName = (matchDayId: number): string => {
    const matchDay = selectedMatchDays.find((day) => day.id === matchDayId);
    return matchDay ? matchDay.name : "Cargando...";
  };

  const handleGoToHome = () => {
    router.push("/auth-public/fixture/fixture");
  };

  return (
    <Box mt={10} p={6} bg="gray.800" borderRadius="md" shadow="lg" w="100%">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h2" size="lg" color="rgb(177, 203, 2)">
          Próximos Partidos
        </Heading>
      </Flex>

      <Stack spacing={4}>
        {Object.values(groupedMatches).length ? (
          Object.values(groupedMatches).map(({ match, wins }) => (
            <Box
              key={match.id}
              p={4}
              bg="gray.700"
              borderRadius="md"
              cursor="pointer"
              _hover={{ bg: "gray.600" }}
              onClick={() =>
                router.push(
                  `/auth-public/filter/${match.matchDayId}/${match.teamA?.id}`
                )
              }
            >
              <Flex align="center" justify="space-between">
                <Flex align="center">
                  <Tooltip
                    label={match.teamA?.players
                      .map((player) => player.name)
                      .join(", ")}
                    placement="top"
                    aria-label={`Jugadores de ${match.teamA?.name}`}
                  >
                    <Text fontSize="lg" color="white" fontWeight="bold">
                      {match.teamA?.name}
                    </Text>
                  </Tooltip>
                  <Flex ml={4}>{renderSquares(wins[0])}</Flex>
                </Flex>

                <Text color="white" fontWeight="bold">
                  VS
                </Text>

                <Flex align="center">
                  <Flex mr={4}>{renderSquares(wins[1])}</Flex>
                  <Tooltip
                    label={match.teamB?.players
                      .map((player) => player.name)
                      .join(", ")}
                    placement="top"
                    aria-label={`Jugadores de ${match.teamB?.name}`}
                  >
                    <Text fontSize="lg" color="white" fontWeight="bold">
                      {match.teamB?.name}
                    </Text>
                  </Tooltip>
                </Flex>
              </Flex>
              <Text color="gray.400" fontSize="sm">
                {getMatchDayName(match.matchDayId)}{" "}
                {/* Muestra el nombre del matchDay */}
              </Text>
            </Box>
          ))
        ) : (
          <Text color="white">No hay partidos programados.</Text>
        )}
      </Stack>

      {loading && <Text color="white">Cargando...</Text>}
      {error && <Text color="red.500">Error al cargar partidos.</Text>}

      <Button
        mt={6}
        bg="rgb(177, 203, 2)"
        color="black"
        _hover={{ bg: "rgb(140, 160, 2)" }}
        w="full"
        onClick={handleGoToHome}
      >
        Ver Fixture
      </Button>
    </Box>
  );
};
export default Fixture;
