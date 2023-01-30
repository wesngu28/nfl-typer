export const useTeam = defineStore('team', () => {
  let team = ref('NFL')
  function setTeam(teamName: string) {
    team.value = teamName
  }

  return { team, setTeam }
})
