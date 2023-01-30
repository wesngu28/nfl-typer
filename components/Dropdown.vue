<script setup lang="ts">
import { ref } from 'vue'
import { usePosition } from '~~/stores/usePosition';
import { useTeam } from '~~/stores/useTeam';

const teamStore = useTeam()
const positionStore = usePosition()
const dropdown = ref<HTMLDivElement | null>(null)

const props = defineProps<{
  default: string,
  selection: string[]
}>()

const message = reactive({ text: '' })

let qualified = computed(() => {
  if (message.text) {
    return props.selection
      .filter((name) => name.toLowerCase().includes(message.text.toLowerCase()) && name !== message.text)
      .map(selection => selection)
  }
})

function dropdownStyle() {
  dropdown.value?.classList.toggle('hidden')
}

</script>

<template>
  <div class="relative">
    <button @click="dropdownStyle"
      class="rounded-md bg-gray-600 bg-opacity-20 px-4 py-2 text-white hover:bg-opacity-30">{{ props.default }}</button>
    <div ref="dropdown" class="hidden absolute w-max text-black bg-white p-1 rounded-md right-0">
      <input v-model="message.text" class="hover:bg-slate-200 w-full p-2" :placeholder="'Enter a ' + [[props.default]]" />
      <p @click="() => {
        message.text = teampos
        if (props.default === 'Team') teamStore.setTeam(teampos)
        if (props.default === 'Position') positionStore.setPosition(teampos)
        dropdownStyle()
      }" v-for="teampos in qualified" class="my-2 hover:bg-slate-200 w-full p-2">{{ teampos }}</p>
    </div>
  </div>
</template>
