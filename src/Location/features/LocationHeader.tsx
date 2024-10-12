import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

// import { useTranslation } from "Base/i18n";

interface LocationHeaderProps {
  navigateToCreateLocation: () => void;
}

const LocationHeader = ({ navigateToCreateLocation }: LocationHeaderProps) => {
  const { t } = useTranslation(["Location", "appLayout"]);

  return (
    <Flex justify="space-between" align="center">
      <Heading>{t("sidebar.menu.Location", { ns: "appLayout" })}</Heading>
      <Flex gap={4}>
        <Button
          leftIcon={<Icon as={PlusIcon} />}
          variant="outline"
          onClick={navigateToCreateLocation}
        >
          {"Agregar Locationa"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default LocationHeader;
