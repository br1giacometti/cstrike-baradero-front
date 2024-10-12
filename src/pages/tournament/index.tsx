import { useCallback } from "react";
import { useRouter } from "next/router";

import PageLayout from "Base/layout/PageLayout";
import TournamentHeader from "Tournament/features/TournamentHeader";
import TournamentList from "Tournament/features/TournamentList";
import { Tournament } from "Tournament/data/TournamentRepository";

const TournamentPage = () => {
  const router = useRouter();

  const navigateToCreateTournament = useCallback(
    () => router.push("/tournament/create"),
    [router]
  );

  const navigateToEdit = useCallback(
    (tournament: Tournament) => {
      router.push(`/tournament/edit/${tournament.id}`);
    },
    [router]
  );

  const navigateToEditMultiTournament = useCallback(
    () => router.push("/tournament/multi-edit"),
    [router]
  );

  return (
    <PageLayout>
      {{
        header: (
          <TournamentHeader
            navigateToCreateTournament={navigateToCreateTournament}
            navigateToEditMultiTournament={navigateToEditMultiTournament}
          />
        ),
        content: <TournamentList navigateToEdit={navigateToEdit} />,
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

export default TournamentPage;
