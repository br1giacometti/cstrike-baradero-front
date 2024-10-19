import { useMemo } from "react";
import { useTranslation } from "Base/i18n";
import DataTable, { BaseColumn } from "Base/components/DataTable";
import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

// Interfaz para el top de jugadores
interface PlayerStats {
  idJugador: number;
  nombreJugador: string;
  kills: number;
  deaths: number;
  nombreEquipo: string;
}

// Datos simulados
const simulatedPlayerStats: PlayerStats[] = [
  {
    idJugador: 2,
    nombreJugador: "Jugador 2",
    kills: 25,
    deaths: 4,
    nombreEquipo: "Equipo 1",
  },
  {
    idJugador: 1,
    nombreJugador: "Jugador 1",
    kills: 16,
    deaths: 3,
    nombreEquipo: "Equipo 2",
  },
  {
    idJugador: 1,
    nombreJugador: "Jugador 1",
    kills: 15,
    deaths: 4,
    nombreEquipo: "Equipo 1",
  },
  {
    idJugador: 2,
    nombreJugador: "Jugador 2",
    kills: 10,
    deaths: 4,
    nombreEquipo: "Equipo 2",
  },
];

const TopPlayersTable = () => {
  const { t } = useTranslation("player"); // Traducción
  const loading = false; // Simulación de carga

  // Definición de las columnas
  const columns: BaseColumn<PlayerStats>[] = useMemo(
    () => [
      { label: t("Jugador"), selector: (row) => row.nombreJugador },
      { label: t("Equipo"), selector: (row) => row.nombreEquipo },
      { label: t("Kills"), selector: (row) => row.kills },
      { label: t("Muertes"), selector: (row) => row.deaths },
      { label: t("KDA"), selector: (row) => row.kills / row.deaths },
    ],
    [t]
  );

  return (
    <Box mt={10} p={6} bg="gray.800" borderRadius="md" shadow="lg" w="100%">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h2" size="lg" color="rgb(177, 203, 2)">
          Top Jugadores
        </Heading>
      </Flex>
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
                <Td
                  colSpan={columns.length}
                  textAlign="center"
                  color="gray.400"
                >
                  Cargando...
                </Td>
              </Tr>
            ) : (
              simulatedPlayerStats.map((player) => (
                <Tr
                  key={player.idJugador}
                  bg={player.idJugador % 2 === 0 ? "gray.700" : "gray.800"}
                >
                  <Td color="white">{player.nombreJugador}</Td>
                  <Td color="white">{player.nombreEquipo}</Td>
                  <Td color="white">{player.kills}</Td>
                  <Td color="white">{player.deaths}</Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default TopPlayersTable;
