<template>
    <h1>pokedeez</h1>
    <ol>
        <template v-if="isPending">
            <li>Loading...</li>
        </template>
        <template v-else-if="isError">
            <li>Error: {{ error }}</li>
        </template>
        <template v-else>
            <li v-for="item in data" :key="item.id">
                {{ item.name }} ({{ item.url }})
            </li>
        </template>
    </ol>
</template>

<script lang="ts" setup>

import { onServerPrefetch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { Pokemon } from './types.ts'

const page = 'https://pokeapi.co/api/v2/pokemon?limit=151'

const { isError, isPending, isFetching, data, error, suspense } = useQuery({
    queryKey: [],
    queryFn: () => fetchPokemonPage(),
    staleTime: 1000 * 60 * 5,
    select: (data) => minimize(data),
})

// This will be called on the server to prefetch the data
onServerPrefetch(suspense)

async function fetchPokemonPage(): Promise<PokemonPage> {
    const response = await fetch(page)
    const pokemon_page = (await response.json()) as PokemonPage
    return pokemon_page
}

function minimize(pokemon_page: PokemonPage): Pokemon[] {
    return pokemon_page.results.map((poke) => {
        const { name, url } = poke
    }) as Pokemon[]
}

function minimizePoke(poke) {
    return {
        id: poke.id,
        name: poke.name,
        weight: poke.weight,
    }
}
</script>
