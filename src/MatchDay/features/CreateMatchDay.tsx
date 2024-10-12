import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
} from "@chakra-ui/react";
import { useTranslation } from "Base/i18n";
import FormPageLayout from "Base/layout/FormPageLayout";
import FormContainerLayout from "Base/layout/FormContainerLayout";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import { FormInputText } from "Base/components";
import { useCreateMatchDayService } from "MatchDay/data/MatchDayRepository";
import useTeamOptions from "MatchDay/hooks/useTeamOptions";
import MultiSelectMenu from "MatchDay/components/multiselectMenu";
import createMatchDaySchema, {
  CreateMatchDaySchema,
} from "MatchDay/schemas/createMatchDaySchema";
import { Tournament } from "Tournament/data/TournamentRepository";
import { useRouter } from "next/router";
import { useAuthMethods, useAuthStatus } from "@kushitech/auth-module";

interface MatchDayCreatePageProps {
  defaultValues: Tournament; // Datos de MatchDay
}

const CreateMatchDay = ({ defaultValues }: MatchDayCreatePageProps) => {
  const { t } = useTranslation("team");
  const toast = useToast();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMatchDaySchema>({
    resolver: zodResolver(createMatchDaySchema),
  });
  const [body, setBody] = useState<CreateMatchDaySchema | null>(null);
  const router = useRouter();
  const [matches, setMatches] = useState<
    { teamAId: number; teamBId: number }[]
  >([]);

  const tournamentId = defaultValues.id; // Asegúrate de que esto esté correcto

  const navigateToCreateMatchDay = useCallback(
    () => router.push(`/tournament/detail/${tournamentId}`),
    [router]
  );

  const { validateToken } = useAuthMethods();
  console.log(validateToken);

  const onSignUp = useCallback(
    async (error?: string) => {
      if (error) {
        toast({
          status: "error",
          description: error,
        });
        return;
      }

      toast({
        status: "success",
        description: t("toast.create.success"),
      });

      navigateToCreateMatchDay();
    },
    [navigateToCreateMatchDay, t, toast]
  );

  const { loading } = useCreateMatchDayService(body, onSignUp);

  const handleCreateMatchDay = (data: CreateMatchDaySchema) => {
    console.log("handleCreateMatchDay called");

    const matchDayData = { ...data, tournamentId, matches };
    setBody(matchDayData);
  };

  const addMatch = (teamAId: number, teamBId: number) => {
    setMatches((prevMatches) => [...prevMatches, { teamAId, teamBId }]);
  };

  return (
    <FormPageLayout onSubmit={handleSubmit(handleCreateMatchDay)}>
      <FormContainerLayout>
        <FormSectionLayout>
          <FormInputText
            isRequired
            errorMessage={
              errors.name
                ? (t(`errors.${errors.name.message}`, {
                    ns: "common",
                  }) as string)
                : undefined
            }
            inputProps={register("name")}
            label={t("Nombre")}
            name="name"
          />
          <FormControl>
            <FormLabel>Seleccionar Partidos</FormLabel>
            <MultiSelectMenu
              teams={defaultValues.teams}
              onMatchAdd={addMatch} // Función para agregar partidos
              matches={matches}
            />
            <FormErrorMessage>
              {errors.matches && t(`errors.${errors.matches.message}`)}
            </FormErrorMessage>
          </FormControl>
        </FormSectionLayout>
      </FormContainerLayout>
      <Button
        colorScheme={"main"}
        isLoading={loading}
        loadingText="Submitting"
        maxW="container.sm"
        mt={8}
        type="submit"
        variant={"solid"}
      >
        {"Crear Fecha"}
      </Button>
    </FormPageLayout>
  );
};

export default CreateMatchDay;
