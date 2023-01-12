export async function getRosters(): Promise<void> {
  for (let i = 1; i <= 1; i++) {
    const teamRes = await fetch(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${i}/roster`)
    const teamJson: ESPNResponse = await teamRes.json()
    const teamRoster: Player[] = []
    // for (let player = 0; player <= 2; player++)
    //   teamJson.athletes[player].items.forEach(player => {
    //     const athlete: Player = {
    //       firstName: player.firstName,
    //       lastName: player.lastName,
    //       fullName: player.firstName,
    //       state: player.birthPlace.state,
    //       college: player.college?.name,
    //       collegeShort: player.college?.shortName,
    //       city: player.birthPlace.city,
    //       country: player.birthPlace.country,
    //       debutYear: player.debutYear,
    //       team: teamJson.team.displayName,
    //       position: player.position.name,
    //       image: player.headshot?.href
    //     }
    //     console.log(athlete)
    //   });
  }
}

getRosters()

interface Player {
  firstName: string;
  lastName: string;
  fullName: string;
  state?: string;
  college?: string;
  collegeShort?: string;
  city?: string;
  country?: string;
  debutYear?: number;
  team: Team;
  position: string;
}

interface ESPNResponse {
  [key:string]: any
  athletes: Athlete[];
  team: any;
}

interface Team {
  [key:string]: any
  displayName: string
}

interface Athlete {
  position: string;
  items: Item[];
}

interface Item {
  firstName: string;
  lastName: string;
  fullName: string;
  birthPlace: BirthPlace;
  college?: College;
  position: Position;
  debutYear?: number;
  [key:string]: any
}

interface Position {
  name: string;
  [key:string]: any
}

interface College {
  name: string;
  shortName: string;
  [key:string]: any
}

interface BirthPlace {
  city?: string;
  state?: string;
  country?: string;
}