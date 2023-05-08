import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import "./styles.scss";
import { useEffect, useMemo, useState } from "react";
import { LoadingType } from "../../stores/Pokemon/reducer";
import map from "lodash/map";
import { fetchArguments } from "../../stores/Pokemon";
import size from "lodash/size";
import get from "lodash/get";

interface IProps {
  loading: LoadingType;
  pokemons: Array<any>;

  fetchPokemons: (args: fetchArguments) => Promise<any>;
}

// NOTE: actually needs refactor and made because of lack of time

export const Home = ({ fetchPokemons, loading, pokemons }: IProps) => {
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    fetchPokemons({ limit: 12, offset: 0 });
  }, [fetchPokemons]);

  const renderSelected = useMemo(() => {
    return (
      !!selected && (
        <Card
          style={{
            background: "#f6f6f6",
          }}
        >
          <CardMedia
            sx={{ height: 140 }}
            image={get(selected, "sprites.front_default")}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {selected.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Type: {map(selected.types, (item) => item.type.name).join(", ")}
            </Typography>
            {map(selected.stats, (stat) => (
              <Typography
                key={`stat-${stat.stat.name}-${stat.base_stat}`}
                variant="body2"
                color="text.secondary"
              >
                {stat.stat.name}: {stat.base_stat}
              </Typography>
            ))}
          </CardContent>
        </Card>
      )
    );
  }, [selected]);

  const renderList = useMemo(() => {
    return (
      <List className={"pokemons"}>
        {map(pokemons, (pokemon, index) => (
          <ListItem
            key={`pokemon-${pokemon.name}-${index}`}
            className={"pokemons_single"}
            onClick={() => setSelected(pokemon)}
          >
            <img
              src={get(pokemon, "sprites.front_default")}
              alt={"Ooops, nothing to display"}
              loading="lazy"
            />
            <ListItemText primary={pokemon.name} />
            {map(pokemon.types, (item) => (
              <ListItemText
                key={`type-${item.type.name}-${index}`}
                className="ability"
                secondary={item.type.name}
              />
            ))}
          </ListItem>
        ))}
      </List>
    );
  }, [pokemons]);

  return (
    <>
      <Grid
        container
        className={"container"}
        style={{ flexDirection: "column" }}
      >
        <Typography variant="h5" align="center">
          Pokedex
        </Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {renderSelected}
        </div>
        {renderList}
        <Button
          disabled={loading === "pending"}
          onClick={() =>
            fetchPokemons({ limit: 12, offset: size(pokemons) || 0 })
          }
        >
          Load more
        </Button>
      </Grid>
    </>
  );
};
