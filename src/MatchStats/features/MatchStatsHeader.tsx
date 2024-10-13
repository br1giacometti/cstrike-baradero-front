import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

// import { useTranslation } from "Base/i18n";

interface MatchStatsHeaderProps {
  navigateToCreateMatchStats: () => void;
}

const MatchStatsHeader = ({
  navigateToCreateMatchStats,
}: MatchStatsHeaderProps) => {
  const { t } = useTranslation(["matchstats", "appLayout"]);

  return (
    <Flex justify="space-between" align="center">
      <Heading>{t("Resumen", { ns: "appLayout" })}</Heading>
      <Flex gap={4}></Flex>
    </Flex>
  );
};

export default MatchStatsHeader;
