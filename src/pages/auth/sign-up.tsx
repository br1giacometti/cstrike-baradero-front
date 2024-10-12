import { useCallback } from "react";
import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import PageLayout from "Base/layout/PageLayout";
import CreateUser from "Auth/features/CreateUser";

const UserCreatePage = () => {
  const { t } = useTranslation("auth");
  const router = useRouter();

  const navigateToHome = useCallback(() => {
    router.replace("/");
  }, [router]);

  return (
    <PageLayout>
      {{
        header: <Heading>{}</Heading>,
        content: <CreateUser navigateToHome={navigateToHome} />,
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

export default UserCreatePage;
