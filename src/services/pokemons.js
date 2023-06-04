import { api } from "./api";

export const getPokemons = async () => {
  const { data } = await api.get("/pokemon?offset=0&limit=20");
  return data;
};

export const getPokemon = async (id) => {
  const { data } = await api.get(`/pokemon/${id}`);
  return data;
};
