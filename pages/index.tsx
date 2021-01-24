import Head from 'next/head'

import Team from '../components/Team'
import TeamsRow from '../components/TeamsRow'
import { useTeamState } from '../context/teamContext'

const teamsOfSpain = [
   {
      team_id: '541',
      name: 'Real Madrid',
      logo: 'https://media.api-sports.io/football/teams/541.png',
   },
   {
      team_id: '529',
      name: 'Barcelona',
      logo: 'https://media.api-sports.io/football/teams/529.png',
   },
   {
      team_id: '530',
      name: 'Atletico Madrid',
      logo: 'https://media.api-sports.io/football/teams/530.png',
   },
   {
      team_id: '535',
      name: 'Malaga FC',
      logo: 'https://media.api-sports.io/football/teams/535.png',
   },
]
const teamsOfEngland = [
   {
      team_id: '49',
      name: 'Chelsea',
      logo: 'https://media.api-sports.io/football/teams/49.png',
   },
   {
      team_id: '33',
      name: 'Manchester United',
      logo: 'https://media.api-sports.io/football/teams/33.png',
   },
   {
      team_id: '40',
      name: 'Liverpool',
      logo: 'https://media.api-sports.io/football/teams/40.png',
   },
   {
      team_id: '50',
      name: 'Man. City',
      logo: 'https://media.api-sports.io/football/teams/50.png',
   },
]
const otherTeams = [
   {
      team_id: '157',
      name: 'Bayern Munich',
      logo: 'https://media.api-sports.io/football/teams/157.png',
   },
   {
      team_id: '85',
      name: 'Paris Saint Germain',
      logo: 'https://media.api-sports.io/football/teams/85.png',
   },
   {
      team_id: '194',
      name: 'Ajax',
      logo: 'https://media.api-sports.io/football/teams/194.png',
   },
   {
      team_id: '157',
      name: 'Bayern Munich',
      logo: 'https://media.api-sports.io/football/teams/157.png',
   },
]

export default function Home() {
   const { team } = useTeamState()

   return (
      <>
         <Head>
            <title>Football App</title>
            <link rel='icon' href='/favicon.ico' />
         </Head>
         <>
            <div className='grid gap-4 p-3 md:grid-cols-8'>
               <div className='col-span-5'>
                  <TeamsRow country='Spain' teams={teamsOfSpain} />
                  <TeamsRow country='England' teams={teamsOfEngland} />
                  <TeamsRow country='Others' teams={otherTeams} />
               </div>
               <div className='col-span-3 '>
                  <h1 className='my-3 text-2xl font-bold text-center text-green'>
                     My Team
                  </h1>
                  {team ? (
                     <Team team={team} showName={false} largeLogo />
                  ) : (
                     'Choose a team'
                  )}
               </div>
            </div>
            <button className='block w-8/12 p-4 mx-auto my-4 text-2xl font-semibold text-white rounded-full focus:outline-none bg-gradient-to-r from-green to-blue-500'>
               {team ? 'Great!Continue...' : 'Choose Your Team 🚀'}
            </button>
         </>
      </>
   )
}
