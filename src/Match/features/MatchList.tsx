import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useTranslation } from "Base/i18n";
import DataTable, { BaseColumn } from "Base/components/DataTable";
import { Match, useAllMatchService } from "Match/data/MatchRepository";
import {
  Box,
  Flex,
  IconButton,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ConfirmDeleteModal from "Match/components/ConfirmDeleteDialog";
import useDeleteMatchService from "Match/data/MatchRepository/hooks/useDeleteMatchService";

type DeleteState = {
  loading: boolean;
  selected: Match | null;
};

interface MatchListProps {
  defaultValues: Match[];
}

const MatchList = ({ defaultValues }: MatchListProps) => {
  const { t } = useTranslation("team");
  const toast = useToast();

  const [deleteState, setDeleteState] = useState<DeleteState>({
    loading: false,
    selected: null,
  });

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { deleteMatch } = useDeleteMatchService();

  const handleDelete = useCallback(
    (match: Match) => {
      setDeleteState({ loading: false, selected: match });
      onOpen();
    },
    [onOpen]
  );

  const onDelete = useCallback(() => {
    setDeleteState((prev) => ({ ...prev, loading: true }));
    if (deleteState.selected?.id) {
      deleteMatch(deleteState.selected?.id)
        .then((deleted) => {
          if (deleted) {
            toast({
              title: `${deleteState.selected?.id} fue eliminado`,
              status: "success",
              isClosable: true,
            });
          }
        })
        .catch(() => {
          toast({
            title: `El partido no se pudo eliminar`,
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
  }, [deleteMatch, deleteState.selected, onClose, toast]);

  const columns: BaseColumn<Match>[] = useMemo(
    () => [
      {
        label: "Equipo A",
        selector: (row) => row.teamA?.name,
      },
      {
        label: "Equipo B",
        selector: (row) => row.teamB?.name,
      },
    ],
    [t]
  );

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between"></Flex>
      <DataTable
        columns={columns}
        data={defaultValues} // Usar defaultValues aquí
        loading={false} // Ya que se pasan los datos como props
      />
    </>
  );
};

export default MatchList;
