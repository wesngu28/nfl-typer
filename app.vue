<script setup lang="ts">
import { usePosition } from './stores/usePosition';
import { useTeam } from './stores/useTeam';

const teamStore = useTeam()
const positionStore = usePosition()
const teams2 = ['NFL', 'Seattle Seahawks', 'Arizona Cardinals', 'Los Angeles Rams', 'San Fransisco 49ers', 'Chicago Bears', 'Detroit Lions']
const positions2 = ['All', 'Quarterback', 'Running Back', 'Wide Receiver', 'Offensive Tackle']

</script>

<template>
  <div class="flex flex-col items-center w-screen h-screen overflow-hidden bg-[#181818] text-white">
    <Navbar />
    <div class="flex flex-auto items-center justify-center flex-col">
      <p class="mt-11 mb-12 text-2xl">Name as many {{ teamStore.team }} {{ positionStore.position }} as you can in 60 seconds</p>
      <div>
        <ul class="flex w-full justify-evenly">
          <Dropdown default="Team" :selection="teams2" />
          <Dropdown default="Position" :selection="positions2" />
        </ul>
        <Input />
      </div>
    </div>
    <Foot />
  </div>
</template>