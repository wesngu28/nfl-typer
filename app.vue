<script setup lang="ts">

import Menubox from './components/MenuBox.vue'
import { store } from "./components/states"

const teams = [
  { id: 1, name: 'NFL' },
  { id: 2, name: 'Seattle Seahawks' },
  { id: 3, name: 'Arizona Cardinals' },
  { id: 4, name: 'Los Angeles Rams' },
  { id: 5, name: 'San Fransisco 49ers' },
  { id: 6, name: 'Chicago Bears' },
  { id: 7, name: 'Detroit Lions' },
]

const positions = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Quarterbacks' },
  { id: 3, name: 'Running Backs' },
  { id: 4, name: 'Wide Receivers' },
  { id: 5, name: 'Tackles' },
  { id: 6, name: 'Guards' },
  { id: 7, name: 'Centers' },
]

</script>

<template>
  <div class="flex flex-col items-center w-screen h-screen overflow-hidden bg-[#181818] text-white">
    <header class="flex flex-initial">Ok</header>
    <div class="flex flex-auto items-center justify-center flex-col">

      <div>
        <ul class="flex w-full justify-evenly">
          <!-- <button v-on:click="getRosters">Test</button> -->
          <Menubox :selection="teams" default="Teams"/>
          <Menubox :selection="positions" default="Positions"/>
        </ul>
        <p class="mt-11">Current Challenge: {{ store.team }} {{ store.position }}</p>
        <Input />
      </div>


    </div>
    <footer class="flex flex-initial">ok</footer>
  </div>
</template>
