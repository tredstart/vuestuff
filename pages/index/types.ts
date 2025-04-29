export interface PokemonPage {
    count: number,
    next: string | null,
    previous: string | null,
    results: Pokemon[],
};

export interface Pokemon {
    id: number,
    name: string,
    weight: number,
};

