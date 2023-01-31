export const usePosition = defineStore('position', () => {
  let position = ref('Player')
  function setPosition(positionName: string) {
    position.value = positionName
  }

  return { position, setPosition }
})
