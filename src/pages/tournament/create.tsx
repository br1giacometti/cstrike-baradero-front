import { useCallback } from "react";
import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import PageLayout from "Base/layout/PageLayout";
import CreateTournament from "Tournament/features/CreateTournament";

const TournamentCreatePage = () => {
  const { t } = useTranslation("tournament");
  const router = useRouter();

  const navigateToTournament = useCallback(
    () => router.push("/tournament"),
    [router]
  );
  return (
    <PageLayout>
      {{
        header: <Heading>{"Crear Torneo"}</Heading>,
        content: (
          <CreateTournament navigateToTournament={navigateToTournament} />
        ),
      }}
    </PageLayout>
  );
};

/* export const getServerSideProps = withAuth<User>(async (ctx, user) => {
  if (user.role === "USER") {
    // eslint-disable-next-line no-console
    console.log("You dont have permission on  :>> ", ctx.resolvedUrl);
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }
  return {
    props: {
      user,
    },
  };
}); */

export default TournamentCreatePage;
