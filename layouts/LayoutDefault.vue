<template>
    <v-app>
        <v-main>
            <div class="layout">
                <Content>
                    <slot />
                </Content>
            </div>
        </v-main>
    </v-app>
    <VueQueryDevtools />
</template>

<script lang="ts" setup>
import Content from "../components/Content.vue";
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
</script>

<style>
body {
    margin: 0;
    font-family: sans-serif;
}

* {
    box-sizing: border-box;
}

a {
    text-decoration: none;
}
</style>

<style scoped>
.layout {
    display: flex;
}

.content {
    padding: 20px;
    padding-bottom: 50px;
    min-height: 100vh;
    flex-grow: 1;
}

/* Page Transition Animation */
#page-content {
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
}

body.page-is-transitioning #page-content {
    opacity: 0;
}
</style>
