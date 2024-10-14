import { useMemo } from "react";
import { useTranslation } from "Base/i18n";
import DataTable, { BaseColumn } from "Base/components/DataTable";
import {
  Flex,
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
} from "@chakra-ui/react";
import useAllScoreService from "Tournament/data/TournamentRepository/hooks/useAllScoreService";

interface Team {
  idEquipo: number;
  nombreEquipo: string;
  victoriasTotales: number;
  derrotasTotales: number;
  puntuacionTotal: number;
}

// Datos simulados (normalmente vendrían de una API)
const simulatedData: Team[] = [
  {
    idEquipo: 1,
    nombreEquipo: "Equipo 1",
    victoriasTotales: 3,
    derrotasTotales: 1,
    puntuacionTotal: 9,
  },
  {
    idEquipo: 2,
    nombreEquipo: "Equipo 2",
    victoriasTotales: 2,
    derrotasTotales: 2,
    puntuacionTotal: 6,
  },
  {
    idEquipo: 3,
    nombreEquipo: "Equipo 3",
    victoriasTotales: 1,
    derrotasTotales: 2,
    puntuacionTotal: 3,
  },
  {
    idEquipo: 4,
    nombreEquipo: "Equipo 4",
    victoriasTotales: 1,
    derrotasTotales: 2,
    puntuacionTotal: 3,
  },
];

const ScoreTable = () => {
  const { t } = useTranslation("team");

  const loading = false; // Simulación de carga
  const { scoreList, error } = useAllScoreService();

  const columns: BaseColumn<Team>[] = useMemo(
    () => [
      {
        label: t("Equipo"),
        selector: (row) => row.nombreEquipo,
      },
      {
        label: t("Victorias"),
        selector: (row) => row.victoriasTotales,
      },
      {
        label: t("Perdidas"),
        selector: (row) => row.derrotasTotales,
      },
      {
        label: t("Puntos"),
        selector: (row) => row.puntuacionTotal,
      },
    ],
    [t]
  );

  return (
    <>
      <Box mt={10} p={6} bg="gray.800" borderRadius="md" shadow="lg" w="100%">
        <Flex justify="space-between" align="center" mb={4}>
          <Heading as="h2" size="lg" color="rgb(177, 203, 2)">
            Tabla de Posiciones
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
                scoreList.map((team) => (
                  <Tr
                    key={team.idEquipo}
                    bg={team.idEquipo % 2 === 0 ? "gray.700" : "gray.800"}
                  >
                    <Td color="white">{team.nombreEquipo}</Td>
                    <Td color="white">{team.victoriasTotales}</Td>
                    <Td color="white">{team.derrotasTotales}</Td>
                    <Td color="rgb(177, 203, 2)">{team.puntuacionTotal}</Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </>
  );
};

export default ScoreTable;
