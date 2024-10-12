import axios from "axios";

const LocationClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/location`,
});

export default LocationClient;
