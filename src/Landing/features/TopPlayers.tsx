// TopPlayers.tsx
import { useMemo } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import useAllMatchStatsService from "MatchStats/data/MatchStatsRepository/hooks/useAllMatchStatsService";
import { MatchStats } from "MatchStats/data/MatchStatsRepository";
import { BaseColumn } from "Base/components/DataTable";
import TableContent from "Landing/components/TableContent";
import { useRouter } from "next/router";
import useTop10MatchStatsService from "MatchStats/data/MatchStatsRepository/hooks/useTop10MatchStatsService";

// Interfaz para datos agrupados
interface PlayerAggregatedStats {
  name: string;
  team: string;
  totalKills: number;
  totalDeaths: number;
}

const TopPlayers = () => {
  const router = useRouter();
  const { matchstatsList, loading, error } = useAllMatchStatsService();

  // Agrupa los datos por jugador y suma los stats
  const aggregatedStats = useMemo(() => {
    const playerMap = new Map<string, PlayerAggregatedStats>();

    matchstatsList.forEach((match) => {
      const playerName = match.player?.name || "N/A";
      const teamName = match.team?.name || "Sin equipo";

      if (playerMap.has(playerName)) {
        const existing = playerMap.get(playerName)!;
        existing.totalKills += match.kills;
        existing.totalDeaths += match.deaths;
      } else {
        playerMap.set(playerName, {
          name: playerName,
          team: teamName,
          totalKills: match.kills,
          totalDeaths: match.deaths,
        });
      }
    });

    return Array.from(playerMap.values());
  }, [matchstatsList]);

  const columns: BaseColumn<PlayerAggregatedStats>[] = useMemo(
    () => [
      { label: "Jugador", selector: (row) => row.name },
      { label: "Equipo", selector: (row) => row.team },
      { label: "Kills", selector: (row) => row.totalKills },
      { label: "Muertes", selector: (row) => row.totalDeaths },
    ],
    []
  );

  if (error) {
    return <Box color="red.500">Error al cargar los jugadores.</Box>;
  }

  const handleGoToStats = () => {
    router.push("/auth-public/stats/stats");
  };

  return (
    <Box>
      <TableContent
        data={aggregatedStats}
        columns={columns}
        loading={loading}
      />
      <Button
        mt={6}
        bg="rgb(177, 203, 2)"
        color="black"
        _hover={{ bg: "rgb(140, 160, 2)" }}
        w="full"
        onClick={handleGoToStats}
      >
        Ver todo
      </Button>
    </Box>
  );
};

export default TopPlayers;
