import { useEffect } from "react";

import { useForm } from "react-hook-form";
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
import { Team } from "Team/data/TeamRepository";
import { useTranslation } from "Base/i18n";

import useUpdateTeamService from "Team/data/TeamRepository/hooks/useUpdateTeamService";
import { FormInputText } from "Base/components";

import FormInputNumber from "Base/components/FormInputNumber";
import updateTeamSchema, {
  UpdateTeamSchema,
} from "Team/schemas/UpdateProductSchema";
import useUpdateTeamStates from "Team/hooks/useUpdateTeamStates";

interface EditTeamProps {
  defaultValues: Team;
}

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

  const handleUpdateTeam = (data: UpdateTeamSchema) =>
    updateTeam(data, defaultValues.id)
      .then((teamUpdated) => {
        reset();
        successFetch(teamUpdated);
        toast({
          status: "success",
          description: `${teamUpdated.name}  se actualizo`,
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
                  ? (t(`update.error.${errors.name.message}`) as string) // TODO: Deberia eleminar este casteo: `as string`
                  : undefined
              }
              inputProps={register("name")}
              label={t("Descripcion")}
              name="description"
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

export default EditTeam;
