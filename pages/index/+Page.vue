<template>
    <LayoutDefault>
        <template v-if="!pokes.length">
            Loading...
        </template>
        <template v-else>
            <v-card>
                <v-table>
                    <thead>
                        <tr>
                            <th v-for="header in headers">{{ header.title }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in pokemon.getRowModel().rows" @click="handleRowClick(row)">
                            <td v-for="cell in row.getVisibleCells()" :key="cell.id">
                                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
        </template>
    </LayoutDefault>
    <VueQueryDevtools />
</template>

<script setup lang="ts">

import { onServerPrefetch, computed, ref } from 'vue'
import { useQuery, useQueries } from '@tanstack/vue-query'
import { Pokemon } from './types.ts'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import LayoutDefault  from "../../layouts/LayoutDefault.vue";

import {
    FlexRender,
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

const table_data = computed(() => {
    if (!pokes.value.length) return []
    return pokes.value.map((poke) => {
        return { id: poke.data.id, name: poke.data.name, weight: poke.data.weight }
    })
})


const pokemon = useVueTable({
    data: table_data,
    columns,
    getCoreRowModel: getCoreRowModel(),
})

function handleRowClick(row) {
    const name_cell = row.getVisibleCells()[1]
    window.open(`/pokemon/${name_cell.getValue()}`, '_blank')
}

</script>
