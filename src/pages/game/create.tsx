import { useCallback } from "react";
import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import PageLayout from "Base/layout/PageLayout";
import CreateGame from "Game/features/CreateGame";

const GameCreatePage = () => {
  const { t } = useTranslation("game");
  const router = useRouter();

  const navigateToCreateGame = useCallback(
    () => router.push("/game/"),
    [router]
  );

  return (
    <PageLayout>
      {{
        header: <Heading>{""}</Heading>,
        content: <CreateGame navigateToCreateGame={navigateToCreateGame} />,
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

export default GameCreatePage;
