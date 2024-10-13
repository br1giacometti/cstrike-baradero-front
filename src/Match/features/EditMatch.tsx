import { useEffect } from "react";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { Match } from "Match/data/MatchRepository";
import { useTranslation } from "Base/i18n";

import useUpdateMatchService from "Match/data/MatchRepository/hooks/useUpdateMatchService";
import { FormInputText, FormSelect } from "Base/components";

import FormInputNumber from "Base/components/FormInputNumber";

import useTeamOptions from "Match/hooks/useTeamOptions";
import updateMatchSchema, {
  UpdateMatchSchema,
} from "Match/schemas/UpdateMatchSchema";
import useUpdateMatchStates from "Match/hooks/useUpdateMatchStates";

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

  console.log(defaultValues);

  const navigateToMatchList = (
    matchDayId: number,
    teamId: number // Cambia esto a teamId
  ) => {
    router.push(`/match/filter/${matchDayId}/${teamId}`); // Usa la nueva URL
  };

  const { options, loading: loadingTeams } = useTeamOptions();

  const { error, successFetch, failureFetch } = useUpdateMatchStates();

  const { updateMatch } = useUpdateMatchService();

  const handleUpdateMatch = async (data: UpdateMatchSchema) => {
    try {
      const matchUpdated = await updateMatch(data, defaultValues.id);
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
    } catch (axiosError) {}
  };

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
                  ? (t(`update.error.${errors.map.message}`) as string) // TODO: Deberia eleminar este casteo: `as string`
                  : undefined
              }
              inputProps={register("map")}
              label={t("Nombre Mapa")}
              name="map"
            />

            <FormInputText
              errorMessage={
                errors.resultTeamA
                  ? (t(`update.error.${errors.resultTeamA.message}`) as string) // TODO: Deberia eleminar este casteo: `as string`
                  : undefined
              }
              inputProps={register("resultTeamA")}
              label={t("resultTeamA")}
              name="resultTeamA"
            />
            <FormInputText
              errorMessage={
                errors.resultTeamB
                  ? (t(`update.error.${errors.resultTeamB.message}`) as string) // TODO: Deberia eleminar este casteo: `as string`
                  : undefined
              }
              inputProps={register("resultTeamB")}
              label={t("resultTeamB")}
              name="resultTeamB"
            />
          </Stack>

          <Button
            bg="main.500"
            color="white"
            isLoading={isSubmitting}
            type="submit"
          >
            {t("Actualizar")}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default EditMatch;
