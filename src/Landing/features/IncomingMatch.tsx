import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Collapse,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAllFixtureService from "Tournament/data/TournamentRepository/hooks/useAllFixtureService";

// Tipos para equipos y partidos
interface Team {
  id: number;
  name: string;
  logoUrl?: string;
}

interface Match {
  id: number;
  matchDayId: number;
  teamA: Team;
  teamB: Team;
  resultTeamA: number | undefined; // Permitir undefined
  resultTeamB: number | undefined; // Permitir undefined
}

const IncomingMatch = () => {
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0); // Cambia a un índice en lugar de un string
  const [openMatchId, setOpenMatchId] = useState<number | null>(null);
  const { fixtureList, loading, error } = useAllFixtureService();

  useEffect(() => {
    if (fixtureList && fixtureList.length > 0) {
      const matchesFromApi: Match[] = fixtureList[0].matches
        .filter((match) => match.teamA && match.teamB) // Filtrar partidos válidos
        .map((match) => ({
          id: match.id,
          matchDayId: match.matchDayId,
          teamA: match.teamA!,
          teamB: match.teamB!,
          resultTeamA: match.resultTeamA,
          resultTeamB: match.resultTeamB,
        }));
      setMatches(matchesFromApi);
    }
  }, [fixtureList]);

  // Lógica para avanzar a la siguiente fecha si todos los partidos tienen resultados
  useEffect(() => {
    if (fixtureList.length > 0) {
      const currentMatchDay = fixtureList[0].MatchDay[currentRoundIndex];

      if (currentMatchDay) {
        const matchesForCurrentRound = matches.filter(
          (match) => match.matchDayId === currentMatchDay.id
        );

        // Verifica si todos los partidos de la ronda actual tienen resultados
        const allMatchesFinished = matchesForCurrentRound.every(
          (match) => match.resultTeamA !== 0 || match.resultTeamB !== 0
        );

        // Si todos los partidos han terminado, avanza al siguiente
        if (allMatchesFinished) {
          setCurrentRoundIndex((prevIndex) =>
            Math.min(prevIndex + 1, fixtureList[0].MatchDay.length - 1)
          );
        }
      }
    }
  }, [matches, fixtureList, currentRoundIndex]);

  const handleGoToFixture = () => {
    router.push("/auth-public/fixture");
  };

  const handleToggleMatch = (id: number) => {
    setOpenMatchId(openMatchId === id ? null : id);
  };

  // Filtrar partidos únicos por equipo en la jornada actual
  const matchesByRound = matches.filter(
    (match) =>
      fixtureList[0].MatchDay[currentRoundIndex]?.id === match.matchDayId
  );

  const uniqueMatches = Array.from(
    new Map(
      matchesByRound.map((match) => [
        `${match.teamA.name}-${match.teamB.name}`,
        match,
      ])
    ).values()
  );

  return (
    <Box mt={10} p={6} bg="gray.800" borderRadius="md" shadow="lg" w="100%">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h2" size="lg" color="rgb(177, 203, 2)">
          Próximos Partidos
        </Heading>
        <Text fontSize="lg" color="rgb(177, 203, 2)">
          {fixtureList.length > 0
            ? fixtureList[0].MatchDay[currentRoundIndex]?.name
            : "Cargando..."}
        </Text>
      </Flex>

      <Stack spacing={4}>
        {uniqueMatches.length ? (
          uniqueMatches.map((match) => (
            <Box key={match.id} p={4} bg="gray.700" borderRadius="md">
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

                <Text color="white" mx={4} fontWeight="bold">
                  VS
                </Text>

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

                <Box onClick={() => handleToggleMatch(match.id)} p={5}>
                  <Text color="rgb(177, 203, 2)">+</Text>
                </Box>
              </Flex>

              <Collapse in={openMatchId === match.id}>
                <Box mt={4} bg="gray.600" p={4} borderRadius="md">
                  <Flex justify="space-between">
                    <Box>
                      <Text color="white">Jugador 1</Text>
                      <Text color="white">Jugador 2</Text>
                    </Box>
                    <Box>
                      <Text color="white">Jugador 1</Text>
                      <Text color="white">Jugador 2</Text>
                    </Box>
                  </Flex>
                </Box>
              </Collapse>
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
        onClick={handleGoToFixture}
      >
        Ver Fixture
      </Button>
    </Box>
  );
};

export default IncomingMatch;
