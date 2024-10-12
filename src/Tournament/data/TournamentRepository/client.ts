import axios from "axios";

const tournamentClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/tournament`,
});

export default tournamentClient;
