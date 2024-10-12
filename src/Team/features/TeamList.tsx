import { ChangeEvent, useCallback, useMemo, useState } from "react";

import { useTranslation } from "Base/i18n";
import DataTable, { BaseColumn } from "Base/components/DataTable";

import formatDate from "Base/utils/formatters/formatDate";
import { Team, useAllTeamService } from "Team/data/TeamRepository";
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
import useDeletePersonService from "Team/data/TeamRepository/hooks/useDeleteTeamService";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ConfirmDeleteModal from "Team/components/ConfirmDeleteDialog";
import useDeleteTeamService from "Team/data/TeamRepository/hooks/useDeleteTeamService";

type DeleteState = {
  loading: boolean;
  selected: Team | null;
};

interface TeamListProps {
  navigateToEdit: (team: Team) => void;
}
const TeamList = ({ navigateToEdit }: TeamListProps) => {
  const { t } = useTranslation("team");
  const toast = useToast();

  const { error, loading, teamList, refetch } = useAllTeamService();

  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
  const { deleteTeam } = useDeleteTeamService();

  const [deleteState, setDeleteState] = useState<DeleteState>({
    loading: false,
    selected: null,
  });

  const handleDelete = useCallback(
    (team: Team) => {
      setDeleteState({ loading: false, selected: team });
      onOpen();
    },
    [onOpen]
  );

  const onDelete = useCallback(() => {
    setDeleteState((prev) => ({ ...prev, loading: true }));
    if (deleteState.selected?.id) {
      deleteTeam(deleteState.selected?.id)
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
            title: `El Equipo no se pudo eliminar`,
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
  }, [deleteTeam, deleteState.selected, onClose, toast]);

  const columns: BaseColumn<Team>[] = useMemo(
    () => [
      {
        label: t("datatable.label.description"),
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
      <DataTable columns={columns} data={teamList} loading={loading} />
      {deleteState.selected && (
        <ConfirmDeleteModal
          description={deleteState.selected?.name}
          isLoading={deleteState.loading}
          isOpen={isOpen}
          title={t("Eliminar Team", {
            description: deleteState.selected?.name,
          })}
          onClose={onClose}
          onConfirm={onDelete}
        />
      )}
    </>
  );
};

export default TeamList;
