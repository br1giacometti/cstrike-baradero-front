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
import ConfirmDeleteModal from "Location/components/ConfirmDeleteDialog";
import { Location } from "Location/data/LocationRepository";
import useAllLocationService from "Location/data/LocationRepository/hooks/useAllLocationService";

type DeleteState = {
  loading: boolean;
  selected: Location | null;
};

const LocationList = () => {
  const { t } = useTranslation("location");
  const toast = useToast();

  const { error, loading, LocationList } = useAllLocationService();

  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

  const [deleteState, setDeleteState] = useState<DeleteState>({
    loading: false,
    selected: null,
  });

  const columns: BaseColumn<Location>[] = useMemo(
    () => [
      {
        label: t("datatable.label.description"),
        selector: (row) => row.mapId,
      },
      {
        label: t("datatable.label.description"),
        selector: (row) => row.coordX,
      },
      {
        label: t("datatable.label.description"),
        selector: (row) => row.coordY,
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
      <DataTable columns={columns} data={LocationList} loading={loading} />
    </>
  );
};

export default LocationList;
