import axios from "axios";

const teamClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/team`,
});

export default teamClient;
