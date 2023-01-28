<script setup lang="ts">

import { store } from "./components/states"

const teams2 = ['NFL', 'Seattle Seahawks', 'Arizona Cardinals', 'Los Angeles Rams', 'San Fransisco 49ers', 'Chicago Bears', 'Detroit Lions']
const positions2 = ['All', 'Quarterback', 'Running Back', 'Wide Receiver', 'Offensive Tackle']

</script>

<template>
  <div class="flex flex-col items-center w-screen h-screen overflow-hidden bg-[#181818] text-white">
    <header class="flex flex-initial">Ok</header>
    <div class="flex flex-auto items-center justify-center flex-col">
      <div>
        <ul class="flex w-full justify-evenly">
          <Dropdown default="Team" :selection="teams2" />
          <Dropdown default="Position" :selection="positions2" />
        </ul>
        <p class="mt-11">Current Challenge: {{ store.team }} {{ store.position }}</p>
        <Input />
      </div>
    </div>
    <footer class="flex flex-initial">ok</footer>
  </div>
</template>
