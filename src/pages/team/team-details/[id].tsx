import { GetServerSidePropsContext } from "next";
import { withAuth } from "@kushitech/auth-module";
import { Team } from "Team/data/TeamRepository";

import { User } from "Auth/types";
import createTeamRepository from "Team/data/TeamRepository/createTeamRepository";
import TeamDetails from "Team/features/TeamDetails";

interface TeamDetailsPageProps {
  defaultValues: Team;
}

const TeamDetailsPage = (props: TeamDetailsPageProps) => (
  <TeamDetails defaultValues={props.defaultValues} />
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

    const repository = createTeamRepository(
      context.req.cookies.token as string
    );

    try {
      const team = await repository.getTeamById(
        parseInt(context.query.id as string, 10)
      );
      return {
        props: { defaultValues: team },
      };
    } catch (error) {
      console.log("Team doesn't exist :>> ", error);
      return {
        redirect: {
          permanent: false,
          destination: "/team",
        },
      };
    }
  }
);

export default TeamDetailsPage;
