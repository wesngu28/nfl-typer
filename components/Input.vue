<script setup lang="ts">
import { supabase } from '../utils/supabase'
import { store } from "./states"

const state = reactive({ count: 0 })
const timer = reactive({ count: 60 })

function increment() {
  state.count++
  message.text = ''
}

const message = reactive({
  text: '',
})

let players: string[] = []

let formattedTime = computed(() => {
  let minutes = Math.floor(timer.count / 60)
  let seconds = timer.count % 60
  return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
})

let startTimer = false

watch(() => message.text, async (newValue) => {
  if (!startTimer && newValue) {
    startTimer = true
    const query = supabase.from('Player').select('fullName')
    if (store.team !== 'NFL') {
      query.eq('team', store.team)
    }
    if (store.position !== 'Players') {
      query.eq('position', store.position)
    }
    const { data } = await query
    players.push(...data!.map(player => player.fullName))
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
})
let checkString = computed(() => players.includes(message.text))
watch(() => checkString.value, (newValue) => {
  if (newValue) {
    increment()
  }
})
</script>

<template>
  <input v-model="message.text"
    class="mt-2 text-3xl m-auto border-gray-500 p-4 border-spacing-1 border-2 bg-transparent" placeholder="Tom Brady">
  <ul class="mt-11 flex w-full justify-around items-center">
    <div>
      <p>Time Left</p>
      <li class="mx-4">{{ formattedTime }}</li>
    </div>
    <li class="mx-4">{{ state.count }}</li>
  </ul>
</template>