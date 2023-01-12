<script setup lang="ts">
const state = reactive({ count: 0 })
const timer = reactive({ count: 60 })

function increment() {
  state.count++
  message.text = ''
}

const message = reactive({
  text: '',
})

let formattedTime = computed(() => {
  let minutes = Math.floor(timer.count / 60)
  let seconds = timer.count % 60
  return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
})

let startTimer = computed(() => message.text)
let checkString = computed(() => message.text.toLowerCase() === 'mike evans')

watch(() => checkString.value, (newValue) => {
  if(newValue) {
    increment()
    let interval = setInterval(() => {
      if (timer.count === 0) {
        clearInterval(interval)
        return
      }
      timer.count--
    }, 1000)
  }
})

watch(() => startTimer.value, () => {
  if(startTimer) {
    let interval = setInterval(() => {
      if (timer.count === 0) {
        clearInterval(interval)
        return
      }
      timer.count--
    }, 1000)
  }
})
</script>

<template>
  <input v-model="message.text"
    class="mt-2 text-3xl m-auto border-gray-500 p-4 border-spacing-1 border-2 bg-transparent" placeholder="Tom Brady"
    :disabled="checkString">
  <ul class="mt-11 flex w-full justify-around items-center">
    <div>
      <p>Time Left</p>
      <li class="mx-4">{{ formattedTime }}</li>
    </div>
    <li class="mx-4">{{ state.count }}</li>
  </ul>
</template>