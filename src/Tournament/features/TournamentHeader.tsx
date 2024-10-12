import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

// import { useTranslation } from "Base/i18n";

interface TournamentHeaderProps {
  navigateToCreateTournament: () => void;
  navigateToEditMultiTournament: () => void;
}

const TournamentHeader = ({
  navigateToCreateTournament,
  navigateToEditMultiTournament,
}: TournamentHeaderProps) => {
  const { t } = useTranslation(["tournament", "appLayout"]);

  return (
    <Flex justify="space-between" align="center">
      <Heading>{t("sidebar.menu.tournament", { ns: "appLayout" })}</Heading>
      <Flex gap={4}>
        <Button
          leftIcon={<Icon as={PlusIcon} />}
          variant="outline"
          onClick={navigateToCreateTournament}
        >
          Crear Torneo
        </Button>
      </Flex>
    </Flex>
  );
};

export default TournamentHeader;
