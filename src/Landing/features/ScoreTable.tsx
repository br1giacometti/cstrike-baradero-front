// StatsTabs.tsx
import {
  Box,
  Flex,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import TopTeams from "./TopTeam";
import TopPlayers from "./TopPlayers";

const StatsTabs = () => (
  <Box mt={10} p={6} bg="gray.800" borderRadius="md" shadow="lg" w="100%">
    <Flex justify="space-between" align="center" mb={4}>
      <Heading as="h2" size="lg" color="rgb(177, 203, 2)">
        Estadísticas
      </Heading>
    </Flex>
    <Tabs variant="enclosed">
      <TabList>
        <Tab color={"rgb(177, 203, 2)"}>Top Equipos</Tab>
        <Tab color={"rgb(177, 203, 2)"}>Top Jugadores</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <TopTeams />
        </TabPanel>
        <TabPanel>
          <TopPlayers />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Box>
);

export default StatsTabs;
