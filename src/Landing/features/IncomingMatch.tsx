import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Player } from "Player/data/PlayerRepository";
import { useEffect, useState } from "react";
import useNextMatchDayService from "Tournament/data/TournamentRepository/hooks/useNextMatchDayService";

export interface Team {
  id: number;
  name: string;
  players: Player[];
}

export interface Match {
  id: number;
  matchDayId: number;
  teamA?: Team; // Asegúrate de que Team esté correctamente definido
  teamB?: Team; // Asegúrate de que Team esté correctamente definido
  resultTeamA?: number; // Hazlo opcional si puede ser undefined
  resultTeamB?: number; // Hazlo opcional si puede ser undefined
}

export interface MatchDay {
  id: number;
  name: string;
  tournamentId: number;
  matches: Match[];
}

interface TeamListProps {
  handleFixtureRedirect: () => void;
}

const IncomingMatch = ({ handleFixtureRedirect }: TeamListProps) => {
  const router = useRouter();
  const { fixtureList, loading, error } = useNextMatchDayService();
  const [selectedMatchDay, setSelectedMatchDay] = useState<MatchDay | null>(
    null
  );

  useEffect(() => {
    if (fixtureList?.length > 0) {
      const firstPendingMatchDay = fixtureList.find((matchDay) =>
        matchDay.matches.some(
          (match) =>
            match.resultTeamA === undefined || match.resultTeamB === undefined
        )
      );
      setSelectedMatchDay(firstPendingMatchDay || fixtureList[0]);
    }
  }, [fixtureList]);

  const handleGoToHome = () => {
    router.push("/auth-public/fixture/fixture");
  };

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

  // Agrupando partidos
  const groupedMatches: { [key: string]: { match: Match; wins: number[] } } =
    {};

  selectedMatchDay?.matches.forEach((match) => {
    const key = `${match.teamA?.id}-${match.teamB?.id}`; // Creando una clave única para los equipos
    if (!groupedMatches[key]) {
      groupedMatches[key] = { match, wins: [0, 0] }; // Inicializando el conteo de victorias
    }

    // Usar valores predeterminados para evitar 'undefined'
    const resultTeamA = match.resultTeamA ?? 0; // Usa 0 si es undefined
    const resultTeamB = match.resultTeamB ?? 0; // Usa 0 si es undefined

    // Contando victorias
    if (resultTeamA > resultTeamB) {
      groupedMatches[key].wins[0] += 1; // Equipo A gana
    } else if (resultTeamB > resultTeamA) {
      groupedMatches[key].wins[1] += 1; // Equipo B gana
    }
  });

  return (
    <Box mt={10} p={6} bg="gray.800" borderRadius="md" shadow="lg" w="100%">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h2" size="lg" color="rgb(177, 203, 2)">
          Próximos Partidos
        </Heading>
        <Text fontSize="lg" color="rgb(177, 203, 2)">
          {selectedMatchDay ? selectedMatchDay.name : "Cargando..."}
        </Text>
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
                  <Flex ml={4}>{renderSquares(wins[0])}</Flex>{" "}
                  {/* Ganadas por A */}
                </Flex>

                <Text color="white" fontWeight="bold">
                  VS
                </Text>

                <Flex align="center">
                  <Flex mr={4}>{renderSquares(wins[1])}</Flex>{" "}
                  {/* Ganadas por B */}
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

export default IncomingMatch;
