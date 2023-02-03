export const useGame = defineStore('game', () => {
  let timer = ref(60)
  let score = ref(0)
  let playerLength = ref(0)
  let active = ref(false)
  function setGame(time: number, points: number, len: number, status: boolean) {
    timer.value = time
    score.value = points
    playerLength.value = len
    active.value = status
  }

  return { timer, score, playerLength, active, setGame }
})