<template>
    <template v-if="!pokemon">
        <div>Loading...</div>
    </template>
    <template v-else>
        <v-container class="pokedex-frame">
            <v-card elevation="10" rounded="lg" class="pa-4">
                <v-img :src="pokemon.sprite" height="150" />
                <v-card-title>{{ pokemon.name }}</v-card-title>
                <v-card-subtitle>#{{ pokemon.id }}</v-card-subtitle>
                <v-card-text>
                    <div>
                        <p><strong>Weight:</strong> {{ pokemon.weight }} kg</p>
                        <p><strong>Height:</strong> {{ pokemon.height }} m</p>
                    </div>
                    <div>
                        <strong>Abilities:</strong>
                        <v-chip v-for="ability in pokemon.abilities" :key="ability" small class="ma-1"
                            color="blue lighten-2">
                            {{ ability.ability.name }}
                        </v-chip>
                    </div>
                    <div>
                        <strong>Types:</strong>
                        <v-chip v-for="type in pokemon.types" :key="type" small class="ma-1" color="grey lighten-1">
                            {{ type.type.name }}
                        </v-chip>
                    </div>
                    <div>
                        <strong>Stats:</strong>
                        <v-row>
                            <v-col cols="6" v-for="stat in pokemon.stats" :key="stat.stat.name">
                                <v-chip class="ma-1" small>
                                    {{ stat.stat.name }}: {{ stat.base_stat }}
                                </v-chip>
                            </v-col>
                        </v-row>
                    </div>
                </v-card-text>
            </v-card>
        </v-container>
    </template>
    <VueQueryDevtools />
</template>

<script setup lang="ts">
const props = defineProps<{
    pageContext: {
        routeParams: {
            name: string
        }
    }
}>();

const name = props.pageContext?.routeParams?.name;

import { onServerPrefetch } from 'vue'
import { useQuery, useQueries } from '@tanstack/vue-query'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';

const { data: pokemon } = useQuery({
    queryKey: ['pokemon_name', name],
    queryFn: async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemon_data = await response.json();
        return pokemon_data;
    },
    select: (poke) => {
        return {
            id: poke.id,
            abilities: poke.abilities,
            height: poke.height,
            weight: poke.weight,
            name: poke.name,
            sprite: poke.sprites.front_default,
            types: poke.types,
            stats: poke.stats,
        };
    },
});

</script>
