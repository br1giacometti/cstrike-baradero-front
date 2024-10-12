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
import { useCreateMatchService } from "Match/data/MatchRepository";
import useTeamOptions from "Match/hooks/useTeamOptions";
import createMatchSchema, {
  CreateMatchSchema,
} from "Match/schemas/createMatchSchema";
import MultiSelectMenu from "Player/components/multiselectMenu";

interface CreateMatchProps {
  navigateToMatch: () => void;
  tournamentId: number;
  teamAId: number;
  teamBId: number;
  matchDayId: number;
}

const CreateMatch = ({
  navigateToMatch,
  tournamentId,
  teamAId,
  teamBId,
  matchDayId,
}: CreateMatchProps) => {
  const { t } = useTranslation("team");
  const toast = useToast();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMatchSchema>({
    resolver: zodResolver(createMatchSchema),
  });
  const [body, setBody] = useState<CreateMatchSchema | null>(null);

  const { options, loading: loading2 } = useTeamOptions();

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
        description: t("toast.create.success"),
      });
      navigateToMatch();
    },
    [navigateToMatch, t, toast]
  );

  const { loading } = useCreateMatchService(body, onSignUp);

  const handleCreateMatch = (data: CreateMatchSchema) => {
    console.log("handleCreateMatch called");
    console.log("Match Data:", data); // Verificar qué datos se envían
    // Aquí puedes usar los parámetros para crear el partido
    const matchData = {
      ...data,
      tournamentId, // Añade el tournamentId si es necesario
      teamAId, // Añade el teamAId
      teamBId, // Añade el teamBId
      matchDayId, // Añade el matchDayId
    };

    setBody(matchData);
  };

  return (
    <FormPageLayout onSubmit={handleSubmit(handleCreateMatch)}>
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

export default CreateMatch;
