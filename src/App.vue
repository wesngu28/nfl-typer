<script setup lang="ts">

import { getRosters } from '../utils/dbFiller';
import Menubox from './components/MenuBox.vue'
import { store } from "./stores/counter"

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
  <div class="flex flex-col items-center w-screen h-screen overflow-hidden">
    <header class="flex flex-initial">Ok</header>
    <div class="flex flex-auto items-center justify-center flex-col">

      <div>
        <ul class="flex w-full justify-evenly">
          <!-- <button v-on:click="getRosters">Test</button> -->
          <Menubox :selection="teams" default="Teams"/>
          <Menubox :selection="positions" default="Positions"/>
        </ul>
        <p class="mt-11">Current Challenge: {{ store.team }} {{ store.position }}</p>
        <input class="mt-2 text-3xl m-auto border-gray-500 p-4 border-spacing-1 border-2 bg-transparent"
          placeholder="Tom Brady">
        <ul class="mt-11 flex w-full justify-around">
          <li class="mx-4">60s</li>
          <li class="mx-4">0</li>
        </ul>
      </div>


    </div>
    <footer class="flex flex-initial">ok</footer>
  </div>
</template>