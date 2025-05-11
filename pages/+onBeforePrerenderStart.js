export async function onBeforePrerenderStart() {
    const page = 'https://pokeapi.co/api/v2/pokemon?limit=151';
    const response = await fetch(page);
    const pokemon_page = await response.json();
    let i = 0;
    return pokemon_page.results.map((pokemon) => {
        console.warn(pokemon.name, i);
        i++;
        return { url: `/pokemon/${pokemon.name}` };
    })
}
