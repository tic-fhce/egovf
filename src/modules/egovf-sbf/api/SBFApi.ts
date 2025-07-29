import axios from 'axios';
import { API_URL_EGOVF_SBF } from "@env";

const SBFApi = axios.create({
  baseURL: API_URL_EGOVF_SBF,
});

export { SBFApi };