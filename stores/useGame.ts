export const useGame = defineStore('game', () => {
  let timer = ref(60)
  let score = ref(0)
  let playerLength = ref(0)
  let active = ref(false)
  let postGame = ref(false)
  let players = ref([] as string[])
  let entered = ref([] as string[])

  return { timer, score, playerLength, active, postGame, players, entered }
})
