<template>
    <div>Pokemon ID: {{ id }}</div>
</template>

<script setup>
import { usePageContext } from "vike-vue/usePageContext";
const pageContext = usePageContext()
console.log(pageContext);
const id = pageContext.routeParams.id
</script>
