import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useToast,
  Input,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Match } from "Match/data/MatchRepository";
import { useTranslation } from "Base/i18n";
import useUpdateMatchService from "Match/data/MatchRepository/hooks/useUpdateMatchService";
import { FormInputText } from "Base/components";
import updateMatchSchema, {
  UpdateMatchSchema,
} from "Match/schemas/UpdateMatchSchema";
import useUpdateMatchStates from "Match/hooks/useUpdateMatchStates";
import DataTable from "Base/components/DataTable";

// Define la interfaz MatchStat
interface MatchStat {
  matchId: number;
  playerId: number;
  teamId?: number;
  kills: number;
  deaths: number;
}

interface Player {
  id: number;
  name: string;
  kills: number;
  deaths: number;
}

interface EditMatchProps {
  defaultValues: Match;
}

const EditMatch = ({ defaultValues }: EditMatchProps) => {
  const router = useRouter();
  const toast = useToast();
  const { t } = useTranslation("team");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateMatchSchema>({
    resolver: zodResolver(updateMatchSchema),
    defaultValues: {
      map: defaultValues.map,
      resultTeamA: defaultValues.resultTeamA,
      resultTeamB: defaultValues.resultTeamB,
    },
  });

  const { teamA, teamB } = defaultValues;

  const { error, successFetch, failureFetch } = useUpdateMatchStates();
  const { updateMatch } = useUpdateMatchService();

  const navigateToMatchList = (matchDayId: number, teamId: number) => {
    router.push(`/match/filter/${matchDayId}/${teamId}`);
  };

  const handleUpdateMatch = async (data: UpdateMatchSchema) => {
    try {
      const updatedData = {
        ...data,
        matchStats,
      };

      console.log("Datos que se envían al backend:", updatedData);

      const matchUpdated = await updateMatch(updatedData, defaultValues.id);
      reset();
      successFetch(matchUpdated);
      toast({
        status: "success",
        description: `${matchUpdated.id} se actualizó`,
      });

      const { matchDayId, teamA } = defaultValues;
      if (matchDayId && teamA?.id) {
        navigateToMatchList(matchDayId, teamA.id);
      } else {
        console.error(
          "matchDayId or teamA is undefined in defaultValues:",
          defaultValues
        );
        toast({
          status: "error",
          description:
            "No se pudieron obtener los IDs necesarios para la navegación.",
        });
      }
    } catch (axiosError) {
      console.error("Error al actualizar el partido:", axiosError);
    }
  };

  useEffect(() => {
    if (error) {
      toast({ status: "error", description: error });
    }
  }, [error, toast]);

  const [playersA, setPlayersA] = useState<Player[]>(
    teamA?.players.map((player) => ({
      id: player.id,
      name: player.name,
      kills: 0,
      deaths: 0,
    })) || []
  );

  const [playersB, setPlayersB] = useState<Player[]>(
    teamB?.players.map((player) => ({
      id: player.id,
      name: player.name,
      kills: 0,
      deaths: 0,
    })) || []
  );
  // Estado para matchStats con tipo definido
  const [matchStats, setMatchStats] = useState<MatchStat[]>([]);

  const handleUpdatePlayer = (
    team: "A" | "B",
    id: number,
    kills: number,
    deaths: number
  ) => {
    if (team === "A") {
      setPlayersA((prev) =>
        prev?.map((player) =>
          player.id === id ? { ...player, kills, deaths } : player
        )
      );
    } else {
      setPlayersB((prev) =>
        prev?.map((player) =>
          player.id === id ? { ...player, kills, deaths } : player
        )
      );
    }

    setMatchStats((prev) => {
      const existingStatIndex = prev.findIndex(
        (stat) =>
          stat.playerId === id &&
          (team === "A" ? stat.teamId === teamA?.id : stat.teamId === teamB?.id)
      );

      if (existingStatIndex >= 0) {
        const updatedStat = {
          matchId: defaultValues.id,
          playerId: id,
          teamId: team === "A" ? teamA?.id : teamB?.id,
          kills,
          deaths,
        };
        const updatedStats = [...prev];
        updatedStats[existingStatIndex] = updatedStat;
        return updatedStats;
      } else {
        return [
          ...prev,
          {
            matchId: defaultValues.id,
            playerId: id,
            teamId: team === "A" ? teamA?.id : teamB?.id,
            kills,
            deaths,
          },
        ];
      }
    });
  };

  const columns = [
    { label: "Nombre", selector: (row: Player) => row.name },
    {
      label: "Kills",
      selector: (row: Player) => (
        <Input
          type="number"
          value={row.kills}
          onChange={(e) =>
            handleUpdatePlayer("A", row.id, Number(e.target.value), row.deaths)
          }
        />
      ),
    },
    {
      label: "Deaths",
      selector: (row: Player) => (
        <Input
          type="number"
          value={row.deaths}
          onChange={(e) =>
            handleUpdatePlayer("A", row.id, row.kills, Number(e.target.value))
          }
        />
      ),
    },
  ];

  const columnsB = [
    { label: "Nombre", selector: (row: Player) => row.name },
    {
      label: "Kills",
      selector: (row: Player) => (
        <Input
          type="number"
          value={row.kills}
          onChange={(e) =>
            handleUpdatePlayer("B", row.id, Number(e.target.value), row.deaths)
          }
        />
      ),
    },
    {
      label: "Deaths",
      selector: (row: Player) => (
        <Input
          type="number"
          value={row.deaths}
          onChange={(e) =>
            handleUpdatePlayer("B", row.id, row.kills, Number(e.target.value))
          }
        />
      ),
    },
  ];

  return (
    <Flex
      as="form"
      justifyContent={{ base: "center", lg: "flex-start" }}
      paddingBottom={16}
      paddingX={{ lg: 32 }}
      onSubmit={handleSubmit(handleUpdateMatch)}
    >
      <Box>
        <Heading>{t("Actualizar Partido")}</Heading>
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
                errors.map
                  ? (t(`update.error.${errors.map.message}`) as string)
                  : undefined
              }
              inputProps={register("map")}
              label={t("Nombre Mapa")}
              name="map"
            />
          </Stack>
          <Flex flexDirection="column" width="full">
            <Heading size="md" mb={4}>
              {t(`${teamA?.name}`)}
            </Heading>{" "}
            <Box mb={4}>
              <FormInputText
                errorMessage={
                  errors.resultTeamA
                    ? (t(
                        `update.error.${errors.resultTeamA.message}`
                      ) as string)
                    : undefined
                }
                inputProps={register("resultTeamA")}
                label={t(`Resultado`)} // Aquí se muestra el nombre del equipo A
                name="resultTeamA"
                type="number"
              />
            </Box>
            {/* Aquí se muestra el nombre del equipo A */}
            <DataTable data={playersA} columns={columns} />
          </Flex>
          <Flex flexDirection="column" width="full">
            <Heading size="md">{t(`${teamB?.name}`)}</Heading>{" "}
            <Box mb={4}>
              <FormInputText
                errorMessage={
                  errors.resultTeamB
                    ? (t(
                        `update.error.${errors.resultTeamB.message}`
                      ) as string)
                    : undefined
                }
                inputProps={register("resultTeamB")}
                label={t(`Resultado`)} // Aquí se muestra el nombre del equipo A
                name="resultTeamB"
                type="number"
              />
            </Box>
            {/* Aquí se muestra el nombre del equipo B */}
            <DataTable data={playersB} columns={columnsB} />
          </Flex>
          <Button type="submit" colorScheme={"main"} isLoading={isSubmitting}>
            {t("Actualizar Partido")}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default EditMatch;
