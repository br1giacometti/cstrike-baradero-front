import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, useToast } from "@chakra-ui/react";
import { useTranslation } from "Base/i18n";

import FormPageLayout from "Base/layout/FormPageLayout";
import FormContainerLayout from "Base/layout/FormContainerLayout";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import { FormInputText, FormSelect } from "Base/components";
import useCreateGameService from "Game/data/GameRepository/hooks/useCreateGameService";
import FormInputNumber from "Base/components/FormInputNumber";
import { CreateGameSchema } from "Game/schemas/createGameSchema";

interface CreateGameProps {
  body: {
    totalScore: number;
    gameResults: {
      locationId: number;
      selectedX: number;
      selectedY: number;
      mapId: number;
      score: number;
    }[];
  } | null;
  children?: React.ReactNode; // Add this line
}

const SendGame = ({ body }: CreateGameProps) => {
  const { t } = useTranslation("game");
  const toast = useToast();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateGameSchema>({
    resolver: zodResolver(CreateGameSchema),
  });

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
      // Navega a otro lugar si es necesario
    },
    [t, toast]
  );

  const { loading } = useCreateGameService(body, onSignUp);

  // useState para el estado `body` si necesitas actualizarlo
  const [gameBody, setGameBody] = useState(body);

  const handleCreateGame = (data: CreateGameSchema) => {
    console.log("handleCreateGame called");
    console.log("Game Data:", data); // Verificar qué datos se envían
    // Aquí se actualiza el gameBody, asegurando que se pasa correctamente
    if (data) setGameBody(data);
  };

  return (
    <FormPageLayout onSubmit={handleSubmit(handleCreateGame)}>
      <FormContainerLayout>
        <FormSectionLayout></FormSectionLayout>
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
        {t("create.button.submit")}
      </Button>
    </FormPageLayout>
  );
};

export default SendGame;
