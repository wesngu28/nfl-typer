<script setup lang="ts">
const props = defineProps<{ players: string[]; entered: string[] }>()
const perPage = 10
const currentPage = ref(0)

const sortedPlayers = computed(() => {
  const got = props.players.filter(player => props.entered.includes(player));
  const notgot = props.players.filter(player => !props.entered.includes(player));
  return got.concat(notgot);
});

const sliceIdx = computed(() => [
  currentPage.value * perPage,
  currentPage.value * perPage + perPage,
])

const paginator = reactive({
  array: sortedPlayers.value.slice(sliceIdx.value[0], sliceIdx.value[1]),
})
watch(
  () => currentPage.value,
  () => {
    paginator.array = sortedPlayers.value.slice(sliceIdx.value[0], sliceIdx.value[1])
  }
)

function back() {
  if (currentPage.value > 0) currentPage.value--
  else currentPage.value = Math.floor(sortedPlayers.value.length / perPage)
}
function next() {
  if (currentPage.value < Math.floor(sortedPlayers.value.length / perPage))
    currentPage.value++
  else currentPage.value = 0
}
</script>

<template>
  <div class="mt-11 w-48">
    <div class="h-60">
      <p class="text-center" v-for="player in paginator.array" :key="player">
        <span class="text-green-400" v-if="props.entered.includes(player)">
          {{ player }}</span
        >
        <span class="text-red-400" v-else>{{ player }}</span>
      </p>
    </div>
    <div class="mt-4 flex justify-between">
      <button
        class="rounded-lg bg-gray-600 bg-opacity-20 p-2 hover:bg-opacity-30"
        v-if="sortedPlayers.length > 0"
        @click="back()"
      >
        <p class="font-semibold">Prev</p>
      </button>
      <button
        class="rounded-lg bg-gray-600 bg-opacity-20 p-2 hover:bg-opacity-30"
        v-if="sortedPlayers.length > 0"
        @click="next()"
      >
        Next
      </button>
    </div>
  </div>
</template>
