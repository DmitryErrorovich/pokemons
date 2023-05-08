import { connect } from "react-redux";
import {
  loading,
  pokemons,
  fetchPokemonsAction,
} from "../../stores/Pokemon";
import { createStructuredSelector } from "reselect";
import { Home } from "./Home";

const mapState = createStructuredSelector({
  loading,
  pokemons,
});

const mapDispatch = {
  fetchPokemons: fetchPokemonsAction,
};

export default connect(mapState, mapDispatch)(Home);
