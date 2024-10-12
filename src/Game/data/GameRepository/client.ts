import axios from "axios";

const GameClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/game`,
});

export default GameClient;
