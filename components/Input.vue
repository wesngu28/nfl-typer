<script setup lang="ts">
import { usePosition } from '~~/stores/usePosition'
import { useTeam } from '~~/stores/useTeam'

const client = useSupabaseClient()
const teamStore = useTeam()
const positionStore = usePosition()
const state = reactive({ count: 0 })
const timer = reactive({ count: 60 })
function increment() {
  state.count++
  message.text = ''
}

const message = reactive({ text: '' })

let players: string[] = []

let formattedTime = computed(() => {
  let minutes = Math.floor(timer.count / 60)
  let seconds = timer.count % 60
  return `${minutes < 10 ? '0' + minutes : minutes}:${
    seconds < 10 ? '0' + seconds : seconds
  }`
})

let startTimer = false

watch(
  () => message.text,
  async (newValue) => {
    if (!startTimer && newValue) {
      startTimer = true
      await getValidPlayers()
      message.text = ''
      setInterval(() => {
        if (timer.count === 0) {
          startTimer = false
          message.text = ''
          timer.count = 60
          return
        }
        timer.count--
      }, 1000)
    }
  }
)
let checkString = computed(() => players.includes(message.text))
watch(
  () => checkString.value,
  (newValue) => {
    if (newValue) {
      increment()
    }
  }
)

async function getValidPlayers() {
  const query = client.from('Player').select('fullName')
  if (teamStore.team !== 'NFL') {
    query.eq('team', teamStore.team)
  }
  if (positionStore.position !== 'Player') {
    query.eq('position', positionStore.position)
  }
  const { data } = await query
  players.push(...data!.map((player) => player.fullName))
}
</script>

<template>
  <ul class="mb-4 flex w-full items-center justify-around">
    <div class="text-center">
      <p class="text-sm">Time Left</p>
      <li class="mx-4 text-2xl font-bold">{{ formattedTime }}</li>
    </div>
    <div class="text-center">
      <p class="text-sm">Score</p>
      <li class="mx-4 text-2xl font-bold">
        {{ state.count }} {{ players.length > 0 ? `/ ${players.length}` : null }}
      </li>
    </div>
  </ul>
  <input
    v-model="message.text"
    class="m-auto mt-2 mb-11 border-spacing-1 border-2 border-gray-500 bg-transparent p-4 text-3xl"
    :placeholder="`Type as many ${teamStore.team } ${ positionStore.position }s as you can in 60s`"
  />
</template>

<style>
input::placeholder {
  font-size: 14px;
}
</style>