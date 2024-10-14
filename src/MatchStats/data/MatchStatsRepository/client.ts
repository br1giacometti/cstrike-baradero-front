import axios from "axios";

const matchStatsClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/matchstats`,
});

export default matchStatsClient;
