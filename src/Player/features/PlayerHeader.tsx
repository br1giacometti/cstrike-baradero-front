import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

// import { useTranslation } from "Base/i18n";

interface PlayerHeaderProps {
  navigateToCreatePlayer: () => void;
  navigateToEditMultiPlayer: () => void;
}

const PlayerHeader = ({
  navigateToCreatePlayer,
  navigateToEditMultiPlayer,
}: PlayerHeaderProps) => {
  const { t } = useTranslation(["player", "appLayout"]);

  return (
    <Flex justify="space-between" align="center">
      <Heading>{t("sidebar.menu.player", { ns: "appLayout" })}</Heading>
      <Flex gap={4}>
        <Button
          leftIcon={<Icon as={PlusIcon} />}
          variant="outline"
          onClick={navigateToCreatePlayer}
        >
          Crear Jugador
        </Button>
      </Flex>
    </Flex>
  );
};

export default PlayerHeader;
