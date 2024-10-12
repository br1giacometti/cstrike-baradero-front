import { useCallback } from "react";
import { useRouter } from "next/router";

import PageLayout from "Base/layout/PageLayout";
import PlayerHeader from "Player/features/PlayerHeader";
import PlayerList from "Player/features/PlayerList";
import { Player } from "Player/data/PlayerRepository";

const PlayerPage = () => {
  const router = useRouter();

  const navigateToCreatePlayer = useCallback(
    () => router.push("/player/create"),
    [router]
  );

  const navigateToEdit = useCallback(
    (player: Player) => {
      router.push(`/player/edit/${player.id}`);
    },
    [router]
  );

  const navigateToEditMultiPlayer = useCallback(
    () => router.push("/player/multi-edit"),
    [router]
  );

  return (
    <PageLayout>
      {{
        header: (
          <PlayerHeader
            navigateToCreatePlayer={navigateToCreatePlayer}
            navigateToEditMultiPlayer={navigateToEditMultiPlayer}
          />
        ),
        content: <PlayerList navigateToEdit={navigateToEdit} />,
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

export default PlayerPage;
