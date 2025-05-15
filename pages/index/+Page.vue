<template>
    <LayoutDefault>
        <template v-if="!pokes?.value?.length || pokes.value.some(poke => poke.isLoading)">
            <v-container>
                <v-card class="pa-4">
                    <v-skeleton-loader type="table-heading, table-row@151"></v-skeleton-loader>
                </v-card>
            </v-container>
        </template>
        <template v-else>
            <v-container>
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
            </v-container>
        </template>
    </LayoutDefault>
    <VueQueryDevtools />
</template>

<script setup lang="ts">

import { computed } from 'vue';
import { useQuery, useQueries } from '@tanstack/vue-query';
import { Pokemon, TablePokemon } from './types';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import LayoutDefault from "../../layouts/LayoutDefault.vue";


import {
    FlexRender,
    getCoreRowModel,
    useVueTable,
    createColumnHelper,
} from '@tanstack/vue-table';

const props = defineProps<{
    pageContext?: {
        routeParams?: Record<string, string>
    }
}>();

const page = 'https://pokeapi.co/api/v2/pokemon?limit=151'

const headers = [
    { title: 'ID', align: 'start', key: 'id' },
    { title: 'Name', align: 'end', key: 'name' },
    { title: 'Weight', align: 'end', key: 'weight' },
]


async function fetchPokemonPage() {
    const response = await fetch(page)
    const pokemon_page = await response.json()
    return pokemon_page.results
}

const pokemonURLs = useQuery({
    queryKey: ['pokemon_page'],
    queryFn: fetchPokemonPage,
    select: (pokemon_page) => pokemon_page.map((pokemon: Pokemon) => pokemon.url) as string[],
})


const columnHelper = createColumnHelper<TablePokemon>()

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

const pokes = computed(() => {
    return useQueries({
        queries: computed(() => {
            if (!pokemonURLs.data.value) return []
            return pokemonURLs.data.value.length
                ? pokemonURLs.data.value.map((url: string) => {
                    return {
                        queryKey: ['pokemon', url],
                        queryFn: async () => {
                            const result = await fetch(url)
                            const pokemon: Pokemon = await result.json()
                            return pokemon
                        },
                    }
                })
                : []
        })
    })
})

const table_data = computed(() => {
    if (!pokes.value?.value.length) return []

    return pokes.value.value
        .filter(poke => poke.isSuccess && poke.data)
        .map(poke => ({
            id: poke.data?.id,
            name: poke.data?.name,
            weight: poke.data?.weight,
            url: poke.data?.url
        }))
})

const pokemon = useVueTable({
    data: table_data,
    columns,
    getCoreRowModel: getCoreRowModel(),
})


function handleRowClick(row) {
    const name_cell = row.getVisibleCells()[1]
    window.location.href = (`/pokemon/${name_cell.getValue()}`)
}

</script>
