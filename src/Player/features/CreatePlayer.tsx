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
import { useCreatePlayerService } from "Player/data/PlayerRepository";
import useTeamOptions from "Player/hooks/useTeamOptions";
import createPlayerSchema, {
  CreatePlayerSchema,
} from "Player/schemas/createPlayerSchema";

interface CreatePlayerProps {
  navigateToPlayer: () => void;
}

const CreatePlayer = ({ navigateToPlayer }: CreatePlayerProps) => {
  const { t } = useTranslation("player");
  const toast = useToast();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePlayerSchema>({
    resolver: zodResolver(createPlayerSchema),
  });
  const [body, setBody] = useState<CreatePlayerSchema | null>(null);

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
      navigateToPlayer();
    },
    [navigateToPlayer, t, toast]
  );

  const { loading } = useCreatePlayerService(body, onSignUp);

  const handleCreatePlayer = (data: CreatePlayerSchema) => {
    console.log("handleCreatePlayer called");
    console.log("Player Data:", data); // Verificar qué datos se envían
    setBody(data);
  };

  return (
    <FormPageLayout onSubmit={handleSubmit(handleCreatePlayer)}>
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
            label={t("create.label.description")}
            name="description"
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
                isLoading={loading2}
                label={t("Equipo")}
                name={field.name}
                options={options}
                value={
                  options.find((option) => option.value === field.value) || null
                }
                onChange={(selectedOption) => {
                  // Verifica si selectedOption es de tipo OptionItem
                  if (selectedOption && "value" in selectedOption) {
                    field.onChange(selectedOption.value);
                  } else {
                    field.onChange(null);
                  }
                }}
              />
            )}
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

export default CreatePlayer;
