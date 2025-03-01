// Configuration for API endpoints
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://pokeapi.co/api/v2";

export const config = {
  apiBaseUrl: API_BASE_URL,
  endpoints: {
    pokemonList: `${API_BASE_URL}/pokemon`,
    pokemonDetail: (name: string) => `${API_BASE_URL}/pokemon/${name}`,
  },
};
