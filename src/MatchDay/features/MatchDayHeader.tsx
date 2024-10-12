import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

// import { useTranslation } from "Base/i18n";

interface MatchDayHeaderProps {
  navigateToCreateMatchDay: () => void;
}

const MatchDayHeader = ({ navigateToCreateMatchDay }: MatchDayHeaderProps) => {
  const { t } = useTranslation(["matchday", "appLayout"]);

  return (
    <Flex justify="space-between" align="center">
      <Heading>{t("sidebar.menu.matchday", { ns: "appLayout" })}</Heading>
      <Flex gap={4}>
        <Button
          leftIcon={<Icon as={PlusIcon} />}
          variant="outline"
          onClick={navigateToCreateMatchDay}
        >
          Crear Torneo
        </Button>
      </Flex>
    </Flex>
  );
};

export default MatchDayHeader;
