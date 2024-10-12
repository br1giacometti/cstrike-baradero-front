import OptionItem from "Base/types/OptionItem";
import { useAllCategoryService } from "Category/data/CategoryRepository";
import { useAllTeamService } from "Team/data/TeamRepository";

interface UseTeamOptionsReturn {
  options: OptionItem<number>[];
  loading: boolean;
  error?: string;
}

const useTeamOptions = (): UseTeamOptionsReturn => {
  const { teamList, loading, error } = useAllTeamService();

  return {
    options: teamList.map((team) => ({
      label: `${team.name}`,
      value: team.id,
    })),
    loading,
    error,
  };
};

export default useTeamOptions;
