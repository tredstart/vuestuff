<script setup>
import { usePostsQuery } from './data.ts';

const { data, isLoading, isError, error } = usePostsQuery();
</script>

<template>
  <div>
    <h1>Posts</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="isError">Error: {{ error.message }}</div>
    <ul v-else>
      <li v-for="post in data" :key="post.id">{{ post.title }}</li>
    </ul>
  </div>
</template>
