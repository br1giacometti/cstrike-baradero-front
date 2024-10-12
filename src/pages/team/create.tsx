import { useCallback } from "react";
import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import PageLayout from "Base/layout/PageLayout";
import CreateTeam from "Team/features/CreateTeam";

const TeamCreatePage = () => {
  const { t } = useTranslation("team");
  const router = useRouter();

  const navigateToTeam = useCallback(() => router.push("/team"), [router]);
  return (
    <PageLayout>
      {{
        header: <Heading>{"Crear Equipo"}</Heading>,
        content: <CreateTeam navigateToTeam={navigateToTeam} />,
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

export default TeamCreatePage;
