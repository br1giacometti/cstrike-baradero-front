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

import useDeleteMatchStatsService from "MatchStats/data/MatchStatsRepository/hooks/useDeleteMatchStatsService";

interface MatchStatsListProps {
  defaultValues: MatchStats[];
}

const MatchStatsList = ({ defaultValues }: MatchStatsListProps) => {
  const { t } = useTranslation("team");
  const toast = useToast();
  const router = useRouter();

  const [expandedMatchStatsId, setExpandedMatchStatsId] = useState<
    number | null
  >(null);

  const handleAccordionToggle = (matchstatsId: number) => {
    setExpandedMatchStatsId((prev) =>
      prev === matchstatsId ? null : matchstatsId
    );
  };

  const handleCreateMatchStats = () => {
    if (defaultValues.length > 0) {
      const tournamentId = defaultValues[0].tournament?.id;
      const matchstatsDayId = defaultValues[0].matchstatsDayId;

      const teamAId = defaultValues[0]?.teamA?.id;
      const teamBId = defaultValues[0]?.teamB?.id;

      if (teamAId && teamBId) {
        router.push({
          pathname: "/matchstats/create",
          query: { tournamentId, teamAId, teamBId, matchstatsDayId },
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

  const handleEditMatchStats = (matchstatsId: number) => {
    router.push(`/matchstats/edit/${matchstatsId}`); // Redirige a la página de edición del partido
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
        <Button onClick={handleCreateMatchStats}>Crear Partido</Button>
      </Flex>
      <Accordion allowToggle>
        {defaultValues.length > 0 ? (
          defaultValues.map((matchstats) => (
            <AccordionItem key={matchstats.id}>
              <AccordionButton
                onClick={() => handleAccordionToggle(matchstats.id)}
              >
                <Box flex="1" textAlign="left" fontWeight="bold">
                  {matchstats.map
                    ? `${matchstats.teamA?.name || "Equipo A"} ${
                        matchstats.resultTeamA || 0
                      } VS ${matchstats.resultTeamB || 0} ${
                        matchstats.teamB?.name || "Equipo B"
                      }`
                    : `${matchstats.teamA?.name || "Equipo A"} VS ${
                        matchstats.teamB?.name || "Equipo B"
                      } - Próximamente`}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Box>
                  {matchstats.map ? (
                    <Text fontWeight="bold">
                      Nombre del mapa: {matchstats.map}
                    </Text>
                  ) : (
                    <Text fontWeight="bold">Próximamente</Text>
                  )}
                  <Text>Kills y estadísticas de los jugadores aquí...</Text>
                  {/* Botón Editar Partido siempre visible */}
                  <Button
                    mt={2}
                    colorScheme="blue"
                    onClick={() => handleEditMatchStats(matchstats.id)} // Llama a la función de edición
                  >
                    Editar Partido
                  </Button>
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
                  onClick={() => handleEditMatchStats(0)} // Puedes manejar la edición de una forma que tenga sentido para tu aplicación
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

export default MatchStatsList;
