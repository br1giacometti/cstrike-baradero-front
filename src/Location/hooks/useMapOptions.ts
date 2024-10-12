import OptionItem from "Base/types/OptionItem";
import useAllMapService from "Map/data/MapRepository/hooks/useAllMapService";

interface UseMapOptionsReturn {
  options: OptionItem<number>[];
  loading: boolean;
  error?: string;
}

const useMapOptions = (): UseMapOptionsReturn => {
  const { MapList, loading, error } = useAllMapService();

  return {
    options: MapList.map((mapas) => ({
      label: `${mapas.name}`,
      value: mapas.id,
    })),
    loading,
    error,
  };
};

export default useMapOptions;
