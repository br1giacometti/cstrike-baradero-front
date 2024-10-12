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
      <Heading>{t("Resumen", { ns: "appLayout" })}</Heading>
      <Flex gap={4}></Flex>
    </Flex>
  );
};

export default MatchHeader;
