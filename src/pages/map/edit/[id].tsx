import { GetServerSidePropsContext } from "next";
import { withAuth } from "@kushitech/auth-module";
import { Map } from "Map/data/MapRepository";
import { User } from "Auth/types";
import createMapRepository from "Map/data/MapRepository/createMapRepository";
import EditMap from "Map/features/EditMap";

interface MapEditPageProps {
  defaultValues: Map;
}

const MapEditPage = (props: MapEditPageProps) => (
  <EditMap defaultValues={props.defaultValues} />
);

export const getServerSideProps = withAuth<User>(
  async (context: GetServerSidePropsContext, user) => {
    if (user.role === "USER") {
      console.log("You dont have permission on  :>> ", context.resolvedUrl);
      return {
        redirect: {
          permanent: false,
          destination: `/`,
        },
      };
    }

    const repository = createMapRepository(context.req.cookies.token as string);

    try {
      const map = await repository.getMapById(
        parseInt(context.query.id as string, 10)
      );
      return {
        props: { defaultValues: map },
      };
    } catch (error) {
      console.log("Map doesn't exist :>> ", error);
      return {
        redirect: {
          permanent: false,
          destination: "/map",
        },
      };
    }
  }
);

export default MapEditPage;
