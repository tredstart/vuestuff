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
                {{ item.id }} ({{ item.name }}) ({{ item.weight }})
            </li>
        </template>
    </ol>
</template>

<script setup>

import { onServerPrefetch } from 'vue'
import { useQuery } from '@tanstack/vue-query'

const page = 'https://pokeapi.co/api/v2/pokemon?limit=151'

const { isError, isPending, isFetching, data, error, suspense } = useQuery({
    queryKey: ['pokemon-list'],
    queryFn: () => fetchPokemonPage(),
    staleTime: 1000 * 60 * 5,
})

// This will be called on the server to prefetch the data
onServerPrefetch(suspense)

async function fetchPokemonPage() {
    const response = await fetch(page)
    const pokemon_page = (await response.json())
    return Promise.all(pokemon_page.results.map(async (poke) => {
        try {
            const { name, url } = poke
            const pokemon_response = await fetch(url)
            const pokemon = await pokemon_response.json()
            return { id: pokemon.id, name: pokemon.name, weight: pokemon.weight }
        } catch (TypeError) {
            return {}
        }
    }))
}

</script>
