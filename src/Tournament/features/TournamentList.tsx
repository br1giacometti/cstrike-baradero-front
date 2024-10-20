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
  navigateToDetail: (tournament: Tournament) => void;
}
const TournamentList = ({
  navigateToEdit,
  navigateToDetail,
}: TournamentListProps) => {
  const { t } = useTranslation("tournament");
  const toast = useToast();

  const { error, loading, tournamentList } = useAllTournamentService();

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
    ],
    [
      deleteState.loading,
      deleteState.selected?.id,
      handleDelete,
      navigateToEdit,
      t,
    ]
  );

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between"></Flex>
      <DataTable
        columns={columns}
        data={tournamentList}
        loading={loading}
        onClickRow={navigateToDetail}
      />
    </>
  );
};

export default TournamentList;
