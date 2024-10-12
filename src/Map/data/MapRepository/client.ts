import axios from "axios";

const MapClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/map`,
});

export default MapClient;
