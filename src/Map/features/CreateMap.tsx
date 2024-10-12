import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, useToast } from "@chakra-ui/react";
import { useTranslation } from "Base/i18n";
import createMapSchema, { CreateMapSchema } from "Map/schemas/createMapSchema";
import FormPageLayout from "Base/layout/FormPageLayout";
import FormContainerLayout from "Base/layout/FormContainerLayout";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import { FormInputText } from "Base/components";
import useCreateMapService from "Map/data/MapRepository/hooks/useCreateMapService";
import FormInputNumber from "Base/components/FormInputNumber";

interface CreateMapProps {
  navigateToMap: () => void;
}

const CreateMap = ({ navigateToMap }: CreateMapProps) => {
  const { t } = useTranslation("map");
  const toast = useToast();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMapSchema>({
    resolver: zodResolver(createMapSchema),
  });
  const [body, setBody] = useState<CreateMapSchema | null>(null);

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
      navigateToMap();
    },
    [navigateToMap, t, toast]
  );

  const { loading } = useCreateMapService(body, onSignUp);

  const handleCreateMap = (data: CreateMapSchema) => {
    console.log("handleCreateMap called");
    console.log("Map Data:", data); // Verificar qué datos se envían
    setBody(data);
  };

  return (
    <FormPageLayout onSubmit={handleSubmit(handleCreateMap)}>
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
            label={"Nombre"}
            name="name"
          />

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
            label={"Link Img"}
            name="imageUrl"
          />

          <FormInputNumber
            isRequired
            control={control as any}
            errorMessage={
              errors.sizeX
                ? (t(`errors.${errors.sizeX.message}`, {
                    ns: "common",
                  }) as string)
                : undefined
            }
            id="sizeX"
            label={"sizeX"}
            name="sizeX"
            type="number"
          />

          <FormInputNumber
            isRequired
            control={control as any}
            errorMessage={
              errors.sizeY
                ? (t(`errors.${errors.sizeY.message}`, {
                    ns: "common",
                  }) as string)
                : undefined
            }
            id="sizeY"
            label={"sizeY"}
            name="sizeY"
            type="number"
          />
          <FormInputNumber
            isRequired
            control={control as any}
            errorMessage={
              errors.ubication
                ? (t(`errors.${errors.ubication.message}`, {
                    ns: "common",
                  }) as string)
                : undefined
            }
            id="ubication"
            label={"ubication"}
            name="ubication"
            type="number"
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

export default CreateMap;
