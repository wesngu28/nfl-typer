<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
  <div v-if="user?.id" class="mt-11">
    <p>Last Score with this Combination: </p>
    <p>Average Score with this Combination: </p>
    <p>High Score with this Combination: </p>
  </div>
</template>