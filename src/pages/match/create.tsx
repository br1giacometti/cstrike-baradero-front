import { useCallback } from "react";
import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import PageLayout from "Base/layout/PageLayout";
import CreateTournament from "Tournament/features/CreateTournament";
import { CreateMatch } from "Match/features";

const MatchCreatePage = () => {
  const { t } = useTranslation("tournament");
  const router = useRouter();

  // Obtén los parámetros de consulta
  const { tournamentId, teamAId, teamBId, matchDayId } = router.query;

  const navigateToMatch = useCallback(() => router.push("/match"), [router]);

  return (
    <PageLayout>
      {{
        header: <Heading>{"Crear Partido"}</Heading>,
        content: (
          <CreateMatch
            navigateToMatch={navigateToMatch}
            teamAId={Number(teamAId)}
            tournamentId={Number(tournamentId)}
            teamBId={Number(teamBId)}
            matchDayId={Number(matchDayId)}
          />
        ),
      }}
    </PageLayout>
  );
};

export default MatchCreatePage;
