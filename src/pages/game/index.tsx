import { useCallback } from "react";
import { useRouter } from "next/router";

import PageLayout from "Base/layout/PageLayout";
import GameHeader from "Game/features/GameHeader";
import GameList from "Game/features/GameList";
import { Game } from "Game/data/GameRepository";

const GamePage = () => {
  const router = useRouter();

  const navigateToCreateGame = useCallback(
    () => router.push("/game/create"),
    [router]
  );

  return (
    <PageLayout>
      {{
        header: <GameHeader navigateToCreateGame={navigateToCreateGame} />,
        content: <GameList />,
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

export default GamePage;
