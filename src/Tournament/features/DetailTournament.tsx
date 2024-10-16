import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Match, MatchDay } from "MatchDay/data/MatchDayRepository";
import { useRouter } from "next/router";
import { Team } from "Team/data/TeamRepository";
import { Tournament } from "Tournament/data/TournamentRepository";
import { useCallback, useEffect, useState } from "react"; // Asegúrate de importar useCallback
import { UpdateTournamentSchema } from "Tournament/schemas/UpdateTournamentSchema";
import useUpdateStageTournamentService from "Tournament/data/TournamentRepository/hooks/useUpdateStageTournamentService";
import useUpdateTournamentStageStates from "Tournament/hooks/useUpdateTournamentStageStates";
import ConfirmCreateModal from "Tournament/components/ConfirmCreateDialog";

interface DetailTournamentProps {
  defaultValues: Tournament;
  navigateToMatchDay: () => void; // Asegúrate de agregar esta prop
}

const DetailTournament = ({
  defaultValues,
  navigateToMatchDay,
}: DetailTournamentProps) => {
  const router = useRouter();
  const toast = useToast();

  const [isUpdating, setIsUpdating] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura del modal

  // Función para navegar de regreso a la lista de torneos
  const handleGoBack = () => router.push("/tournament");

  // Crear un mapeo de IDs a nombres de equipos
  const teamNameMap = defaultValues.teams.reduce<Record<number, string>>(
    (acc, team) => {
      acc[team.id] = team.name;
      return acc;
    },
    {}
  );

  // Función para filtrar partidos por `matchDayId`
  const getMatchesByMatchDay = (matchDayId: number): Match[] =>
    defaultValues.matches.filter((match) => match.matchDayId === matchDayId);

  // Agrupar partidos por equipos (Equipo A vs Equipo B) para evitar duplicados
  const groupMatchesByTeams = (matches: Match[]): Match[] => {
    const grouped: Record<string, Match[]> = {};

    matches.forEach((match) => {
      const key = [match.teamAId, match.teamBId].sort().join("-");
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(match);
    });

    return Object.values(grouped).map((matchesGroup) => matchesGroup[0]); // Devolver solo un partido por grupo
  };

  const navigateToMatchList = (
    matchDayId: number,
    teamId: number // Cambia esto a teamId
  ) => {
    router.push(`/match/filter/${matchDayId}/${teamId}`); // Usa la nueva URL
  };

  const handleNavigateToMatchDay = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Evita el comportamiento por defecto si es necesario
    navigateToMatchDay();
  };
  const { error, successFetch, failureFetch } =
    useUpdateTournamentStageStates();

  const { updateTournamentStage } = useUpdateStageTournamentService();

  const handleUpdateTournament = async () => {
    // Verifica si ya está en proceso de actualización
    if (isUpdating) return;

    setIsUpdating(true); // Desactiva el botón
    try {
      // Determina el nuevo estado basado en el estado actual del torneo
      const newStatus =
        defaultValues.status === "GROUP_STAGE" ? "SEMIFINALS" : "FINAL";

      const data: UpdateTournamentSchema = {
        // Pasa el nuevo estado para la actualización
        status: newStatus,
      };

      const tournamentUpdated = await updateTournamentStage(
        data,
        defaultValues.id
      );
      successFetch(tournamentUpdated);
      toast({
        status: "success",
        description: `${tournamentUpdated.name} se actualizó`,
      });
      router.push("/tournament");
    } catch (axiosError) {
      // Manejo de errores
    } finally {
      setIsUpdating(false); // Reactiva el botón
      setIsModalOpen(false); // Cierra el modal
    }
  };

  return (
    <Flex direction="column" maxW="600px" mx="auto" mt={8}>
      <Heading mb={6}>Detalles del Torneo</Heading>

      <Stack spacing={4}>
        {/* Nombre del Torneo */}
        <Box>
          <Text fontWeight="bold">Nombre del Torneo:</Text>
          <Text>{defaultValues.name}</Text>
        </Box>

        <Box>
          <Text fontWeight="bold">Etapa del Torneo:</Text>
          <Text>{defaultValues.status}</Text>
        </Box>

        {/* Botón "Avanzar de Etapa" solo si el estado no es "FINAL" */}
        {/* Botón "Avanzar de Etapa" solo si el estado no es "FINAL" */}
        {defaultValues.status !== "FINAL" && (
          <Button
            mt={4}
            colorScheme="orange"
            onClick={() => setIsModalOpen(true)} // Abre el modal
          >
            Avanzar de Etapa
          </Button>
        )}

        {/* Modal de confirmación */}
        <ConfirmCreateModal
          title="Confirmar Avance de Etapa"
          description={`¿Estás seguro de que deseas avanzar a la etapa ${
            defaultValues.status === "GROUP_STAGE" ? "Semifinales" : "Finales"
          }?`} // Ajusta el texto
          isLoading={isUpdating}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)} // Cierra el modal
          onConfirm={handleUpdateTournament} // Maneja la confirmación
        />

        {/* Equipos Asociados */}
        <Box>
          <Text fontWeight="bold">Equipos Asociados:</Text>
          {defaultValues.teams.length ? (
            <Stack spacing={2} mt={2}>
              {defaultValues.teams.map((team: Team) => (
                <Text key={team.id}>- {team.name}</Text>
              ))}
            </Stack>
          ) : (
            <Text>No hay equipos asociados.</Text>
          )}
        </Box>

        {/* Fechas (MatchDays) con partidos */}
        <Box>
          <Flex justify="space-between" align="center">
            <Text fontWeight="bold">Fechas del Torneo:</Text>
            <Button colorScheme="blue" onClick={handleNavigateToMatchDay}>
              Nueva Fecha
            </Button>
          </Flex>
          {defaultValues.MatchDay.length ? (
            <Accordion allowMultiple mt={2}>
              {defaultValues.MatchDay.map((matchDay: MatchDay) => {
                const matches = getMatchesByMatchDay(matchDay.id);
                const uniqueMatches = groupMatchesByTeams(matches);

                return (
                  <AccordionItem key={matchDay.id}>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        {matchDay.name}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel pb={4}>
                      {uniqueMatches.length ? (
                        <Stack spacing={2}>
                          {uniqueMatches.map((match: Match) => (
                            <Box
                              key={`${match.teamAId}-${match.teamBId}`}
                              onClick={() => {
                                // Puedes elegir pasar teamAId o teamBId
                                navigateToMatchList(matchDay.id, match.teamAId); // O match.teamBId según lo que necesites
                              }}
                              cursor="pointer"
                            >
                              <Text>
                                Equipo {teamNameMap[match.teamAId]} vs Equipo{" "}
                                {teamNameMap[match.teamBId]}
                              </Text>
                            </Box>
                          ))}
                        </Stack>
                      ) : (
                        <Text>No hay partidos para esta fecha.</Text>
                      )}
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          ) : (
            <Text>No hay fechas registradas.</Text>
          )}
        </Box>
      </Stack>

      {/* Botón para volver */}
      <Button mt={8} colorScheme="teal" onClick={handleGoBack}>
        Volver
      </Button>
    </Flex>
  );
};

export default DetailTournament;
