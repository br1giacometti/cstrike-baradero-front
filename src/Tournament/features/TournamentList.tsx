import { ChangeEvent, useCallback, useMemo, useState } from "react";

import { useTranslation } from "Base/i18n";
import DataTable, { BaseColumn } from "Base/components/DataTable";

import formatDate from "Base/utils/formatters/formatDate";
import {
  Tournament,
  useAllTournamentService,
} from "Tournament/data/TournamentRepository";
import formatPrice from "Base/utils/formatters/formatPrice";

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
import useDeletePersonService from "Tournament/data/TournamentRepository/hooks/useDeleteTournamentService";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ConfirmDeleteModal from "Tournament/components/ConfirmDeleteDialog";
import useDeleteTournamentService from "Tournament/data/TournamentRepository/hooks/useDeleteTournamentService";

type DeleteState = {
  loading: boolean;
  selected: Tournament | null;
};

interface TournamentListProps {
  navigateToEdit: (tournament: Tournament) => void;
}
const TournamentList = ({ navigateToEdit }: TournamentListProps) => {
  const { t } = useTranslation("tournament");
  const toast = useToast();

  const {
    error,
    loading,
    meta,
    tournamentList,
    setQuery,
    currentPage,
    setCurrentPage,
    refetch,
  } = useAllTournamentService();

  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
  const { deleteTournament } = useDeleteTournamentService();

  const [deleteState, setDeleteState] = useState<DeleteState>({
    loading: false,
    selected: null,
  });

  const handleDelete = useCallback(
    (tournament: Tournament) => {
      setDeleteState({ loading: false, selected: tournament });
      onOpen();
    },
    [onOpen]
  );

  const onDelete = useCallback(() => {
    setDeleteState((prev) => ({ ...prev, loading: true }));
    if (deleteState.selected?.id) {
      deleteTournament(deleteState.selected?.id)
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
  }, [deleteTournament, deleteState.selected, onClose, toast]);

  const columns: BaseColumn<Tournament>[] = useMemo(
    () => [
      {
        label: "Nombre",
        selector: (row) => row.name,
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
              placeholder="Busca un  torneo"
              onChange={handleSearchChange}
            />
            <InputRightElement>
              <Icon as={MagnifyingGlassIcon} />
            </InputRightElement>
          </InputGroup>
        </Box>
      </Flex>
      <DataTable columns={columns} data={tournamentList} loading={loading} />
      {deleteState.selected && (
        <ConfirmDeleteModal
          description={deleteState.selected?.name}
          isLoading={deleteState.loading}
          isOpen={isOpen}
          title={t("Eliminar Torneo", {
            description: deleteState.selected?.name,
          })}
          onClose={onClose}
          onConfirm={onDelete}
        />
      )}
    </>
  );
};

export default TournamentList;
