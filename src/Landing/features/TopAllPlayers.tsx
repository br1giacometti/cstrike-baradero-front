// TopPlayers.tsx
import { useMemo } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import useAllMatchStatsService from "MatchStats/data/MatchStatsRepository/hooks/useAllMatchStatsService";
import { MatchStats } from "MatchStats/data/MatchStatsRepository";
import { BaseColumn } from "Base/components/DataTable";
import TableContent from "Landing/components/TableContent";
import { useRouter } from "next/router";

const TopAllPlayers = () => {
  const router = useRouter();
  const { matchstatsList, loading, error } = useAllMatchStatsService();

  const columns: BaseColumn<MatchStats>[] = useMemo(
    () => [
      { label: "Jugador", selector: (row) => row.player?.name || "N/A" },
      { label: "Equipo", selector: (row) => row.team?.name || "Sin equipo" },
      { label: "Kills", selector: (row) => row.kills },
      { label: "Muertes", selector: (row) => row.deaths },
    ],
    []
  );

  if (error) {
    return <Box color="red.500">Error al cargar los jugadores.</Box>;
  }

  const handleGoToStats = () => {
    router.push("/auth-public/public/public");
  };

  return (
    <Box>
      <TableContent data={matchstatsList} columns={columns} loading={loading} />
      <Button
        mt={6}
        bg="rgb(177, 203, 2)"
        color="black"
        _hover={{ bg: "rgb(140, 160, 2)" }}
        w="full"
        onClick={handleGoToStats}
      >
        Volver
      </Button>
    </Box>
  );
};

export default TopAllPlayers;
