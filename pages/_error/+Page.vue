<template>
  <h1>{{ heading }}</h1>
  <p>{{ message }}</p>
</template>

<script setup lang="ts">
const props = defineProps<{
  pageContext?: {
    is404?: boolean
    abortReason?: string
  }
}>()

const heading = props.pageContext?.is404
  ? "404 Page Not Found"
  : "500 Internal Server Error";

const message =
  props.pageContext?.abortReason ||
  (props.pageContext?.is404
    ? 'This page could not be found.'
    : 'Something went wrong.')
</script>

<script lang="ts">
export default {
  isError: true,
}
</script>
