<script setup lang="ts">
import { useDropdown } from '~~/stores/useDropdown'

const user = useSupabaseUser()
const dropdownStore = useDropdown()

const client = useSupabaseClient<{
  id: string
  p_id: number
  created_at: string
  scores: number
  game_detail: string
}>()
let players: { team: string; position: string; college: string } = reactive({
  team: dropdownStore.team,
  position: dropdownStore.position,
  college: dropdownStore.college,
})
const { data: scores, refresh: refreshScores } = await useAsyncData(
  'scores',
  async () => {
    const { data } = await client
      .from('Scores')
      .select('scores')
      .eq('id', user.value!.id)
      .eq('game_detail', `${players.team}${players.position}${players.college}`)
    if (data && data[0]) {
      const dataIter: number[] = data!.map((d) => d.scores)
      const latest = dataIter[dataIter.length - 1]
      const highest = dataIter.sort((a, b) => b - a)[0]
      const average =
        dataIter!.reduce((acc, curr) => acc + curr, 0) / dataIter.length
      return { latest: latest, highest: highest, average: average }
    }
    let msg = 'N/A'
    return { latest: msg, highest: msg, average: msg }
  }
)

const new_insert = client
  .channel('public:Scores')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'Scores' },
    () => {
      refreshScores()
    }
  )
  .subscribe()
onUnmounted(() => client.removeChannel(new_insert))
</script>

<template>
  <p class="mb-2 text-center font-semibold">
    {{ players.team }} {{ players.position }}s from {{ players.college }}
  </p>
  <p v-if="!user">Login to see historical data</p>
  <div class="flex justify-between">
    <p v-if="scores">Last Score with this Combination: {{ scores.latest }}</p>
  </div>
  <div class="flex justify-between">
    <p v-if="scores">
      Average Score with this Combination: {{ scores.average }}
    </p>
  </div>
  <div class="flex justify-between">
    <p v-if="scores">High Score with this Combination: {{ scores.highest }}</p>
  </div>
</template>
