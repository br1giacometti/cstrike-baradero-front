import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useTranslation } from "Base/i18n";
import FormPageLayout from "Base/layout/FormPageLayout";
import FormContainerLayout from "Base/layout/FormContainerLayout";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import { FormInputText } from "Base/components";
import { useCreateMatchStatsService } from "MatchStats/data/MatchStatsRepository";
import useTeamOptions from "MatchStats/hooks/useTeamOptions";
import createMatchStatsSchema, {
  CreateMatchStatsSchema,
} from "MatchStats/schemas/createMatchStatsSchema";
import MultiSelectMenu from "Player/components/multiselectMenu";
import { useRouter } from "next/router";

interface CreateMatchStatsProps {
  navigateToMatchStats: () => void;
  tournamentId: number;
  teamAId: number;
  teamBId: number;
  matchstatsDayId: number;
}

const CreateMatchStats = ({
  navigateToMatchStats,
  tournamentId,
  teamAId,
  teamBId,
  matchstatsDayId,
}: CreateMatchStatsProps) => {
  const { t } = useTranslation("team");
  const toast = useToast();
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMatchStatsSchema>({
    resolver: zodResolver(createMatchStatsSchema),
  });
  const [body, setBody] = useState<CreateMatchStatsSchema | null>(null);

  const { options, loading: loading2 } = useTeamOptions();

  const navigateToMatchStatsList = (
    matchstatsDayId: number,
    teamId: number // Cambia esto a teamId
  ) => {
    router.push(`/matchstats/filter/${matchstatsDayId}/${teamId}`); // Usa la nueva URL
  };

  const onSignUp = useCallback(
    (error?: string) => {
      if (error) {
        toast({
          status: "error",
          description: error,
        });
        return;
      }
      toast({
        status: "success",
        description: t("Partido Creado}"),
      });

      navigateToMatchStatsList(matchstatsDayId, teamAId);
    },
    [navigateToMatchStats, t, toast]
  );

  const { loading } = useCreateMatchStatsService(body, onSignUp);

  const handleCreateMatchStats = (data: CreateMatchStatsSchema) => {
    console.log("handleCreateMatchStats called");
    console.log("MatchStats Data:", data); // Verificar qué datos se envían
    // Aquí puedes usar los parámetros para crear el partido
    const matchstatsData = {
      ...data,
      tournamentId, // Añade el tournamentId si es necesario
      teamAId, // Añade el teamAId
      teamBId, // Añade el teamBId
      matchstatsDayId, // Añade el matchstatsDayId
    };

    setBody(matchstatsData);
  };

  return (
    <FormPageLayout onSubmit={handleSubmit(handleCreateMatchStats)}>
      <FormContainerLayout></FormContainerLayout>
      <Button
        colorScheme={"main"}
        isLoading={loading}
        loadingText="Submitting"
        maxW="container.sm"
        mt={8}
        type="submit"
        variant={"solid"}
      >
        {"Crear Torneo"}
      </Button>
    </FormPageLayout>
  );
};

export default CreateMatchStats;
