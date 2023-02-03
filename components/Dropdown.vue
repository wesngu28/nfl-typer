<script setup lang="ts">
import { ref } from 'vue'
import { useDropdown } from '~~/stores/useDropdown'

const dropdownStore = useDropdown()
const dropdown = ref<HTMLDivElement | null>(null)

const props = defineProps<{
  default: string
  selection: string[]
}>()

console.log(props.selection)

const message = reactive({ text: '' })

let qualified = computed(() => {
  if (message.text) {
    return props.selection
      .filter(
        (name) =>
          name.toLowerCase().includes(message.text.toLowerCase())
      )
      .map((selection) => selection)
  } else {
    return props.selection
  }
})

function toggle() {
  let hide = false
  if (dropdown.value?.classList.contains('hidden')) hide = true
  const dropdowns = document.querySelectorAll('.dropdown')
  dropdowns.forEach(dropdown => dropdown.classList.add('hidden'))
  if (hide) dropdown.value?.classList.remove('hidden')
}

const innerDropdown = (str: string) => {
  message.text = str
  if (props.default === 'Team') dropdownStore.setTeam(str)
  if (props.default === 'Position') dropdownStore.setPosition(str)
  if (props.default === 'College') dropdownStore.setCollege(str)
  toggle()
}
</script>

<template>
  <div class="relative">
    <button @click="toggle"
      class="rounded-md bg-gray-600 bg-opacity-20 px-4 py-2 text-white hover:bg-opacity-30">
      {{ props.default }}
    </button>
    <div ref="dropdown" class="dropdown absolute hidden right-0 w-max rounded-md bg-white p-1 text-black">
      <input v-model="message.text" class="w-full p-2 hover:bg-slate-200"
        :placeholder="'Enter a ' + [[props.default]]" />
      <p @click="innerDropdown(teampos)" v-for="teampos in qualified" :key="teampos" class="my-2 w-full p-2 hover:bg-slate-200">
        {{ teampos }}
      </p>
    </div>
  </div>
</template>
