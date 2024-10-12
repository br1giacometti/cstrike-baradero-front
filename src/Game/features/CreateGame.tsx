import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  Spinner,
  useToast,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useTranslation } from "Base/i18n";
import useAllLocationService from "Location/data/LocationRepository/hooks/useAllLocationService";
import useAllMapService from "Map/data/MapRepository/hooks/useAllMapService";
import { Map } from "Map/data/MapRepository";
import { Location } from "Location/data/LocationRepository";
import useCreateGameService from "Game/data/GameRepository/hooks/useCreateGameService";
import { CreateGameSchema } from "Game/schemas/createGameSchema";

const MAP_SIZE = 160; // Tamaño de cada mapa en píxeles
const MAPS_PER_ROW = 5; // Número de mapas por fila
const TOTAL_ROUNDS = 10; // Número total de rondas en el juego
const INTERVALO = 10000;

interface GameHeaderProps {
  navigateToCreateGame: () => void;
}

const CreateGame = ({ navigateToCreateGame }: GameHeaderProps) => {
  const { t } = useTranslation("game");
  const toast = useToast();
  const [randomLocation, setRandomLocation] = useState<Location | null>(null);
  const [maps, setMaps] = useState<Map[]>([]);
  const [showMaps, setShowMaps] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [locationStart, setLocationStart] = useState(false);
  const [userClick, setUserClick] = useState<{ x: number; y: number } | null>(
    null
  );

  const [hasClicked, setHasClicked] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [totalScore, setTotalScore] = useState<number>(0); // Puntaje total acumulado
  const [currentRound, setCurrentRound] = useState(1); // Ronda actual
  const [gameEnded, setGameEnded] = useState(false);
  const [lineDrawn, setLineDrawn] = useState(false); // Nuevo estado para controlar si la línea ya ha sido trazada

  const { LocationList: locations, loading: loadingLocations } =
    useAllLocationService();
  const { MapList: allMaps, loading: loadingMaps } = useAllMapService();
  const [body, setBody] = useState<CreateGameSchema | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (allMaps.length > 0) {
      setMaps(allMaps);
    }
  }, [allMaps]);

  const startNewRound = useCallback(() => {
    if (currentRound > TOTAL_ROUNDS) {
      setGameEnded(true);
      setGameStarted(false);
      return;
    }

    if (locations && locations.length > 0) {
      const randomIndex = Math.floor(Math.random() * locations.length);
      const location = locations[randomIndex];
      setRandomLocation(location);
      setLoading(true);
      setLocationStart(true);
      setHasClicked(false);

      const timer = setTimeout(() => {
        setLoading(false);
        setShowMaps(true);
        setLocationStart(false);
      }, INTERVALO); // show maps after 1 second for better UX

      return () => clearTimeout(timer);
    } else {
      toast({
        status: "error",
        description: t("errors.noLocations"),
      });
    }
  }, [currentRound, locations, toast, t]);

  const handleStartGame = useCallback(() => {
    setGameStarted(true);
    setCurrentRound(1);
    setTotalScore(0); // Resetear el puntaje total al iniciar el juego
    startNewRound();
  }, [startNewRound]);

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!lineDrawn) {
      // Solo permitir trazar si no se ha dibujado una línea
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setUserClick({ x, y });
      setHasClicked(true);
    }
  };

  useEffect(() => {
    if (userClick && randomLocation && canvasRef.current && !lineDrawn) {
      const ctx = canvasRef.current.getContext("2d");
      const locationMap = maps.find((map) => map.id === randomLocation.mapId);

      if (locationMap && ctx) {
        const locationIndex = maps.indexOf(locationMap);
        const locationRow = Math.floor(locationIndex / MAPS_PER_ROW);
        const locationCol = locationIndex % MAPS_PER_ROW;

        // Ajuste de coordenadas basado en el tamaño de la cuadrícula
        const mapOffsetX = locationCol * MAP_SIZE;
        const mapOffsetY = locationRow * MAP_SIZE;
        const gridX = (randomLocation.coordX / locationMap.sizeX) * MAP_SIZE;
        const gridY = (randomLocation.coordY / locationMap.sizeY) * MAP_SIZE;

        const locationX = mapOffsetX + gridX;
        const locationY = mapOffsetY + gridY;

        // Limpiar el canvas antes de trazar una nueva línea
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // Dibuja la línea
        ctx.beginPath();
        ctx.moveTo(userClick.x, userClick.y);
        ctx.lineTo(locationX, locationY);
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Calcular la distancia euclidiana
        const distance = Math.sqrt(
          Math.pow(locationX - userClick.x, 2) +
            Math.pow(locationY - userClick.y, 2)
        );
        const roundScore = parseFloat(distance.toFixed(2));
        setScore(roundScore);
        setTotalScore((prevScore) => prevScore + roundScore); // Acumulando el puntaje total

        setLineDrawn(true); // Marcar que la línea ha sido trazada
      }
    }
  }, [userClick, randomLocation, maps, lineDrawn]);

  const onSignUp = useCallback(
    (error?: string) => {
      if (error) {
        toast({
          status: "error",
          description: error,
        });
        return;
      }
    },
    [t, toast]
  );

  const { loading: loadingCreateGame } = useCreateGameService(body, onSignUp);

  const handleEndGame = useCallback(() => {
    if (!gameEnded && gameStarted) {
      setGameEnded(true);
      setGameStarted(false);
      const finalGameData: CreateGameSchema = {
        totalScore: Math.round(totalScore),
        gameResults: [],
      };

      // Solo actualizar el estado si es diferente
      if (JSON.stringify(body) !== JSON.stringify(finalGameData)) {
        setBody(finalGameData);
      }
      if (body) {
        useCreateGameService(body, onSignUp);
      }
      navigateToCreateGame();

      toast({
        status: "success",
        description: t("Juego Terminado"),
      });
    }
  }, [
    gameEnded,
    gameStarted,
    totalScore,
    body,
    t,
    toast,
    navigateToCreateGame,
  ]);

  const handleCreateLocation = useCallback(() => {
    if (randomLocation && userClick && !gameEnded) {
      setShowMaps(false);
      setUserClick(null);
      setScore(null); // Resetear el puntaje para la siguiente ronda
      setLineDrawn(false); // Resetear el estado de la línea trazada

      setCurrentRound((prevRound) => {
        const nextRound = prevRound + 1;

        if (nextRound > TOTAL_ROUNDS) {
          // Terminar el juego después de la última ronda
          handleEndGame();
        } else {
          startNewRound();
        }

        return nextRound;
      });
    }
  }, [
    randomLocation,
    userClick,
    score,
    gameEnded,
    startNewRound,
    handleEndGame,
  ]);

  if (loadingLocations || loadingMaps) {
    return <Spinner />;
  }

  const totalRows = Math.ceil(maps.length / MAPS_PER_ROW);
  const totalHeight = totalRows * MAP_SIZE;

  return (
    <VStack spacing={4} align="center" position="relative">
      <Flex
        bgSize="cover"
        bgPosition="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Flex
          direction="column"
          m={20}
          borderRadius="md"
          boxShadow="md"
          width="100%"
          justifyContent="center" // Centra verticalmente el contenido
          align="center" // Centra horizontalmente el contenido
          position="relative"
        >
          {score !== null && !locationStart && (
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="main"
              textAlign="center"
              mb={4} // Añadir espacio entre los elementos
            >
              Score Round: {score.toFixed(0)}
            </Text>
          )}

          {totalScore !== null && gameStarted && !locationStart && (
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="main"
              textAlign="center"
              mb={4} // Añadir espacio entre los elementos
            >
              Score Total: {totalScore.toFixed(0)}
            </Text>
          )}

          {currentRound > 0 && !gameEnded && gameStarted && !locationStart && (
            <Button
              onClick={handleCreateLocation}
              colorScheme={"main"}
              variant="solid"
              size="lg"
            >
              {currentRound >= TOTAL_ROUNDS
                ? `Terminar (Ronda ${currentRound} de ${TOTAL_ROUNDS})`
                : `Siguiente ubicación (Ronda ${currentRound} de ${TOTAL_ROUNDS})`}
            </Button>
          )}
        </Flex>

        <Box
          bg="blackAlpha.600" // Fondo negro semitransparente
          borderRadius="xl"
          display="flex"
          height="200px"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          {!gameStarted && (
            <VStack spacing={4} align="center" width="90%">
              <Text textAlign="center" fontSize={{ base: "lg", md: "xl" }}>
                {"¿Cuánto conoces el Helbreath?!"}
              </Text>
              <Button onClick={handleStartGame} colorScheme={"main"}>
                {"Comenzar!"}
              </Button>
            </VStack>
          )}

          {gameEnded && <Text fontSize="lg">{t("Juego Terminado")}</Text>}

          {loading && randomLocation && (
            <VStack spacing={4} align="center">
              <Text>
                {t("Descubre dónde se encuentra! Tienes 10 segundos")}
              </Text>
              <img
                src={randomLocation.imageUrl}
                alt={`Location ${randomLocation.id}`}
                style={{ width: "800px", height: "auto" }}
              />
            </VStack>
          )}

          {showMaps && maps.length > 0 && (
            <Box
              position="relative"
              onClick={handleMapClick}
              width={MAP_SIZE * MAPS_PER_ROW}
              height={totalHeight}
            >
              <canvas
                ref={canvasRef}
                width={MAP_SIZE * MAPS_PER_ROW}
                height={totalHeight}
                style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
              />

              {maps.map((map) => {
                const row = Math.floor(maps.indexOf(map) / MAPS_PER_ROW);
                const col = maps.indexOf(map) % MAPS_PER_ROW;

                return (
                  <img
                    key={map.id}
                    src={map.imageUrl}
                    alt={`Map ${map.id}`}
                    style={{
                      position: "absolute",
                      top: row * MAP_SIZE,
                      left: col * MAP_SIZE,
                      width: MAP_SIZE,
                      height: MAP_SIZE,
                    }}
                  />
                );
              })}

              {/* Mostrar el píxel solo si se ha hecho clic */}
              {hasClicked && randomLocation && (
                <Box
                  position="absolute"
                  width="5px"
                  height="5px"
                  backgroundColor="red"
                  borderRadius="50%"
                  zIndex={2} // Asegúrate de que esté sobre el mapa
                  top={(() => {
                    const locationMap = maps.find(
                      (map) => map.id === randomLocation.mapId
                    );
                    if (locationMap) {
                      const row = Math.floor(
                        maps.indexOf(locationMap) / MAPS_PER_ROW
                      );
                      const offsetY = row * MAP_SIZE;
                      const gridY =
                        (randomLocation.coordY / locationMap.sizeY) * MAP_SIZE;
                      return offsetY + gridY;
                    }
                    return 0;
                  })()}
                  left={(() => {
                    const locationMap = maps.find(
                      (map) => map.id === randomLocation.mapId
                    );
                    if (locationMap) {
                      const col = maps.indexOf(locationMap) % MAPS_PER_ROW;
                      const offsetX = col * MAP_SIZE;
                      const gridX =
                        (randomLocation.coordX / locationMap.sizeX) * MAP_SIZE;
                      return offsetX + gridX;
                    }
                    return 0;
                  })()}
                />
              )}
            </Box>
          )}
        </Box>
      </Flex>
    </VStack>
  );
};

export default CreateGame;
