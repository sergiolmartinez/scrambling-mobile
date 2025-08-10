import axios from "axios";
import Constants from "expo-constants";

const baseURL = (Constants.expoConfig?.extra as any)?.API_BASE_URL;

export const api = axios.create({
  baseURL,
  timeout: 10000,
});
