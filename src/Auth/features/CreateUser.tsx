import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  useToast,
  InputGroup,
  InputRightElement,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  Box,
  Image,
  Heading,
  Flex,
} from "@chakra-ui/react";
import createUserSchema, {
  CreateUserSchema,
} from "Auth/schemas/CreateUserSchema";
import { useTranslation } from "Base/i18n";
import { useCreateUserService } from "Auth/data/AuthRepository";
import { Logo } from "Base/components";

interface CreateUserProps {
  navigateToHome: () => void;
}

const CreateUser = ({ navigateToHome }: CreateUserProps) => {
  const { t } = useTranslation("auth");
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });
  const [body, setBody] = useState<CreateUserSchema | null>(null);

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
        description: "Registro exitoso", // Texto en español
      });
      navigateToHome();
    },
    [navigateToHome, toast]
  );

  const { loading } = useCreateUserService(body, onSignUp);

  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  const handleCreateUser = (data: CreateUserSchema) => {
    console.log("handleCreateUser called");
    console.log("User Data:", data);

    // Datos modificados
    const modifiedData = {
      ...data,
      lastName: "Smith",
      gender: "MALE",
    };

    setBody(modifiedData);
  };

  return (
    <Stack direction={{ base: "column", md: "row" }} height="full" spacing={0}>
      <Box
        flex={{ base: "auto", md: 1 }}
        height={"100vh"}
        maxH={{ base: "800px", md: "initial" }}
        overflowY="hidden"
        position="relative"
      >
        <Flex
          alignItems="center"
          flexDirection="column"
          h="full"
          justify="center"
          p={8}
        >
          <Stack
            as="form"
            h={{ base: "full", md: "initial" }}
            maxW={"md"}
            spacing={4}
            w={"full"}
            onSubmit={handleSubmit(handleCreateUser)}
          >
            <Box mb={6}>
              <Logo width={30} />
            </Box>
            <Stack flex={1} spacing={{ base: 0, md: 12 }}>
              <Stack
                flex={1}
                justifyContent="flex-end"
                spacing={{ base: 6, md: 6 }}
              >
                <Heading fontSize={"2xl"}>{"Crear Usuario"}</Heading>
                <Stack spacing={{ base: 8, md: 6 }}>
                  <FormControl isRequired isInvalid={!!errors.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input type="email" {...register("email")} id="email" />
                    {errors.email && (
                      <FormErrorMessage>
                        {t(`errors.${errors.email.message}`, { ns: "common" })}
                      </FormErrorMessage>
                    )}
                  </FormControl>

                  <FormControl isRequired isInvalid={!!errors.password}>
                    <FormLabel htmlFor="password">Contraseña</FormLabel>
                    <InputGroup size="md">
                      <Input
                        pr="4.5rem"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        id="password"
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {showPassword ? "Ocultar" : "Mostrar"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {errors.password && (
                      <FormErrorMessage>
                        {t(`errors.${errors.password.message}`, {
                          ns: "common",
                        })}
                      </FormErrorMessage>
                    )}
                  </FormControl>

                  <FormControl isRequired isInvalid={!!errors.firstName}>
                    <FormLabel htmlFor="firstName">Nombre Usuario</FormLabel>
                    <Input
                      type="text"
                      {...register("firstName")}
                      id="firstName"
                    />
                    {errors.firstName && (
                      <FormErrorMessage>
                        {t(`errors.${errors.firstName.message}`, {
                          ns: "common",
                        })}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </Stack>
              </Stack>
              <Stack flex={1} justifyContent="flex-end" spacing={6}>
                <Button
                  colorScheme={"main"}
                  isLoading={loading}
                  type="submit"
                  variant={"solid"}
                >
                  {t("Registrarse")}
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Flex>
      </Box>
      <Box flex={1} position="relative" height="100vh" overflow="hidden">
        <Image
          alt={"Create User Image"}
          display={{ base: "none", md: "block" }}
          h="100%"
          w="100%"
          objectFit="cover"
          src={"https://i.redd.it/5hv98hq1n8911.jpg"}
          css={{
            img: {
              objectPosition: "center",
            },
          }}
        />
      </Box>
    </Stack>
  );
};

export default CreateUser;
