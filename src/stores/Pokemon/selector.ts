import get from "lodash/get";
import { createSelector } from "reselect";

const baseState = (state: any) => get(state, "pokemons") || {};

export const loading = createSelector(baseState, (state) =>
  get(state, "loading")
);

export const pokemons = createSelector(baseState, (state) => get(state, "pokemons"));


