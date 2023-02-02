<script setup lang="ts">
import { usePosition } from '~~/stores/usePosition'
import { useTeam } from '~~/stores/useTeam'

const client = useSupabaseClient<{id: string, created_at: string, scores: number}>()
const user = useSupabaseUser()
const teamStore = useTeam()
const positionStore = usePosition()
const board = reactive({ score: 0, timer: 60 })
function increment() {
  board.score++
  message.text = ''
}

const message = reactive({ text: '' })
let players: string[] = []
let startTimer = false

watch(
  () => message.text,
  async (newValue) => {
    if (!startTimer && newValue) {
      startTimer = true
      if(newValue === '') return
      await getValidPlayers()
      message.text = ''
      const countdown = setInterval(async () => {
        if (board.timer === 0) {
          startTimer = false
          message.text = ''
          board.timer = 60
          board.score = 0
          if (user.value) {
            console.log('user is in andcount is done')
            const { error } = await client.from('Scores').insert({id: user.value.id, scores: board.score})
            console.log(error)
          } else console.log('no user')
          clearInterval(countdown)
          return
        }
        board.timer--
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
  players = data!.map((player) => player.fullName)
}
</script>

<template>
  <Scoreboard
    :score="board.score"
    :timer="board.timer"
    :playerLength="players.length"
  />
  <input
    v-model="message.text"
    class="m-auto mt-2 mb-11 border-spacing-1 border-2 border-gray-500 bg-transparent p-4 text-3xl"
    :placeholder="`Type as many ${teamStore.team } ${ positionStore.position }s as you can in 60s`"
  />
  <button>Start</button>
</template>

<style>
input::placeholder {
  font-size: 14px;
}
</style>