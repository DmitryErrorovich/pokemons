import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./pokemonApi";
import axios from "axios";
import { map } from "lodash";

export interface fetchArguments {
  limit: number;
  offset: number;
}

// NOTE: actually needs refactor and made because of lack of time

export const fetchPokemonsAction = createAsyncThunk(
  "FETCH_POKEMONS",
  async ({ limit, offset }: fetchArguments) => {
    const response: any = await api.get(`?limit=${limit}&offset=${offset}`);
    const mergedResponse = await Promise.all(
      map(response.data.results, (item: any) => axios.get(item.url))
    );
    return [...map(mergedResponse, (item) => item.data)];
  }
);
