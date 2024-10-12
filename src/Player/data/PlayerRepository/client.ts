import axios from "axios";

const playerClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/player`,
});

export default playerClient;
