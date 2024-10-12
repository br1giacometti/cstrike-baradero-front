import { useCallback } from "react";
import { useRouter } from "next/router";

import PageLayout from "Base/layout/PageLayout";
import TeamHeader from "Team/features/TeamHeader";
import TeamList from "Team/features/TeamList";
import { Team } from "Team/data/TeamRepository";

const TeamPage = () => {
  const router = useRouter();

  const navigateToCreateTeam = useCallback(
    () => router.push("/team/create"),
    [router]
  );

  const navigateToEdit = useCallback(
    (team: Team) => {
      router.push(`/team/edit/${team.id}`);
    },
    [router]
  );

  const navigateToEditMultiTeam = useCallback(
    () => router.push("/team/multi-edit"),
    [router]
  );

  return (
    <PageLayout>
      {{
        header: (
          <TeamHeader
            navigateToCreateTeam={navigateToCreateTeam}
            navigateToEditMultiTeam={navigateToEditMultiTeam}
          />
        ),
        content: <TeamList navigateToEdit={navigateToEdit} />,
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

export default TeamPage;
