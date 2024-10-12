import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

import { useTranslation } from "Base/i18n";
import { Map } from "Map/data/MapRepository";
import updateMapSchema, { UpdateMapSchema } from "Map/schemas/updateMapSchema";
import useUpdateMapStates from "Map/hooks/useUpdateMapStates";
import useUpdateMapService from "Map/data/MapRepository/hooks/useUpdateMapService";
import { FormInputText } from "Base/components";

interface EditMapProps {
  defaultValues: Map;
}

const EditMap = ({ defaultValues }: EditMapProps) => {
  const router = useRouter();
  const toast = useToast();
  const { t } = useTranslation("map");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateMapSchema>({
    resolver: zodResolver(updateMapSchema),
    defaultValues: {
      imageUrl: defaultValues.imageUrl,
      sizeX: defaultValues.sizeX,
      sizeY: defaultValues.sizeY,
      ubication: defaultValues.ubication,
    },
  });

  const { error, successFetch, failureFetch } = useUpdateMapStates();

  const { updateMap } = useUpdateMapService();

  const handleUpdateMap = (data: UpdateMapSchema) =>
    updateMap(data, defaultValues.id)
      .then((mapUpdated) => {
        reset();
        successFetch(mapUpdated);
        toast({
          status: "success",
          description: `${mapUpdated.name}  se actualizo`,
        });
        router.push("/map");
      })
      .catch((axiosError) => {
        failureFetch(axiosError.response.data.message);
      });

  useEffect(() => {
    if (error) {
      toast({ status: "error", description: error });
    }
  }, [error, toast]);

  return (
    <Flex
      as="form"
      justifyContent={{ base: "center", lg: "flex-start" }}
      paddingBottom={16}
      paddingX={{ lg: 32 }}
      onSubmit={handleSubmit(handleUpdateMap)}
    >
      <Box>
        <Heading>{t("Actualizar Mapo")}</Heading>
        <Flex
          flexDirection={{ base: "column" }}
          gap={{ base: 12 }}
          mt={8}
          w={{ base: "auto" }}
        >
          <Stack maxW={"md"} spacing={6} w={"full"}>
            <FormInputText
              isRequired
              errorMessage={
                errors.imageUrl
                  ? (t(`update.error.${errors.imageUrl.message}`) as string) // TODO: Deberia eleminar este casteo: `as string`
                  : undefined
              }
              inputProps={register("imageUrl")}
              label={t("imageUrl")}
              name="imageUrl"
            />

            <FormInputText
              errorMessage={
                errors.sizeX
                  ? (t(`update.error.${errors.sizeX.message}`) as string) // TODO: Deberia eleminar este casteo: `as string`
                  : undefined
              }
              inputProps={register("sizeX")}
              label={t("sizeX")}
              name="sizeX"
            />

            <FormInputText
              errorMessage={
                errors.sizeY
                  ? (t(`update.error.${errors.sizeY.message}`) as string) // TODO: Deberia eleminar este casteo: `as string`
                  : undefined
              }
              inputProps={register("sizeY")}
              label={t("sizeY")}
              name="sizeY"
            />

            <FormInputText
              errorMessage={
                errors.ubication
                  ? (t(`update.error.${errors.ubication.message}`) as string) // TODO: Deberia eleminar este casteo: `as string`
                  : undefined
              }
              inputProps={register("ubication")}
              label={t("ubication")}
              name="ubication"
            />
          </Stack>

          <Button
            bg="main.500"
            color="white"
            isLoading={isSubmitting}
            type="submit"
          >
            {t("Actualizar")}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default EditMap;
