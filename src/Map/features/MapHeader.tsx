import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

// import { useTranslation } from "Base/i18n";

interface MapHeaderProps {
  navigateToCreateMap: () => void;
}

const MapHeader = ({ navigateToCreateMap }: MapHeaderProps) => {
  const { t } = useTranslation(["Map", "appLayout"]);

  return (
    <Flex justify="space-between" align="center">
      <Heading>{t("sidebar.menu.Map", { ns: "appLayout" })}</Heading>
      <Flex gap={4}>
        <Button
          leftIcon={<Icon as={PlusIcon} />}
          variant="outline"
          onClick={navigateToCreateMap}
        >
          {"Agregar Mapa"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default MapHeader;
