import { useCallback } from "react";
import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import PageLayout from "Base/layout/PageLayout";
import CreatePlayer from "Player/features/CreatePlayer";

const PlayerCreatePage = () => {
  const { t } = useTranslation("player");
  const router = useRouter();

  const navigateToPlayer = useCallback(() => router.push("/player"), [router]);
  return (
    <PageLayout>
      {{
        header: <Heading>{t("create.title")}</Heading>,
        content: <CreatePlayer navigateToPlayer={navigateToPlayer} />,
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

export default PlayerCreatePage;
