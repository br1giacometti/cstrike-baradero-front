// TeamsList.jsx
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  Text,
  SimpleGrid,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { useAllTeamService } from "Team/data/TeamRepository";

// Definición de tipos
interface Player {
  id: number;
  name: string;
  teamId: number; // Incluye el teamId si lo necesitas
}

interface Team {
  id: number;
  name: string;
  players: Player[];
}

const TeamsList: React.FC = () => {
  const { teamList, loading, error } = useAllTeamService(); // Supongo que este hook devuelve un objeto con teams, loading y error

  if (loading) return <Spinner size="xl" />;

  return (
    <Box p={4} bg="gray.800" borderRadius="md" shadow="lg" w="100%">
      <Heading as="h2" size="lg" color="rgb(177, 203, 2)" mb={4}>
        Equipos
      </Heading>
      <SimpleGrid columns={[1, 2]} spacing={4}>
        {teamList.map((team) => (
          <Card
            key={team.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg="gray.700"
            boxShadow="md"
          >
            <CardHeader>
              <Heading size="md" color="rgb(177, 203, 2)">
                {team.name}
              </Heading>
            </CardHeader>
            <CardBody>
              <Stack spacing={2}>
                {team.players.map((player) => (
                  <Text key={player.id} color="white">
                    {player.name}
                  </Text>
                ))}
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default TeamsList;
