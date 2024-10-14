import { useMemo } from "react";
import { useTranslation } from "Base/i18n";
import DataTable, { BaseColumn } from "Base/components/DataTable";
import {
  Flex,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from "@chakra-ui/react";
import useAllScoreService from "Tournament/data/TournamentRepository/hooks/useAllScoreService";
import useAllMatchStatsService from "MatchStats/data/MatchStatsRepository/hooks/useAllMatchStatsService";
import { MatchStats } from "MatchStats/data/MatchStatsRepository";

// --- Interfaces ---
interface Team {
  idEquipo: number;
  nombreEquipo: string;
  victoriasTotales: number;
  derrotasTotales: number;
  puntuacionTotal: number;
}

interface PlayerStats {
  id: number;
  nombreJugador: string;
  equipo: string;
  kills: number;
  deaths: number;
}

// --- Componentes ---
const ScoreTable = () => {
  const { t } = useTranslation("team");
  const {
    scoreList,
    loading: loadingScore,
    error: errorScore,
  } = useAllScoreService();

  const columns: BaseColumn<Team>[] = useMemo(
    () => [
      { label: t("Equipo"), selector: (row) => row.nombreEquipo },
      { label: t("Victorias"), selector: (row) => row.victoriasTotales },
      { label: t("Perdidas"), selector: (row) => row.derrotasTotales },
      { label: t("Puntos"), selector: (row) => row.puntuacionTotal },
    ],
    [t]
  );

  if (errorScore) {
    return (
      <Box color="red.500" textAlign="center">
        Error al cargar los equipos.
      </Box>
    );
  }

  return (
    <TableContent data={scoreList} columns={columns} loading={loadingScore} />
  );
};

const TopPlayersTable = () => {
  const { matchstatsList, loading, error } = useAllMatchStatsService();
  const columns: BaseColumn<MatchStats>[] = useMemo(
    () => [
      { label: "Jugador", selector: (row) => row.player?.name || "N/A" },
      {
        label: "Equipo",
        selector: (row) => row.team?.name || "Sin equipo",
      },
      { label: "Kills", selector: (row) => row.kills },
      { label: "Muertes", selector: (row) => row.deaths },
    ],
    []
  );

  return (
    <TableContent data={matchstatsList} columns={columns} loading={loading} />
  );
};

const TableContent = <T,>({
  data,
  columns,
  loading,
}: {
  data: T[];
  columns: BaseColumn<T>[];
  loading: boolean;
}) => (
  <Box bg="gray.800" borderRadius="md" boxShadow="lg" p={4}>
    <Table variant="simple" colorScheme="whiteAlpha">
      <Thead>
        <Tr>
          {columns.map((column) => (
            <Th key={column.label} color="white" bg="gray.500">
              {column.label}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {loading ? (
          <Tr>
            <Td colSpan={columns.length} textAlign="center" color="gray.400">
              Cargando...
            </Td>
          </Tr>
        ) : (
          data.map((row, index) => (
            <Tr key={index} bg={index % 2 === 0 ? "gray.700" : "gray.800"}>
              {columns.map((column, colIndex) => (
                <Td key={colIndex} color="white">
                  {column.selector(row)}
                </Td>
              ))}
            </Tr>
          ))
        )}
      </Tbody>
    </Table>
  </Box>
);

// --- Main Component with Tabs ---
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
          <ScoreTable />
        </TabPanel>
        <TabPanel>
          <TopPlayersTable />
          <Button
            mt={6}
            bg="rgb(177, 203, 2)"
            color="black"
            _hover={{ bg: "rgb(140, 160, 2)" }}
            w="full"
            //onClick={handleGoToFixture}
          >
            Ver Todos los jugadores
          </Button>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Box>
);

export default StatsTabs;
