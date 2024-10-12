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
import { Tournament } from "Tournament/data/TournamentRepository";
import { useTranslation } from "Base/i18n";

import useUpdateTournamentService from "Tournament/data/TournamentRepository/hooks/useUpdateTournamentService";
import { FormInputText, FormSelect } from "Base/components";

import FormInputNumber from "Base/components/FormInputNumber";

import useTeamOptions from "Tournament/hooks/useTeamOptions";
import updateTournamentSchema, {
  UpdateTournamentSchema,
} from "Tournament/schemas/UpdateTournamentSchema";
import useUpdateTournamentStates from "Tournament/hooks/useUpdateTournamentStates";

interface EditTournamentProps {
  defaultValues: Tournament;
}

const EditTournament = ({ defaultValues }: EditTournamentProps) => {
  const router = useRouter();
  const toast = useToast();
  const { t } = useTranslation("tournament");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateTournamentSchema>({
    resolver: zodResolver(updateTournamentSchema),
    defaultValues: {
      name: defaultValues.name,
    },
  });

  const { options, loading: loadingTeams } = useTeamOptions();

  const { error, successFetch, failureFetch } = useUpdateTournamentStates();

  const { updateTournament } = useUpdateTournamentService();

  const handleUpdateTournament = (data: UpdateTournamentSchema) =>
    updateTournament(data, defaultValues.id)
      .then((tournamentUpdated) => {
        reset();
        successFetch(tournamentUpdated);
        toast({
          status: "success",
          description: `${tournamentUpdated.name}  se actualizo`,
        });
        router.push("/tournament");
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
      onSubmit={handleSubmit(handleUpdateTournament)}
    >
      <Box>
        <Heading>{t("Actualizar Jugador")}</Heading>
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
                  ? (t(`update.error.${errors.name.message}`) as string) // TODO: Deberia eleminar este casteo: `as string`
                  : undefined
              }
              inputProps={register("name")}
              label={t("Nombre")}
              name="name"
            />

            <Controller
              control={control}
              name="teamId"
              render={({ field }) => (
                <FormSelect
                  ref={field.ref}
                  errorMessage={
                    errors.teamId?.message
                      ? "Debe seleccionar un Equipo"
                      : undefined
                  }
                  isLoading={loadingTeams} // Indica si está cargando
                  label={t("Equipo")}
                  name={field.name}
                  options={options}
                  value={
                    options.find((option) => option.value === field.value) ||
                    null
                  }
                  onChange={(selectedOption) => {
                    if (selectedOption && "value" in selectedOption) {
                      field.onChange(selectedOption.value);
                    } else {
                      field.onChange(null);
                    }
                  }}
                />
              )}
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

export default EditTournament;
