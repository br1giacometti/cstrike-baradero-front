import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, useToast } from "@chakra-ui/react";
import { useTranslation } from "Base/i18n";

import FormPageLayout from "Base/layout/FormPageLayout";
import FormContainerLayout from "Base/layout/FormContainerLayout";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import { FormInputText, FormSelect } from "Base/components";
import FormInputNumber from "Base/components/FormInputNumber";
import { useCreateTeamService } from "Team/data/TeamRepository";
import createTeamSchema, {
  CreateTeamSchema,
} from "Team/schemas/createTeamSchema";

interface CreateTeamProps {
  navigateToTeam: () => void;
}

const CreateTeam = ({ navigateToTeam }: CreateTeamProps) => {
  const { t } = useTranslation("team");
  const toast = useToast();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTeamSchema>({
    resolver: zodResolver(createTeamSchema),
  });
  const [body, setBody] = useState<CreateTeamSchema | null>(null);

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
      navigateToTeam();
    },
    [navigateToTeam, t, toast]
  );

  const { loading } = useCreateTeamService(body, onSignUp);

  const handleCreateTeam = (data: CreateTeamSchema) => {
    console.log("handleCreateTeam called");
    console.log("Team Data:", data); // Verificar qué datos se envían
    setBody(data);
  };

  return (
    <FormPageLayout onSubmit={handleSubmit(handleCreateTeam)}>
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
            label={t("create.label.name")}
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
        {t("create.button.submit")}
      </Button>
    </FormPageLayout>
  );
};

export default CreateTeam;
