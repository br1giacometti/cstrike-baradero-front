import { ChangeEvent, useCallback, useMemo, useState, useEffect } from "react";
import { useTranslation } from "Base/i18n";
import DataTable, { BaseColumn } from "Base/components/DataTable";

import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Team } from "Team/data/TeamRepository";
import { Player } from "Player/data/PlayerRepository";

interface TeamDetailsProps {
  defaultValues: Team; // defaultValues debe incluir un array de players
}

const TeamDetails = ({ defaultValues }: TeamDetailsProps) => {
  const { t } = useTranslation("team");
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>(
    defaultValues.players
  ); // Cambiar el tipo a Player[]

  useEffect(() => {
    setFilteredPlayers(
      defaultValues.players.filter((player) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, defaultValues.players]);

  const columns: BaseColumn<Player>[] = useMemo(
    // Cambiar a BaseColumn<Player>[]
    () => [
      {
        label: t("Nombre Jugador"),
        selector: (row) => row.name,
      },
    ],
    [t]
  );

  return (
    <Flex
      as="form"
      justifyContent={{ base: "center", lg: "flex-start" }}
      paddingX={{ lg: 32 }}
    >
      <Box>
        <Heading>{t("Detalles del Equipo")}</Heading>
        <Flex
          flexDirection={{ base: "column" }}
          gap={{ base: 12 }}
          mt={8}
          w={{ base: "auto" }}
        >
          <Stack maxW={"md"} spacing={6} w={"full"}>
            <DataTable columns={columns} data={filteredPlayers} />
          </Stack>
        </Flex>
      </Box>
    </Flex>
  );
};

export default TeamDetails;
