import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

// import { useTranslation } from "Base/i18n";

interface MatchHeaderProps {
  navigateToCreateMatch: () => void;
}

const MatchHeader = ({ navigateToCreateMatch }: MatchHeaderProps) => {
  const { t } = useTranslation(["match", "appLayout"]);

  return (
    <Flex justify="space-between" align="center">
      <Heading>{t("sidebar.menu.match", { ns: "appLayout" })}</Heading>
      <Flex gap={4}>
        <Button
          leftIcon={<Icon as={PlusIcon} />}
          variant="outline"
          onClick={navigateToCreateMatch}
        >
          Crear Torneo
        </Button>
      </Flex>
    </Flex>
  );
};

export default MatchHeader;
