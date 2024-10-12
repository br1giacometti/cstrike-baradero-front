import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

// import { useTranslation } from "Base/i18n";

interface TeamHeaderProps {
  navigateToCreateTeam: () => void;
}

const TeamHeader = ({ navigateToCreateTeam }: TeamHeaderProps) => {
  const { t } = useTranslation(["team", "appLayout"]);

  return (
    <Flex justify="space-between" align="center">
      <Heading>{t("sidebar.menu.team", { ns: "appLayout" })}</Heading>
      <Flex gap={4}>
        <Button
          leftIcon={<Icon as={PlusIcon} />}
          variant="outline"
          onClick={navigateToCreateTeam}
        >
          {"Agregar Equipo"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default TeamHeader;
