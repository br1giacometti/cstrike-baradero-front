import { ChangeEvent, useCallback, useMemo, useState } from "react";

import { useTranslation } from "Base/i18n";
import DataTable, { BaseColumn } from "Base/components/DataTable";

import formatDate from "Base/utils/formatters/formatDate";

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

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ConfirmDeleteModal from "Map/components/ConfirmDeleteDialog";
import { Map } from "Map/data/MapRepository";
import useAllMapService from "Map/data/MapRepository/hooks/useAllMapService";

type DeleteState = {
  loading: boolean;
  selected: Map | null;
};

interface MapListProps {
  navigateToEdit: (map: Map) => void;
}

const MapList = ({ navigateToEdit }: MapListProps) => {
  const { t } = useTranslation("map");
  const toast = useToast();

  const { error, loading, MapList } = useAllMapService();

  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

  const [deleteState, setDeleteState] = useState<DeleteState>({
    loading: false,
    selected: null,
  });

  const columns: BaseColumn<Map>[] = useMemo(
    () => [
      {
        label: t("Nombre"),
        selector: (row) => row.name,
      },
      {
        label: t("sizeX"),
        selector: (row) => row.sizeX,
      },
      {
        label: t("sizeY"),
        selector: (row) => row.sizeY,
      },
      {
        label: t("Ubicacion"),
        selector: (row) => row.ubication,
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
            </Flex>
          </>
        ),
      },
    ],
    [deleteState.loading, deleteState.selected?.id, t]
  );

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <InputGroup>
            <InputRightElement>
              <Icon as={MagnifyingGlassIcon} />
            </InputRightElement>
          </InputGroup>
        </Box>
      </Flex>
      <DataTable columns={columns} data={MapList} loading={loading} />
    </>
  );
};

export default MapList;
