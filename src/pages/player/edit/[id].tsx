import { GetServerSidePropsContext } from "next";
import { withAuth } from "@kushitech/auth-module";
import { Player } from "Player/data/PlayerRepository";
import EditPlayer from "Player/features/EditPlayer";
import { User } from "Auth/types";
import createPlayerRepository from "Player/data/PlayerRepository/createProductRepository";

interface PlayerEditPageProps {
  defaultValues: Player;
}

const PlayerEditPage = (props: PlayerEditPageProps) => (
  <EditPlayer defaultValues={props.defaultValues} />
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

    const repository = createPlayerRepository(
      context.req.cookies.token as string
    );

    try {
      const player = await repository.getPlayerById(
        parseInt(context.query.id as string, 10)
      );
      return {
        props: { defaultValues: player },
      };
    } catch (error) {
      console.log("Player doesn't exist :>> ", error);
      return {
        redirect: {
          permanent: false,
          destination: "/player",
        },
      };
    }
  }
);

export default PlayerEditPage;
