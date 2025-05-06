<template>
    <tbody>
        <!-- <tr v-for="row in pokemon.getRowModel().rows" :key="row.id"> -->
        <!-- </tr> -->
    </tbody>
    <VueQueryDevtools />
</template>

<script setup lang="ts">

import { onServerPrefetch, computed } from 'vue'
import { useQuery, useQueries } from '@tanstack/vue-query'
import { Pokemon } from './types.ts'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import {
    getCoreRowModel,
    useVueTable,
    createColumnHelper,
} from '@tanstack/vue-table'

const page = 'https://pokeapi.co/api/v2/pokemon?limit=151'

const headers = [
    { title: 'ID', align: 'start', key: 'id' },
    { title: 'Name', align: 'end', key: 'name' },
    { title: 'Weight', align: 'end', key: 'weight' },
]

const { data: pokemons } = useQuery({
    queryKey: ['pokemon_page'],
    queryFn: fetchPokemonPage,
    select: (pokemon_page) => pokemon_page.map((pokemon) => pokemon.url),
})

const queries = computed(() => {
    if (!pokemons.value) return []
    return pokemons.value.length
        ? pokemons.value.map((url) => {
            return {
                queryKey: ['pokemon', url],
                queryFn: async () => {
                    const result = await fetch(url)
                    const pokemon = await result.json()
                    return pokemon
                },
            }
        })
        : []
})

const pokes = useQueries({
    queries,
})

async function fetchPokemonPage() {
    const response = await fetch(page)
    const pokemon_page = await response.json()
    return pokemon_page.results
}

const columnHelper = createColumnHelper<Pokemon>()
const columns = [
    columnHelper.accessor('id', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('name', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('weight', {
        cell: info => info.getValue(),
    }),
]

// const pokemon_data = ref<Pokemon[]>([])
// watch(data, (newData) => {
//     pokemon_data.value = newData || []
// })
//
// const pokemon = useVueTable({
//     get data() {
//         return pokemon_data.value
//     },
//     columns,
//     getCoreRowModel: getCoreRowModel(),
// })

</script>
