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
}

const CreateMatch = ({ navigateToMatch }: CreateMatchProps) => {
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
    setBody(data);
  };

  return (
    <FormPageLayout onSubmit={handleSubmit(handleCreateMatch)}>
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
        {"Crear Torneo"}
      </Button>
    </FormPageLayout>
  );
};

export default CreateMatch;
