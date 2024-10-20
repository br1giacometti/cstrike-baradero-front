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

  const navigateToDetail = useCallback(
    (tournament: Tournament) => {
      router.push(`/tournament/detail/${tournament.id}`);
    },
    [router]
  );

  return (
    <PageLayout>
      {{
        header: (
          <TournamentHeader
            navigateToCreateTournament={navigateToCreateTournament}
          />
        ),
        content: (
          <TournamentList
            navigateToEdit={navigateToEdit}
            navigateToDetail={navigateToDetail}
          />
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

export default TournamentPage;
