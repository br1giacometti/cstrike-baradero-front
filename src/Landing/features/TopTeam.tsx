// TopTeams.tsx
import { useMemo } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import useAllScoreService from "Tournament/data/TournamentRepository/hooks/useAllScoreService";

import { BaseColumn } from "Base/components/DataTable";
import TableContent from "Landing/components/TableContent";

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

const TopTeams = () => {
  const { scoreList, loading, error } = useAllScoreService();

  const columns: BaseColumn<Team>[] = useMemo(
    () => [
      { label: "Equipo", selector: (row) => row.nombreEquipo },
      { label: "Victorias", selector: (row) => row.victoriasTotales },
      { label: "Perdidas", selector: (row) => row.derrotasTotales },
      { label: "Puntos", selector: (row) => row.puntuacionTotal },
    ],
    []
  );

  if (error) {
    return <Box color="red.500">Error al cargar los equipos.</Box>;
  }

  return <TableContent data={scoreList} columns={columns} loading={loading} />;
};

export default TopTeams;
