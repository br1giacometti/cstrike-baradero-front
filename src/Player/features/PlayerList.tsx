import { ChangeEvent, useCallback, useMemo, useState } from "react";

import { useTranslation } from "Base/i18n";
import DataTable, { BaseColumn } from "Base/components/DataTable";

import formatDate from "Base/utils/formatters/formatDate";
import { Player, useAllPlayerService } from "Player/data/PlayerRepository";
import formatPrice from "Base/utils/formatters/formatPrice";
import useAllPlayerPaginated from "Player/data/PlayerRepository/hooks/useAllPlayerPaginated";
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import useDeletePersonService from "Player/data/PlayerRepository/hooks/useDeletePlayerService";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ConfirmDeleteModal from "Player/components/ConfirmDeleteDialog";
import useDeletePlayerService from "Player/data/PlayerRepository/hooks/useDeletePlayerService";

type DeleteState = {
  loading: boolean;
  selected: Player | null;
};

interface PlayerListProps {
  navigateToEdit: (player: Player) => void;
}
const PlayerList = ({ navigateToEdit }: PlayerListProps) => {
  const { t } = useTranslation("player");
  const toast = useToast();

  const {
    error,
    loading,
    meta,
    playerList,
    setQuery,
    currentPage,
    setCurrentPage,
    refetch,
  } = useAllPlayerPaginated();

  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
  const { deletePlayer } = useDeletePlayerService();

  const [deleteState, setDeleteState] = useState<DeleteState>({
    loading: false,
    selected: null,
  });

  const handleDelete = useCallback(
    (player: Player) => {
      setDeleteState({ loading: false, selected: player });
      onOpen();
    },
    [onOpen]
  );

  const onDelete = useCallback(() => {
    setDeleteState((prev) => ({ ...prev, loading: true }));
    if (deleteState.selected?.id) {
      deletePlayer(deleteState.selected?.id)
        .then((deleted) => {
          if (deleted) {
            toast({
              title: `${deleteState.selected?.name} fue eliminado`,
              status: "success",
              isClosable: true,
            });
          }
        })
        .catch(() => {
          toast({
            title: `El Jugador no se pudo eliminar`,
            status: "error",
            isClosable: true,
          });
        })
        .finally(() => {
          setDeleteState({
            loading: false,
            selected: null,
          });
          onClose();
        });
    }
  }, [deletePlayer, deleteState.selected, onClose, toast]);

  const columns: BaseColumn<Player>[] = useMemo(
    () => [
      {
        label: "Nombre",
        selector: (row) => row.name,
      },

      {
        label: "Equipo",
        selector: (row) => row.team.name,
      },
      {
        label: t("Acciones"),
        selector: (row) => (
          <>
            <Flex gap={2}>
              <Tooltip label={t("Editar")} placement="bottom">
                <IconButton
                  aria-label="Edit icon"
                  colorScheme="gray"
                  icon={<EditIcon />}
                  isDisabled={
                    deleteState.loading && row.id !== deleteState.selected?.id
                  }
                  isLoading={
                    deleteState.loading && row.id === deleteState.selected?.id
                  }
                  size="sm"
                  variant="outline"
                  onClick={() => navigateToEdit(row)}
                />
              </Tooltip>
              <Tooltip label={t("Eliminar")} placement="bottom">
                <IconButton
                  aria-label="Delete icon"
                  colorScheme="red"
                  icon={<DeleteIcon />}
                  isDisabled={
                    deleteState.loading && row.id !== deleteState.selected?.id
                  }
                  isLoading={
                    deleteState.loading && row.id === deleteState.selected?.id
                  }
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(row)}
                />
              </Tooltip>
            </Flex>
          </>
        ),
      },
    ],
    [
      deleteState.loading,
      deleteState.selected?.id,
      handleDelete,
      navigateToEdit,
      t,
    ]
  );

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setQuery(searchValue);
  }, []);

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <InputGroup>
            <Input
              placeholder="Busca un jugador"
              onChange={handleSearchChange}
            />
            <InputRightElement>
              <Icon as={MagnifyingGlassIcon} />
            </InputRightElement>
          </InputGroup>
        </Box>
      </Flex>
      <DataTable columns={columns} data={playerList} loading={loading} />
      {deleteState.selected && (
        <ConfirmDeleteModal
          description={deleteState.selected?.name}
          isLoading={deleteState.loading}
          isOpen={isOpen}
          title={t("Eliminar Jugador", {
            description: deleteState.selected?.name,
          })}
          onClose={onClose}
          onConfirm={onDelete}
        />
      )}
    </>
  );
};

export default PlayerList;
