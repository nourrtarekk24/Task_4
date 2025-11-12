import axios from 'axios'

// Use the TEST_BASE_URL when running the integration test harness so the
// client automatically targets the ephemeral server started by
// `tests/runWithServer.mjs`. Fall back to the local dev URL otherwise.
const baseURL = process.env.TEST_BASE_URL || 'http://localhost:4000/api';

export const api = axios.create({
  baseURL
})

// Attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
