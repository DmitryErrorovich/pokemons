import { pokemonReducer } from './Pokemon/reducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        pokemons: pokemonReducer.reducer,
    },
});
