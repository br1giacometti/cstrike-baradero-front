import { ChangeEvent, useCallback, useMemo, useState } from "react";

import { useTranslation } from "Base/i18n";
import DataTable, { BaseColumn } from "Base/components/DataTable";

import formatDate from "Base/utils/formatters/formatDate";
import {
  MatchDay,
  useAllMatchDayService,
} from "MatchDay/data/MatchDayRepository";
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
import useDeletePersonService from "MatchDay/data/MatchDayRepository/hooks/useDeleteMatchDayService";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ConfirmDeleteModal from "MatchDay/components/ConfirmDeleteDialog";
import useDeleteMatchDayService from "MatchDay/data/MatchDayRepository/hooks/useDeleteMatchDayService";

type DeleteState = {
  loading: boolean;
  selected: MatchDay | null;
};

interface MatchDayListProps {
  navigateToEdit: (matchday: MatchDay) => void;
  navigateToDetail: (matchday: MatchDay) => void;
}
const MatchDayList = ({
  navigateToEdit,
  navigateToDetail,
}: MatchDayListProps) => {
  const { t } = useTranslation("team");
  const toast = useToast();

  const {
    error,
    loading,

    matchdayList,
  } = useAllMatchDayService();

  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
  const { deleteMatchDay } = useDeleteMatchDayService();

  const [deleteState, setDeleteState] = useState<DeleteState>({
    loading: false,
    selected: null,
  });

  const handleDelete = useCallback(
    (matchday: MatchDay) => {
      setDeleteState({ loading: false, selected: matchday });
      onOpen();
    },
    [onOpen]
  );

  const onDelete = useCallback(() => {
    setDeleteState((prev) => ({ ...prev, loading: true }));
    if (deleteState.selected?.id) {
      deleteMatchDay(deleteState.selected?.id)
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
  }, [deleteMatchDay, deleteState.selected, onClose, toast]);

  const columns: BaseColumn<MatchDay>[] = useMemo(
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

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between"></Flex>
      <DataTable
        columns={columns}
        data={matchdayList}
        loading={loading}
        onClickRow={navigateToDetail}
      />
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

export default MatchDayList;
