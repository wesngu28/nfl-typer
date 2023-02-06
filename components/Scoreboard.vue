<script setup lang="ts">
import { useDropdown } from '~~/stores/useDropdown'
import { useGame } from '~~/stores/useGame'

const gameStore = useGame()
const dropdownStore = useDropdown()
let formattedTime = computed(() => {
  let minutes = Math.floor(gameStore.timer / 60)
  let seconds = gameStore.timer % 60
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
        {{ gameStore.score }}
        {{
          gameStore.playerLength > 0
            ? `/ ${gameStore.playerLength}`
            : dropdownStore.college !== 'All' &&
              dropdownStore.position !== 'Player' &&
              dropdownStore.team !== 'NFL'
            ? '/ 0 '
            : '/ 2512 '
        }}
      </li>
    </div>
  </ul>
</template>
