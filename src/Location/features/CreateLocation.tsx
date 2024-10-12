import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, useToast } from "@chakra-ui/react";
import { useTranslation } from "Base/i18n";
import createLocationSchema, {
  CreateLocationSchema,
} from "Location/schemas/createLocationSchema";
import FormPageLayout from "Base/layout/FormPageLayout";
import FormContainerLayout from "Base/layout/FormContainerLayout";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import { FormInputText, FormSelect } from "Base/components";
import useCreateLocationService from "Location/data/LocationRepository/hooks/useCreateLocationService";
import FormInputNumber from "Base/components/FormInputNumber";
import useMapOptions from "Location/hooks/useMapOptions";

interface CreateLocationProps {
  navigateToLocation: () => void;
}

const CreateLocation = ({ navigateToLocation }: CreateLocationProps) => {
  const { t } = useTranslation("location");
  const toast = useToast();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLocationSchema>({
    resolver: zodResolver(createLocationSchema),
  });
  const [body, setBody] = useState<CreateLocationSchema | null>(null);

  const { options, loading: loading2 } = useMapOptions();

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
      navigateToLocation();
    },
    [navigateToLocation, t, toast]
  );

  const { loading } = useCreateLocationService(body, onSignUp);

  const handleCreateLocation = (data: CreateLocationSchema) => {
    console.log("handleCreateLocation called");
    console.log("Location Data:", data); // Verificar qué datos se envían
    setBody(data);
  };

  return (
    <FormPageLayout onSubmit={handleSubmit(handleCreateLocation)}>
      <FormContainerLayout>
        <FormSectionLayout>
          <FormInputText
            isRequired
            errorMessage={
              errors.imageUrl
                ? (t(`errors.${errors.imageUrl.message}`, {
                    ns: "common",
                  }) as string)
                : undefined
            }
            inputProps={register("imageUrl")}
            label={"Link Location"}
            name="imageUrl"
          />

          <FormInputNumber
            isRequired
            control={control as any}
            errorMessage={
              errors.coordX
                ? (t(`errors.${errors.coordX.message}`, {
                    ns: "common",
                  }) as string)
                : undefined
            }
            id="coordX"
            label={"coordX"}
            name="coordX"
            type="number"
          />

          <FormInputNumber
            isRequired
            control={control as any}
            errorMessage={
              errors.coordY
                ? (t(`errors.${errors.coordY.message}`, {
                    ns: "common",
                  }) as string)
                : undefined
            }
            id="coordY"
            label={"coordY"}
            name="coordY"
            type="number"
          />

          <Controller
            control={control}
            name="mapId"
            render={({ field }) => (
              <FormSelect
                ref={field.ref}
                errorMessage={
                  errors.mapId?.message
                    ? "Debe seleccionar una categoria"
                    : undefined
                }
                isLoading={loading2}
                label={t("Categoria")}
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

export default CreateLocation;
