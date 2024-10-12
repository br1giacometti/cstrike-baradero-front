import axios from "axios";

const matchClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/match`,
});

export default matchClient;
