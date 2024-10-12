import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useTranslation } from "Base/i18n";
import DataTable, { BaseColumn } from "Base/components/DataTable";
import formatDate from "Base/utils/formatters/formatDate";
import formatPrice from "Base/utils/formatters/formatPrice";
import {
  Box,
  Flex,
  IconButton,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Game } from "Game/data/GameRepository";
import useAllGameService from "Game/data/GameRepository/hooks/useAllGameService";

type DeleteState = {
  loading: boolean;
  selected: Game | null;
};

const GameList = () => {
  const { t } = useTranslation("game");
  const toast = useToast();

  const { error, loading, GameList } = useAllGameService();

  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

  const [deleteState, setDeleteState] = useState<DeleteState>({
    loading: false,
    selected: null,
  });

  const columns: BaseColumn<Game>[] = useMemo(
    () => [
      {
        label: t("Jugador"),
        selector: (row) => row.user?.firstName,
      },
      {
        label: t("Puntos"),
        selector: (row) => row.totalScore,
      },
    ],
    [deleteState.loading, deleteState.selected?.id, t]
  );

  return (
    <Box
      position="relative"
      height="100vh"
      width="100vw"
      bgImage="url('https://i.redd.it/5hv98hq1n8911.jpg')"
      bgSize="cover"
      bgPosition="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="blackAlpha.600" // Fondo negro semitransparente
        borderRadius="md"
        p={8}
        width="80%"
        maxWidth="1200px"
        height="80%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text as="h1" fontSize="4xl" color="white" mb={4}>
          ¿Cuánto conoces el Helbreath?
        </Text>
        <Box width="full" mb={4}>
          <DataTable columns={columns} data={GameList} loading={loading} />
        </Box>
      </Box>
    </Box>
  );
};

export default GameList;
