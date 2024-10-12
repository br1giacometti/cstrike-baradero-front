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
import { useCreateTournamentService } from "Tournament/data/TournamentRepository";
import useTeamOptions from "Tournament/hooks/useTeamOptions";
import createTournamentSchema, {
  CreateTournamentSchema,
} from "Tournament/schemas/createTournamentSchema";
import MultiSelectMenu from "Player/components/multiselectMenu";

interface CreateTournamentProps {
  navigateToTournament: () => void;
}

const CreateTournament = ({ navigateToTournament }: CreateTournamentProps) => {
  const { t } = useTranslation("tournament");
  const toast = useToast();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTournamentSchema>({
    resolver: zodResolver(createTournamentSchema),
  });
  const [body, setBody] = useState<CreateTournamentSchema | null>(null);

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
      navigateToTournament();
    },
    [navigateToTournament, t, toast]
  );

  const { loading } = useCreateTournamentService(body, onSignUp);

  const handleCreateTournament = (data: CreateTournamentSchema) => {
    console.log("handleCreateTournament called");
    console.log("Tournament Data:", data); // Verificar qué datos se envían
    setBody(data);
  };

  return (
    <FormPageLayout onSubmit={handleSubmit(handleCreateTournament)}>
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

          <FormControl isInvalid={!!errors.teams}>
            <FormLabel htmlFor="teams">
              {t("Selecciona varios equipos")}
            </FormLabel>
            <Controller
              control={control}
              name="teams"
              render={({ field }) => (
                <MultiSelectMenu
                  label={t("Selecciona varios equipos")}
                  options={options.map((option) => option.label)} // Asegúrate de pasar solo los nombres
                  onChange={(selectedValues) => {
                    const selectedIds = selectedValues
                      .map((value) => {
                        const option = options.find(
                          (opt) => opt.label === value
                        );
                        return option ? { id: Number(option.value) } : null; // Asegúrate de crear objetos { id: value }
                      })
                      .filter(Boolean) as { id: number }[]; // Asegúrate de que sea un array de objetos { id: number }

                    // Aquí usamos field.onChange con el array de IDs seleccionados
                    field.onChange(selectedIds);
                  }}
                />
              )}
            />
            <FormErrorMessage>
              {errors.teams &&
                t(`errors.${errors.teams.message}`, { ns: "common" })}
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
        {"Crear Torneo"}
      </Button>
    </FormPageLayout>
  );
};

export default CreateTournament;
