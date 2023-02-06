<script setup lang="ts">
import teams from '../assets/data/teams.json'
import positions from '../assets/data/positions.json'
import colleges from '../assets/data/colleges.json'
import { useGame } from '~~/stores/useGame'

const times = ['1 minute', '5 minutes', '10 minutes']
const gameStore = useGame()
</script>

<template>
  <div class="flex flex-auto flex-col items-center justify-center">
    <img class="mb-12 mt-4" src="NFL.png" width="150" height="150" />
    <div>
      <div v-if="!gameStore.postGame">
        <Scoreboard />
        <ul class="mb-11 flex w-full justify-evenly">
          <Dropdown default="Time" :selection="times" />
          <Dropdown default="Team" :selection="teams" />
          <Dropdown default="Position" :selection="positions" />
          <Dropdown default="College" :selection="colleges" />
        </ul>
        <Input />
      </div>
      <div class="flex flex-col items-center" v-if="gameStore.postGame">
        <button @click="() => { gameStore.postGame = false }"
          class="mb-8 rounded-md bg-gray-600 bg-opacity-20 px-4 py-2 text-white hover:bg-opacity-30"
        >
          New Game
        </button>
        <History />
        <Paginate :players="gameStore.players" :entered="gameStore.entered" />
      </div>
    </div>
  </div>
</template>
