import { createSlice } from "@reduxjs/toolkit";
import { fetchPokemonsAction } from "./actions";
import { get } from "lodash";

export type LoadingType = "idle" | "pending" | "succeeded" | "failed";

export interface IInitialState {
  pokemons: any;
  loading: LoadingType;
}

export const pokemonReducer = createSlice({
  name: "pokemons",
  initialState: {
    pokemons: [],
    loading: "idle",
  } as IInitialState,
  reducers: {
    cleanStore: (state) => ({
      ...state,
      pokemons: [],
      loading: "idle",
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPokemonsAction.fulfilled,
      (state: any, action: any) => {
        return {
          ...state,
          pokemons: [...state.pokemons, ...get(action, "payload")],
          loading: "succeeded",
        };
      }
    );
    builder.addCase(fetchPokemonsAction.pending, (state: any, action: any) => ({
      ...state,
      loading: "pending",
    }));
    builder.addCase(
      fetchPokemonsAction.rejected,
      (state: any, action: any) => ({
        ...state,
        ...action.payload,
        loading: "failed",
      })
    );
  },
});

export const { cleanStore } = pokemonReducer.actions;

export default pokemonReducer.reducer;
