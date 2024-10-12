import { Select, Button, Stack, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";

interface Team {
  id: number;
  name: string;
}

interface Match {
  teamAId: number;
  teamBId: number;
}

interface MultiSelectMenuProps {
  teams: Team[];
  matches: Match[];
  onMatchAdd: (teamAId: number, teamBId: number) => void;
}

const MultiSelectMenu: React.FC<MultiSelectMenuProps> = ({
  teams,
  matches,
  onMatchAdd,
}) => {
  const [selectedTeamA, setSelectedTeamA] = useState<number | null>(null);
  const [selectedTeamB, setSelectedTeamB] = useState<number | null>(null);

  const handleAddMatch = () => {
    if (selectedTeamA && selectedTeamB) {
      // Validar que no se seleccione el mismo equipo y que no se repita en los partidos
      const isTeamAInMatches = matches.some(
        (match) =>
          match.teamAId === selectedTeamA || match.teamBId === selectedTeamA
      );
      const isTeamBInMatches = matches.some(
        (match) =>
          match.teamAId === selectedTeamB || match.teamBId === selectedTeamB
      );

      if (
        selectedTeamA === selectedTeamB ||
        isTeamAInMatches ||
        isTeamBInMatches
      ) {
        // Mostrar un mensaje de error si hay un problema
        alert(
          "No puedes seleccionar el mismo equipo o repetir un equipo en los partidos."
        );
        return;
      }

      onMatchAdd(selectedTeamA, selectedTeamB); // Llama a la función que maneja la adición de partidos
      // Reset selections after adding the match
      setSelectedTeamA(null);
      setSelectedTeamB(null);
    }
  };

  // Filtrar equipos que ya están seleccionados
  const filteredTeamsForA = teams.filter((team) => {
    // No mostrar en Equipo A los equipos que ya están en Equipo B o en los partidos
    return (
      !matches.some(
        (match) => match.teamAId === team.id || match.teamBId === team.id
      ) && team.id !== selectedTeamB
    );
  });

  const filteredTeamsForB = teams.filter((team) => {
    // No mostrar en Equipo B los equipos que ya están en Equipo A o en los partidos
    return (
      !matches.some(
        (match) => match.teamAId === team.id || match.teamBId === team.id
      ) && team.id !== selectedTeamA
    );
  });

  return (
    <Stack spacing={4}>
      <Select
        placeholder="Selecciona Equipo A"
        value={selectedTeamA || ""}
        onChange={(e) => setSelectedTeamA(Number(e.target.value))}
      >
        {filteredTeamsForA.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </Select>
      <Select
        placeholder="Selecciona Equipo B"
        value={selectedTeamB || ""}
        onChange={(e) => setSelectedTeamB(Number(e.target.value))}
      >
        {filteredTeamsForB.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </Select>
      <Button
        onClick={handleAddMatch}
        colorScheme="blue"
        isDisabled={!selectedTeamA || !selectedTeamB}
      >
        Agregar Partido
      </Button>

      {/* Mostrar los partidos agregados */}
      <VStack spacing={2} align="start" mt={4}>
        <Text fontWeight="bold">Partidos Agregados:</Text>
        {matches.length === 0 ? (
          <Text>No hay partidos agregados.</Text>
        ) : (
          matches.map((match, index) => {
            const teamA = teams.find((team) => team.id === match.teamAId);
            const teamB = teams.find((team) => team.id === match.teamBId);
            return (
              <Text key={index}>{`${teamA?.name} vs ${teamB?.name}`}</Text>
            );
          })
        )}
      </VStack>
    </Stack>
  );
};

export default MultiSelectMenu;
