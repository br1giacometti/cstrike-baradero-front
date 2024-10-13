import { GetServerSidePropsContext } from "next";
import { withAuth } from "@kushitech/auth-module";
import { Player } from "Player/data/PlayerRepository";
import EditPlayer from "Player/features/EditPlayer";
import { User } from "Auth/types";
import createPlayerRepository from "Player/data/PlayerRepository/createProductRepository";
import EditMatch from "Match/features/EditMatch";
import { Match } from "Match/data/MatchRepository";
import createMatch from "Match/data/MatchRepository/services/createMatch";
import createMatchRepository from "Match/data/MatchRepository/createMatchRepository";

interface PlayerEditPageProps {
  defaultValues: Match;
}

const MatchEditPage = (props: PlayerEditPageProps) => (
  <EditMatch defaultValues={props.defaultValues} />
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

    const repository = createMatchRepository(
      context.req.cookies.token as string
    );

    try {
      const match = await repository.getMatchById(
        parseInt(context.query.id as string, 10)
      );
      return {
        props: { defaultValues: match },
      };
    } catch (error) {
      console.log("Player doesn't exist :>> ", error);
      return {
        redirect: {
          permanent: false,
          destination: "/match",
        },
      };
    }
  }
);

export default MatchEditPage;
