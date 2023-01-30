export const usePosition = defineStore('position', () => {
  let position = ref('Players')
  function setPosition(positionName: string) {
    position.value = positionName
  }

  return { position, setPosition }
})
