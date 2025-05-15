export type Pokemon = {
  id: number;
  name: string;
  weight: number;
  url: string;
};

// Add this type definition near the top of your script
export type TablePokemon = {
    id: number | undefined;
    name: string | undefined;
    weight: number | undefined;
    url: string | undefined;
}
