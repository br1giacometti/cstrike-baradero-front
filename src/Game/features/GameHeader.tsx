import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

// import { useTranslation } from "Base/i18n";

interface GameHeaderProps {
  navigateToCreateGame: () => void;
}

const GameHeader = ({ navigateToCreateGame }: GameHeaderProps) => {
  const { t } = useTranslation(["Game", "appLayout"]);

  return (
    <Flex direction="column" justify="center" align="center" p={8}>
      <Button
        leftIcon={<Icon as={PlusIcon} />}
        variant="outline"
        onClick={navigateToCreateGame}
        mb={4} // Margen inferior para separar el botón del título
      >
        {"Jugar !"}
      </Button>
      <Heading>{t("Top 50 jugadores", { ns: "appLayout" })}</Heading>
    </Flex>
  );
};

export default GameHeader;
