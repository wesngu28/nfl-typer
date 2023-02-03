<script setup lang="ts">
import teams from "../assets/data/teams.json"
import positions from "../assets/data/positions.json"
import colleges from "../assets/data/colleges.json"
</script>

<template>
  <div class="flex flex-auto flex-col items-center justify-center">
    <img class="mb-12 mt-4" src="NFL.png" width="150" height="150" />
    <div>
      <Scoreboard />
      <ul class="flex w-full justify-evenly mb-11">
          <Dropdown default="Team" :selection="teams" />
          <Dropdown default="Position" :selection="positions" />
          <Dropdown default="College" :selection="colleges" />
      </ul>
      <Input />
      <History />
    </div>
  </div>
</template>