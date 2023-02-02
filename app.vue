<script setup lang="ts">
import { usePosition } from './stores/usePosition'
import { useTeam } from './stores/useTeam'

const teamStore = useTeam()
const positionStore = usePosition()
const teams2 = [
  'NFL',
  'Seattle Seahawks',
  'Arizona Cardinals',
  'Los Angeles Rams',
  'San Fransisco 49ers',
  'Chicago Bears',
  'Detroit Lions',
]
const positions2 = [
  'All',
  'Quarterback',
  'Running Back',
  'Wide Receiver',
  'Offensive Tackle',
]
</script>

<template>
  <div
    class="flex h-screen w-screen flex-col items-center overflow-hidden bg-[#181818] text-white"
  >
    <Navbar />
    <div class="flex flex-auto flex-col items-center justify-center">
      <img class="mb-12 mt-4" src="NFL.svg" width="150" height="150" />
      <div>
        <Input />
        <ul class="flex w-full justify-evenly">
          <Dropdown default="Team" :selection="teams2" />
          <Dropdown default="Position" :selection="positions2" />
        </ul>
      </div>
    </div>
    <Foot />
  </div>
</template>
