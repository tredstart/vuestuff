<template>
    <div>Pokemon ID: {{ id }}</div>
</template>

<script setup lang="ts">
const props = defineProps<{
    pageContext: {
        routeParams: {
            id: string
        }
    }
}>();

const id = props.pageContext?.routeParams?.id;
</script>
