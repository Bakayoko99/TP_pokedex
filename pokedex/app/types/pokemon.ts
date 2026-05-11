export interface PokemonType {
  id: number;
  name: string;
  image: string;
}

export interface PokemonStats {
  HP: number;
  speed: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
}

export interface PokemonEvolution {
  name: string;
  pokedexId: number;
}

export interface Pokemon {
  id: number;
  pokedexId: number;
  name: string;
  image: string;
  sprite: string;
  stats: PokemonStats;
  generation: number;
  evolutions: PokemonEvolution[];
  types: PokemonType[];
}
