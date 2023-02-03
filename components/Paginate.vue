<script setup lang="ts">
const props = defineProps<{players: string[]}>()

const perPage = 10
const currentPage = ref(0)
const sliceIdx = computed(() =>
  [currentPage.value * perPage, currentPage.value * perPage + perPage]
)
const paginator = reactive({array: props.players.slice(sliceIdx.value[0], sliceIdx.value[1])})
watch(() => currentPage.value, () => {
  paginator.array = props.players.slice(sliceIdx.value[0], sliceIdx.value[1])
})

function back() {
  if (currentPage.value > 0) currentPage.value--
}
function next() {
  if (currentPage.value < props.players.length/perPage) currentPage.value++
}
</script>

<template>
  <div class="mt-11">
    <p v-if="props.players.length > 0" @click="back()">back</p>
    <p class="text-center" v-for="player in paginator.array" :key="player"> {{  player  }}</p>
    <p v-if="props.players.length > 0" @click="next()">next</p>
  </div>
</template>