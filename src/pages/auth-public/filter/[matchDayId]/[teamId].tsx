import { GetServerSidePropsContext } from "next";
import { Match } from "Match/data/MatchRepository";
import createMatchRepository from "Match/data/MatchRepository/createMatchRepository";
import { Box, Flex } from "@chakra-ui/react";
import MatchDetail from "Landing/features/MatchDetail";
import { NavegationBar } from "Landing/features";

interface MatchDetailProps {
  defaultValues: Match[];
}

const MatchDetailsPage = (props: MatchDetailProps) => (
  <Box bg="gray.900" minH="100vh">
    <NavegationBar />

    <Flex direction="column" minH="100vh" px={4} mt={50}>
      {/* Componente IncomingMatch con ajuste de ancho */}
      <Box maxW="1080px" w="100%" mx="auto" p={4} mt={50}>
        {" "}
        {/* Ajuste para el ancho y padding */}
        <MatchDetail defaultValues={props.defaultValues} />
      </Box>
    </Flex>
  </Box>
);
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const repository = createMatchRepository(); // Sin token

  try {
    const match = await repository.fetchAllMatchsById(
      parseInt(context.query.matchDayId as string, 10),
      parseInt(context.query.teamId as string, 10)
    );
    return { props: { defaultValues: match } };
  } catch (error) {
    console.error("Error fetching match:", error);
    return {
      redirect: { destination: "/auth-public/public", permanent: false },
    };
  }
};

export default MatchDetailsPage;
