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
import { Player } from "Player/data/PlayerRepository";
import { useTranslation } from "Base/i18n";

import useUpdatePlayerService from "Player/data/PlayerRepository/hooks/useUpdatePlayerService";
import { FormInputText, FormSelect } from "Base/components";

import FormInputNumber from "Base/components/FormInputNumber";
import updatePlayerSchema, {
  UpdatePlayerSchema,
} from "Player/schemas/UpdatePlayerSchema";
import useUpdatePlayerStates from "Player/hooks/useUpdatePlayerStates";
import useTeamOptions from "Player/hooks/useTeamOptions";

interface EditPlayerProps {
  defaultValues: Player;
}

const EditPlayer = ({ defaultValues }: EditPlayerProps) => {
  const router = useRouter();
  const toast = useToast();
  const { t } = useTranslation("player");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdatePlayerSchema>({
    resolver: zodResolver(updatePlayerSchema),
    defaultValues: {
      name: defaultValues.name,
      teamId: defaultValues.teamId,
    },
  });

  const { options, loading: loadingTeams } = useTeamOptions();

  const { error, successFetch, failureFetch } = useUpdatePlayerStates();

  const { updatePlayer } = useUpdatePlayerService();

  const handleUpdatePlayer = (data: UpdatePlayerSchema) =>
    updatePlayer(data, defaultValues.id)
      .then((playerUpdated) => {
        reset();
        successFetch(playerUpdated);
        toast({
          status: "success",
          description: `${playerUpdated.name}  se actualizo`,
        });
        router.push("/player");
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
      onSubmit={handleSubmit(handleUpdatePlayer)}
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

export default EditPlayer;
