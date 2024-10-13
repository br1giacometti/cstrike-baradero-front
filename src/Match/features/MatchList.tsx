import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useTranslation } from "Base/i18n";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  Flex,
  Button,
  useDisclosure,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Match } from "Match/data/MatchRepository";

interface MatchListProps {
  defaultValues: Match[];
}

const MatchList = ({ defaultValues }: MatchListProps) => {
  const { t } = useTranslation("team");
  const toast = useToast();
  const router = useRouter();
  const [expandedMatchId, setExpandedMatchId] = useState<number | null>(null);

  console.log(defaultValues);
  const handleAccordionToggle = (matchId: number) => {
    setExpandedMatchId((prev) => (prev === matchId ? null : matchId));
  };

  const handleCreateMatch = () => {
    if (defaultValues.length > 0) {
      const tournamentId = defaultValues[0].tournament?.id;
      const matchDayId = defaultValues[0].matchDayId;
      const teamAId = defaultValues[0]?.teamA?.id;
      const teamBId = defaultValues[0]?.teamB?.id;

      if (teamAId && teamBId) {
        router.push({
          pathname: "/match/create",
          query: { tournamentId, teamAId, teamBId, matchDayId },
        });
      } else {
        toast({
          title: "Error",
          description: "No se pudieron encontrar los IDs de los equipos.",
          status: "error",
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Error",
        description: "No hay partidos disponibles.",
        status: "error",
        isClosable: true,
      });
    }
  };

  const handleEditMatch = (matchId: number) => {
    router.push(`/match/edit/${matchId}`); // Redirige a la página de edición del partido
  };

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading as="h1">
          {defaultValues.length > 0 &&
            defaultValues[0].teamA &&
            defaultValues[0].teamB &&
            `${defaultValues[0].teamA.name} vs ${defaultValues[0].teamB.name}`}
        </Heading>
        <Button onClick={handleCreateMatch}>Crear Partido</Button>
      </Flex>
      <Accordion allowToggle>
        {defaultValues.length > 0 ? (
          defaultValues.map((match) => (
            <AccordionItem key={match.id}>
              <AccordionButton onClick={() => handleAccordionToggle(match.id)}>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  {match.map
                    ? `${match.teamA?.name || "Equipo A"} ${
                        match.resultTeamA || 0
                      } VS ${match.resultTeamB || 0} ${
                        match.teamB?.name || "Equipo B"
                      }`
                    : `${match.teamA?.name || "Equipo A"} VS ${
                        match.teamB?.name || "Equipo B"
                      } - Próximamente`}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Box>
                  {match.matchStats && match.teamA && match.teamB ? (
                    <Box>
                      <Text fontWeight="bold">
                        Nombre del mapa: {match.map}
                      </Text>
                      <Text fontWeight="bold">
                        Estadísticas de los jugadores:
                      </Text>
                      {/* Procesa las estadísticas por equipo */}
                      {match.matchStats.reduce((acc, stat) => {
                        const teamName =
                          stat.teamId === match.teamA?.id
                            ? match.teamA.name
                            : match.teamB?.name ?? "Equipo B"; // Proporciona un valor por defecto
                        if (!acc[teamName]) {
                          acc[teamName] = [];
                        }
                        acc[teamName].push(stat);
                        return acc;
                      }, {} as Record<string, any[]>) &&
                        Object.entries(
                          match.matchStats.reduce((acc, stat) => {
                            const teamName =
                              stat.teamId === match.teamA?.id
                                ? match.teamA.name
                                : match.teamB?.name ?? "Equipo B"; // Proporciona un valor por defecto
                            if (!acc[teamName]) {
                              acc[teamName] = [];
                            }
                            acc[teamName].push(stat);
                            return acc;
                          }, {} as Record<string, any[]>)
                        ).map(([teamName, stats]) => {
                          // Ordena los stats por kills en orden descendente
                          const sortedStats = stats.sort(
                            (a, b) => b.kills - a.kills
                          );
                          return (
                            <Box key={teamName} mt={2}>
                              <Text fontWeight="bold">{teamName}:</Text>
                              {sortedStats.map((stat) => (
                                <Text key={stat.id}>
                                  {stat.player?.name ?? "Jugador desconocido"},
                                  Kills: {stat.kills}, Muertes: {stat.deaths}
                                </Text>
                              ))}
                            </Box>
                          );
                        })}
                    </Box>
                  ) : (
                    <Text fontWeight="bold">Próximamente</Text>
                  )}

                  {/* Mostrar el botón Editar Partido solo si no hay un mapa */}
                  {!match.map && (
                    <Button
                      mt={2}
                      colorScheme="blue"
                      onClick={() => handleEditMatch(match.id)} // Llama a la función de edición
                    >
                      Editar Partido
                    </Button>
                  )}
                </Box>
              </AccordionPanel>
            </AccordionItem>
          ))
        ) : (
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Próximamente
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Box>
                <Text>No hay partidos programados en este momento.</Text>
                {/* Botón Editar Partido también visible aquí */}
                <Button
                  mt={2}
                  colorScheme="blue"
                  onClick={() => handleEditMatch(0)} // Puedes manejar la edición de una forma que tenga sentido para tu aplicación
                >
                  Editar Partido
                </Button>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        )}
      </Accordion>
    </>
  );
};

export default MatchList;
