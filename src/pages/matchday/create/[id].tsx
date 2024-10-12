import { GetServerSidePropsContext } from "next";
import { withAuth } from "@kushitech/auth-module";
import { User } from "Auth/types";
import createTournamentRepository from "Tournament/data/TournamentRepository/createTournamentRepository";
import { CreateMatchDay } from "MatchDay/features"; // Asegúrate de que la ruta sea correcta
import { Tournament } from "Tournament/data/TournamentRepository";

interface MatchDayEditPageProps {
  defaultValues: Tournament;
}

const MatchDayCreatePage = ({ defaultValues }: MatchDayEditPageProps) => {
  return <CreateMatchDay defaultValues={defaultValues} />;
};

// Aquí es donde capturas el tournamentId desde la URL
export const getServerSideProps = withAuth<User>(
  async (context: GetServerSidePropsContext, user) => {
    if (user.role === "USER") {
      console.log("You don't have permission on: ", context.resolvedUrl);
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

    // Captura el tournamentId desde la URL
    const tournamentId = context.query.id as string; // Asegúrate de que este ID sea el correcto

    try {
      const tournament = await repository.getTournamentById(
        parseInt(tournamentId, 10)
      );
      return {
        props: {
          defaultValues: tournament,
        },
      };
    } catch (error) {
      console.log("Tournament doesn't exist: ", error);
      return {
        redirect: {
          permanent: false,
          destination: "/tournament", // Cambia a la ruta correcta
        },
      };
    }
  }
);

export default MatchDayCreatePage;
