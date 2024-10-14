import OptionItem from "Base/types/OptionItem";
import { useAllCategoryService } from "Category/data/CategoryRepository";
import { useAllPlayerService } from "Player/data/PlayerRepository";
import { useAllTeamService } from "Team/data/TeamRepository";

export interface UsePlayerOptionsReturn {
  options: OptionItem<number>[];
  loading: boolean;
  error?: string;
}

const usePlayersOptions = (): UsePlayerOptionsReturn => {
  const { playerList, loading, error } = useAllPlayerService();

  return {
    options: playerList.map((player) => ({
      label: `${player.name}`,
      value: player.id,
    })),
    loading,
    error,
  };
};

export default usePlayersOptions;
