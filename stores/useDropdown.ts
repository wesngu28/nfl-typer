export const useDropdown = defineStore('position', () => {
  let position = ref('Player')
  let team = ref('NFL')
  let college = ref('All')
  function setTeam(teamName: string) {
    team.value = teamName
  }
  function setPosition(positionName: string) {
    position.value = positionName
  }
  function setCollege(collegeName: string) {
    college.value = collegeName
  }
  return { position, team, college, setTeam, setPosition, setCollege }
})
