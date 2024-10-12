import { useCallback } from "react";
import { useRouter } from "next/router";

import PageLayout from "Base/layout/PageLayout";
import MapHeader from "Map/features/MapHeader";
import MapList from "Map/features/MapList";
import { Map } from "Map/data/MapRepository";

const MapPage = () => {
  const router = useRouter();

  const navigateToCreateMap = useCallback(
    () => router.push("/map/create"),
    [router]
  );

  const navigateToEdit = useCallback(
    (product: Map) => {
      router.push(`/map/edit/${product.id}`);
    },
    [router]
  );

  return (
    <PageLayout>
      {{
        header: <MapHeader navigateToCreateMap={navigateToCreateMap} />,
        content: <MapList navigateToEdit={navigateToEdit} />,
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

export default MapPage;
