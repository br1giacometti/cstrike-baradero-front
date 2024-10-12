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
  Button, // Importa Button de Chakra UI
  useDisclosure,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router"; // Importa useRouter para la navegación
import { Match, useAllMatchService } from "Match/data/MatchRepository";
import useDeleteMatchService from "Match/data/MatchRepository/hooks/useDeleteMatchService";

interface MatchListProps {
  defaultValues: Match[];
}

const MatchList = ({ defaultValues }: MatchListProps) => {
  const { t } = useTranslation("team");
  const toast = useToast();
  const router = useRouter(); // Inicializa useRouter

  const [expandedMatchId, setExpandedMatchId] = useState<number | null>(null);

  const handleAccordionToggle = (matchId: number) => {
    setExpandedMatchId((prev) => (prev === matchId ? null : matchId));
  };

  const handleCreateMatch = () => {
    // Asegúrate de que hay al menos un partido en defaultValues
    if (defaultValues.length > 0) {
      const tournamentId = defaultValues[0].id; // Reemplaza con el campo correcto
      const matchDayId = defaultValues[0].matchDayId; // Reemplaza con el campo correcto

      // Asegúrate de que los IDs de los equipos estén disponibles
      const teamAId = defaultValues[0]?.teamA?.id;
      const teamBId = defaultValues[0]?.teamB?.id;

      // Verifica que los IDs de los equipos no sean undefined
      if (teamAId && teamBId) {
        // Redirige a la página de creación de un partido
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
  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading as="h1">
          {defaultValues.length > 0 &&
            defaultValues[0].teamA &&
            defaultValues[0].teamB &&
            `${defaultValues[0].teamA.name} vs ${defaultValues[0].teamB.name}`}
        </Heading>
        <Button
          onClick={() => handleCreateMatch()}
          // O el color que prefieras
        >
          Crear Partido
        </Button>
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
                  {match.map ? (
                    <Text fontWeight="bold">Nombre del mapa: {match.map}</Text>
                  ) : (
                    <Text fontWeight="bold">Próximamente</Text>
                  )}
                  <Text>Kills y estadísticas de los jugadores aquí...</Text>
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
              </Box>
            </AccordionPanel>
          </AccordionItem>
        )}
      </Accordion>
    </>
  );
};

export default MatchList;
