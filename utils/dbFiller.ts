import { createClient } from '@supabase/supabase-js'
import { writeFileSync } from 'fs'

// ran 1/26/2023, may need to run again at end of season if that matters
// using supabase for now but there is a chance i switch to local
export async function getRosters(): Promise<void> {
  // const supabase = createClient('https://qapykcdprhrersuvogia.supabase.co', '')
  for (let i = 33; i <= 34; i++) {
    const teamRes = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${i}/roster`
    )
    const teamJson: ESPNResponse = await teamRes.json()
    // const players: Player[] = []
    for (let j = 0; j <= 2; j++) {
      for (const player of teamJson.athletes[j].items) {
        const athlete: Player = {
          firstName: player.firstName,
          lastName: player.lastName,
          fullName: player.fullName,
          state: player.birthPlace.state,
          college: player.college?.name,
          collegeShort: player.college?.shortName,
          city: player.birthPlace.city,
          country: player.birthPlace.country,
          debutYear: player.debutYear,
          team: teamJson.team.displayName,
          role: teamJson.athletes[j].position,
          position: player.position.name,
          image: player.headshot?.href,
        }
        // players.push(athlete)
        const { error } = await supabase
          .from('Player')
          .upsert({ ...athlete }, { ignoreDuplicates: true })
      }
    }
    // writeFileSync("players.json", JSON.stringify(players))
  }
  return
}

getRosters()

export interface Player {
  firstName: string
  lastName: string
  fullName: string
  state?: string
  college?: string
  collegeShort?: string
  city?: string
  country?: string
  debutYear?: number
  team: string
  role: string
  position: string
  image: string
}

interface ESPNResponse {
  [key: string]: any
  athletes: Athlete[]
  team: any
}

interface Team {
  [key: string]: any
  displayName: string
}

interface Athlete {
  position: string
  items: Item[]
}

interface Item {
  firstName: string
  lastName: string
  fullName: string
  birthPlace: BirthPlace
  college?: College
  position: Position
  debutYear?: number
  [key: string]: any
}

interface Position {
  name: string
  [key: string]: any
}

interface College {
  name: string
  shortName: string
  [key: string]: any
}

interface BirthPlace {
  city?: string
  state?: string
  country?: string
}
