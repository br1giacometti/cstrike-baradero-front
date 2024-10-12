import { GetServerSidePropsContext } from "next";
import { withAuth } from "@kushitech/auth-module";
import { Player } from "Player/data/PlayerRepository";
import EditPlayer from "Player/features/EditPlayer";
import { User } from "Auth/types";
import createPlayerRepository from "Player/data/PlayerRepository/createProductRepository";
import { Match } from "Match/data/MatchRepository";
import { MatchList } from "Match/features";
import createMatchRepository from "Match/data/MatchRepository/createMatchRepository";

interface MatchFilterPageProps {
  defaultValues: Match[];
}

const MatchFilterPage = (props: MatchFilterPageProps) => (
  <MatchList defaultValues={props.defaultValues} />
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
      const player = await repository.fetchAllMatchsById(
        parseInt(context.query.matchDayId as string, 10),
        parseInt(context.query.teamId as string, 10) // Cambia esto
      );

      return {
        props: { defaultValues: player },
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

export default MatchFilterPage;
