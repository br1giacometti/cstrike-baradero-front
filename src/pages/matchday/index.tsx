import { useCallback } from "react";
import { useRouter } from "next/router";

import PageLayout from "Base/layout/PageLayout";
import MatchDayHeader from "MatchDay/features/MatchDayHeader";
import MatchDayList from "MatchDay/features/MatchDayList";
import { MatchDay } from "MatchDay/data/MatchDayRepository";

const MatchDayPage = () => {
  const router = useRouter();

  const navigateToCreateMatchDay = useCallback(
    () => router.push("/matchday/create"),
    [router]
  );

  const navigateToEdit = useCallback(
    (matchday: MatchDay) => {
      router.push(`/matchday/edit/${matchday.id}`);
    },
    [router]
  );

  const navigateToDetail = useCallback(
    (matchday: MatchDay) => {
      router.push(`/matchday/detail/${matchday.id}`);
    },
    [router]
  );

  return (
    <PageLayout>
      {{
        header: (
          <MatchDayHeader navigateToCreateMatchDay={navigateToCreateMatchDay} />
        ),
        content: (
          <MatchDayList
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

export default MatchDayPage;
