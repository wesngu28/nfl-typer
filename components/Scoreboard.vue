<script setup lang="ts">
const props = defineProps<{
  timer: number
  score: number,
  playerLength: number
}>()

let formattedTime = computed(() => {
  let minutes = Math.floor(props.timer / 60)
  let seconds = props.timer % 60
  return `${minutes < 10 ? '0' + minutes : minutes}:${
    seconds < 10 ? '0' + seconds : seconds
  }`
})
</script>

<template>
  <ul class="mb-4 flex w-full items-center justify-around">
    <div class="text-center">
      <p class="text-sm">Time Left</p>
      <li class="mx-4 text-2xl font-bold">{{ formattedTime }}</li>
    </div>
    <div class="text-center">
      <p class="text-sm">Score</p>
      <li class="mx-4 text-2xl font-bold">
        {{ props.score }} {{ props.playerLength > 0 ? `/ ${props.playerLength}` : null }}
      </li>
    </div>
  </ul>
</template>
