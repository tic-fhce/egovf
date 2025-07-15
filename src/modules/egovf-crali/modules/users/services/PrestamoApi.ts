import axios from 'axios';

export const PrestamoApi = axios.create({
  baseURL: 'http://localhost:8098/api/',
});