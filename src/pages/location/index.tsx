import { useCallback } from "react";
import { useRouter } from "next/router";

import PageLayout from "Base/layout/PageLayout";
import LocationHeader from "Location/features/LocationHeader";
import LocationList from "Location/features/LocationList";
import { Location } from "Location/data/LocationRepository";

const LocationPage = () => {
  const router = useRouter();

  const navigateToCreateLocation = useCallback(
    () => router.push("/location/create"),
    [router]
  );

  return (
    <PageLayout>
      {{
        header: (
          <LocationHeader navigateToCreateLocation={navigateToCreateLocation} />
        ),
        content: <LocationList />,
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

export default LocationPage;
