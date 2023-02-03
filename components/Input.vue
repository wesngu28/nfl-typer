<script setup lang="ts">
import { useDropdown } from '~~/stores/useDropdown'
import { useGame } from '~~/stores/useGame';

const client = useSupabaseClient<{ id: string, created_at: string, scores: number }>()
const user = useSupabaseUser()
const dropdownStore = useDropdown()
const gameStore = useGame()
function increment() {
  gameStore.score = gameStore.score + 1
  enteredPlayers.push(message.text)
  message.text = ''
}

const message = reactive({ text: '' })
let players: { team: string, position: string, college: string, arr: string[] } = reactive({ team: dropdownStore.team, position: dropdownStore.position, college: dropdownStore.college, arr: [] })
let activeGame = ref(false)
let initialLoad = ref(true)
let enteredPlayers: string[] = []

function startGame() {
  gameStore.score = 0
  activeGame.value = true
  const countdown = setInterval(async () => {
    if (gameStore.timer === 0) {
      initialLoad.value = false
      message.text = ''
      gameStore.timer = 60
      const gameDescriptor = `${dropdownStore.team}${dropdownStore.position}${dropdownStore.college}`
      if (user.value) { await client.from('Scores').insert({ id: user.value.id, scores: gameStore.score, game_detail: gameDescriptor }) }
      clearInterval(countdown)
      activeGame.value = false
      enteredPlayers = []
      return
    }
    gameStore.timer--
  }, 1000)
}

let checkString = computed(() => players.arr.includes(message.text))
watch(() => checkString.value, (newValue) => { if (activeGame && newValue && !enteredPlayers.includes(message.text)) increment() })
watch(() => dropdownStore.team, (team) => { getValidPlayers() })
watch(() => dropdownStore.position, (pos) => { getValidPlayers() })
watch(() => dropdownStore.college, (college) => { getValidPlayers() })

async function getValidPlayers() {
  if (players.arr.length > 0 && players.team === dropdownStore.team && players.position === dropdownStore.position && players.college === dropdownStore.college) return
  const query = client.from('Player').select('fullName')
  if (dropdownStore.team !== 'NFL') query.eq('team', dropdownStore.team)
  if (dropdownStore.position !== 'Player') query.eq('position', dropdownStore.position)
  if (dropdownStore.college !== 'All') query.eq('college', dropdownStore.college)
  const { data } = await query
  players.team = dropdownStore.team
  players.position = dropdownStore.position
  players.college = dropdownStore.college
  players.arr = data!.map((player) => player.fullName)
  gameStore.playerLength = players.arr.length
}
</script>

<template>
  <div class="flex flex-col mb-11">
    <input @click="getValidPlayers" v-model="message.text"
      class="m-auto mt-2 mb-4 border-spacing-1 border-2 border-gray-500 bg-transparent p-4 text-3xl"
      :placeholder="`${dropdownStore.team} ${dropdownStore.position}s from ${dropdownStore.college} in 60s`" />
    <button :disabled="activeGame" @click="startGame" @mouseenter="getValidPlayers"
      class="rounded-md bg-gray-100 disabled:opacity-25 bg-opacity-20 px-4 py-2 m-auto text-white hover:bg-opacity-30">Start</button>
    <Paginate v-if="!activeGame && !initialLoad" :players="players.arr"/>
  </div>
</template>

<style>
input::placeholder {
  font-size: 14px;
}
</style>