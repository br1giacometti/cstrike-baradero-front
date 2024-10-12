import axios from "axios";

const matchDayClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/matchday`,
});

export default matchDayClient;
