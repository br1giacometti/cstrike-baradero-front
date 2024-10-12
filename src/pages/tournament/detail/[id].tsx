import { GetServerSidePropsContext } from "next";
import { withAuth } from "@kushitech/auth-module";
import { Tournament } from "Tournament/data/TournamentRepository";
import { User } from "Auth/types";
import createTournamentRepository from "Tournament/data/TournamentRepository/createTournamentRepository";
import DetailTournament from "Tournament/features/DetailTournament";
import { Router, useRouter } from "next/router";
import { useCallback } from "react";

interface TournamentEditPageProps {
  defaultValues: Tournament;
}

const TournamentEditPage = (props: TournamentEditPageProps) => {
  const router = useRouter();
  const tournamentId = props.defaultValues.id;

  const navigateToMatchDay = useCallback(() => {
    // Navega a la página de creación de MatchDay, pasando el ID del torneo como parte de la URL
    router.push(`/matchday/create/${tournamentId}`); // Esto redirige a /matchday/create/[id]
  }, [router, tournamentId]);

  return (
    <DetailTournament
      defaultValues={props.defaultValues}
      navigateToMatchDay={navigateToMatchDay}
    />
  );
};

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
