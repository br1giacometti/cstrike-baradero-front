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
import { Player } from "Player/data/PlayerRepository";
import { useEffect, useState } from "react";
import useAllFixtureService from "Tournament/data/TournamentRepository/hooks/useAllFixtureService";

// Tipos para equipos y partidos
interface Team {
  id: number;
  name: string;
  logoUrl?: string;
  players: Player[];
}

interface Match {
  id: number;
  matchDayId: number;
  teamA: Team;
  teamB: Team;
  resultTeamA: number | undefined; // Permitir undefined
  resultTeamB: number | undefined; // Permitir undefined
}

interface TeamListProps {
  handleFixtureRedirect: () => void;
}

const IncomingMatch = ({ handleFixtureRedirect }: TeamListProps) => {
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
  const [openMatchId, setOpenMatchId] = useState<number | null>(null);
  const { fixtureList, loading, error } = useAllFixtureService();

  useEffect(() => {
    if (fixtureList && fixtureList.length > 0) {
      const matchesFromApi: Match[] = fixtureList[0].matches
        .filter((match) => match.teamA && match.teamB)
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

  useEffect(() => {
    if (fixtureList.length > 0) {
      const currentMatchDay = fixtureList[0].MatchDay[currentRoundIndex];

      if (currentMatchDay) {
        const matchesForCurrentRound = matches.filter(
          (match) => match.matchDayId === currentMatchDay.id
        );

        const allMatchesFinished = matchesForCurrentRound.every(
          (match) => match.resultTeamA !== 0 || match.resultTeamB !== 0
        );

        if (allMatchesFinished) {
          setCurrentRoundIndex((prevIndex) =>
            Math.min(prevIndex + 1, fixtureList[0].MatchDay.length - 1)
          );
        }
      }
    }
  }, [matches, fixtureList, currentRoundIndex]);

  const handleGoToFixture = () => {
    handleFixtureRedirect();
  };

  const handleToggleMatch = (id: number) => {
    setOpenMatchId(openMatchId === id ? null : id);
  };

  // Filtrando partidos por ronda actual
  const matchesByRound = matches.filter(
    (match) =>
      fixtureList[0].MatchDay[currentRoundIndex]?.id === match.matchDayId
  );

  // Agrupando partidos por equipos
  const matchesGrouped = matchesByRound.reduce((acc, match) => {
    const key = `${match.teamA.name}-${match.teamB.name}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(match);
    return acc;
  }, {} as Record<string, Match[]>);

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
        {Object.entries(matchesGrouped).length ? (
          Object.entries(matchesGrouped).map(([key, matches]) => {
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
              <Box key={key} p={4} bg="gray.700" borderRadius="md">
                <Flex align="center" justify="space-between">
                  <Flex align="center">
                    {matches[0].teamA.logoUrl ? (
                      <Image
                        src={matches[0].teamA.logoUrl}
                        alt={matches[0].teamA.name}
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
                      {matches[0].teamA.name}
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
                          borderColor={teamAWonMatch ? "green.400" : "gray.500"}
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
                          borderColor={teamBWonMatch ? "green.400" : "gray.500"}
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
                      {matches[0].teamB.name}
                    </Text>
                    {matches[0].teamB.logoUrl ? (
                      <Image
                        src={matches[0].teamB.logoUrl}
                        alt={matches[0].teamB.name}
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

                  <Box onClick={() => handleToggleMatch(matches[0].id)} p={5}>
                    <Text color="rgb(177, 203, 2)">+</Text>
                  </Box>
                </Flex>

                <Collapse in={openMatchId === matches[0].id}>
                  <Box mt={4} bg="gray.500" p={4} borderRadius="md">
                    <Flex justify="space-between">
                      <Box textAlign="left" width="50%">
                        {matches[0].teamA.players.map((player) => (
                          <Text key={player.id} color="white" ml={4}>
                            {player.name}
                          </Text>
                        ))}
                      </Box>
                      <Box textAlign="right" width="50%">
                        {matches[0].teamB.players.map((player) => (
                          <Text key={player.id} color="white" mr={4}>
                            {player.name}
                          </Text>
                        ))}
                      </Box>
                    </Flex>
                  </Box>
                </Collapse>
              </Box>
            );
          })
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
