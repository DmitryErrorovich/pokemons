import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon/"
});

api.defaults.headers.post["Accept"] = "application/json";

export default api;
