import { GetServerSidePropsContext } from "next";
import { withAuth } from "@kushitech/auth-module";
import { Tournament } from "Tournament/data/TournamentRepository";
import EditTournament from "Tournament/features/EditTournament";
import { User } from "Auth/types";
import createTournamentRepository from "Tournament/data/TournamentRepository/createTournamentRepository";

interface TournamentEditPageProps {
  defaultValues: Tournament;
}

const TournamentEditPage = (props: TournamentEditPageProps) => (
  <EditTournament defaultValues={props.defaultValues} />
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

    const repository = createTournamentRepository(
      context.req.cookies.token as string
    );

    try {
      const tournament = await repository.getTournamentById(
        parseInt(context.query.id as string, 10)
      );
      return {
        props: { defaultValues: tournament },
      };
    } catch (error) {
      console.log("Tournament doesn't exist :>> ", error);
      return {
        redirect: {
          permanent: false,
          destination: "/tournament",
        },
      };
    }
  }
);

export default TournamentEditPage;
