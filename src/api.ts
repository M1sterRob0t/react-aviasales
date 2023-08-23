import axios from 'axios';
import type { AxiosInstance } from 'axios';

const BASE_URL = 'https://aviasales-test-api.kata.academy';
const TIMEOUT = 5000;

export function createApi(): AxiosInstance {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: {},
  });

  return api;
}
