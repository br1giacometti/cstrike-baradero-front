import { useCallback, useEffect, useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Select,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { Team } from "Team/data/TeamRepository";
import { useTranslation } from "Base/i18n";

import useUpdateTeamService from "Team/data/TeamRepository/hooks/useUpdateTeamService";
import { FormInputText } from "Base/components";

import updateTeamSchema, {
  UpdateTeamSchema,
} from "Team/schemas/UpdateProductSchema";
import useUpdateTeamStates from "Team/hooks/useUpdateTeamStates";

import DataTable, { BaseColumn } from "Base/components/DataTable";
import { Player } from "Player/data/PlayerRepository";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ConfirmDeleteModal from "MatchDay/components/ConfirmDeleteDialog";
import useDisconnectTeamPlayerService from "Player/data/PlayerRepository/hooks/useDisconnectTeamPlayerService";
import usePlayersNoTeamOptions from "Player/hooks/usePlayersNoTeamOption";
import useConnectTeamPlayerService from "Player/data/PlayerRepository/hooks/useConnectTeamPlayerService";

interface EditTeamProps {
  defaultValues: Team;
}

type DeleteState = {
  loading: boolean;
  selected: Team | null;
};

const EditTeam = ({ defaultValues }: EditTeamProps) => {
  const router = useRouter();
  const toast = useToast();
  const { t } = useTranslation("team");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateTeamSchema>({
    resolver: zodResolver(updateTeamSchema),
    defaultValues: {
      name: defaultValues.name,
    },
  });

  const { error, successFetch, failureFetch } = useUpdateTeamStates();
  const { updateTeam } = useUpdateTeamService();
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
  const { disconnectPlayer } = useDisconnectTeamPlayerService();
  const [deleteState, setDeleteState] = useState<DeleteState>({
    loading: false,
    selected: null,
  });
  const { options, loading: playersLoading } = usePlayersNoTeamOptions();
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const { connectPlayer } = useConnectTeamPlayerService();
  const [players, setPlayers] = useState<Player[]>(defaultValues.players);

  const handleDelete = useCallback(
    (player: any) => {
      setDeleteState({ loading: false, selected: player });
      onOpen();
    },
    [onOpen]
  );

  const handleAddPlayer = useCallback(() => {
    if (selectedPlayerId !== null) {
      // Asumimos que `selectedPlayerId` es el value (ID del jugador) seleccionado
      const selectedPlayer = options.find(
        (option) => option.value === selectedPlayerId
      );

      if (selectedPlayer) {
        const newPlayer: Player = {
          id: selectedPlayer.value, // ID del jugador
          name: selectedPlayer.label, // Nombre del jugador
          teamId: defaultValues.id, // Asignando el ID del equipo o lo que necesites
        };

        // Validar si el jugador ya existe en la lista
        const playerExists = players.some(
          (player) => player.id === newPlayer.id
        );

        if (playerExists) {
          toast({
            title: `El jugador ya está agregado`,
            status: "warning", // Puedes usar "warning" o "error" según tu preferencia
          });
        } else {
          connectPlayer(newPlayer.id, newPlayer.teamId)
            .then(() => {
              toast({
                title: `Jugador agregado exitosamente`,
                status: "success",
              });
              // Actualiza la lista de jugadores
              setPlayers((prev) => [...prev, newPlayer]);
            })
            .catch(() => {
              toast({
                title: `Error al agregar el jugador`,
                status: "error",
              });
            });
        }
      } else {
        toast({
          title: `Jugador no encontrado`,
          status: "error",
        });
      }
    }
  }, [selectedPlayerId, options, defaultValues.id, players, toast]);

  const onDelete = useCallback(() => {
    setDeleteState((prev) => ({ ...prev, loading: true }));
    const playerId = deleteState.selected?.id;

    if (playerId && !isNaN(playerId)) {
      disconnectPlayer(playerId)
        .then((deleted) => {
          if (deleted) {
            toast({
              title: `${deleteState.selected?.name} fue eliminado`,
              status: "success",
              isClosable: true,
            });
            // Elimina el jugador de la lista de jugadores
            setPlayers((prev) =>
              prev.filter((player) => player.id !== playerId)
            );
          }
        })
        .catch(() => {
          toast({
            title: `El jugador no se pudo eliminar`,
            status: "error",
            isClosable: true,
          });
        })
        .finally(() => {
          setDeleteState({
            loading: false,
            selected: null,
          });
          onClose();
        });
    } else {
      console.error("ID del jugador no es válido:", playerId);
      setDeleteState((prev) => ({ ...prev, loading: false })); // Restablecer loading
      onClose();
    }
  }, [deleteState.selected, onClose, toast, disconnectPlayer]);

  const columns: BaseColumn<Player>[] = useMemo(
    () => [
      {
        label: t("datatable.label.description"),
        selector: (row) => row.name,
      },
      {
        label: t("Acciones"),
        selector: (row) => (
          <Flex gap={2}>
            <Tooltip label={t("Eliminar")} placement="bottom">
              <IconButton
                aria-label="Delete icon"
                colorScheme="red"
                icon={<DeleteIcon />}
                isDisabled={
                  deleteState.loading && row.id !== deleteState.selected?.id
                }
                isLoading={
                  deleteState.loading && row.id === deleteState.selected?.id
                }
                size="sm"
                variant="outline"
                onClick={() => handleDelete(row)}
              />
            </Tooltip>
          </Flex>
        ),
      },
    ],
    [deleteState.loading, deleteState.selected?.id, handleDelete, t]
  );

  const handleUpdateTeam = (data: UpdateTeamSchema) =>
    updateTeam(data, defaultValues.id)
      .then((teamUpdated) => {
        reset();
        successFetch(teamUpdated);
        toast({
          status: "success",
          description: `${teamUpdated.name} se actualizo`,
        });
        router.push("/team");
      })
      .catch((axiosError) => {
        failureFetch(axiosError.response.data.message);
      });

  useEffect(() => {
    if (error) {
      toast({ status: "error", description: error });
    }
  }, [error, toast]);

  return (
    <Flex
      as="form"
      justifyContent={{ base: "center", lg: "flex-start" }}
      paddingBottom={16}
      paddingX={{ lg: 32 }}
      onSubmit={handleSubmit(handleUpdateTeam)}
    >
      <Box>
        <Heading>{t("Actualizar Equipo")}</Heading>
        <Flex
          flexDirection={{ base: "column" }}
          gap={{ base: 12 }}
          mt={8}
          w={{ base: "auto" }}
        >
          <Stack maxW={"md"} spacing={6} w={"full"}>
            <FormInputText
              isRequired
              errorMessage={
                errors.name
                  ? (t(`update.error.${errors.name.message}`) as string) // TODO: Deberia eliminar este casteo: `as string`
                  : undefined
              }
              inputProps={register("name")}
              label={t("Descripcion")}
              name="description"
            />
          </Stack>

          <DataTable columns={columns} data={players} />
          {deleteState.selected && (
            <ConfirmDeleteModal
              description={deleteState.selected?.name}
              isLoading={deleteState.loading}
              isOpen={isOpen}
              title={t("Eliminar Team", {
                description: deleteState.selected?.name,
              })}
              onClose={onClose}
              onConfirm={onDelete}
            />
          )}

          <Flex justifyContent={"space-between"}>
            <Select
              placeholder="Seleccionar jugador"
              onChange={(e) => setSelectedPlayerId(Number(e.target.value))}
              w={"60%"}
            >
              {options.map((player) => (
                <option key={player.value} value={player.value}>
                  {player.label}
                </option>
              ))}
            </Select>
            <Button
              colorScheme="blue"
              disabled={isSubmitting || selectedPlayerId === null}
              onClick={handleAddPlayer}
            >
              {t("Agregar Jugador")}
            </Button>
          </Flex>

          <Button
            colorScheme="teal"
            type="submit"
            isLoading={isSubmitting}
            loadingText={t("Guardando...")}
            isDisabled={isSubmitting}
          >
            {t("Actualizar Equipo")}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default EditTeam;
