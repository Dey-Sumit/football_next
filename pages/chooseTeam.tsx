import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { route } from 'next/dist/next-server/server/router'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Search from '../components/Search'

import Team from '../components/Team'
import TeamsRow from '../components/TeamsRow'
// import { db } from '../config/firebaseClient'
import { UPDATE_PROFILE } from '../context/actionTypes'
import { useAuth } from '../context/authContext'
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
]

export default function ChooseTeam() {
   const { team } = useTeamState()
   const { user, loading, updateProfile } = useAuth()
   const router = useRouter()
   //TODO use loading
   if (user?.team) router.push('/')

   const handleClick = () => {
      updateProfile(team)
      router.push('/')
   }

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
                     <h4 className='my-6 text-xl font-medium text-center text-green'>
                        Choose a team
                     </h4>
                  )}
                  <Search title='Search Team' />
               </div>
            </div>
            <button
               className='block w-8/12 p-4 mx-auto my-4 text-2xl font-semibold text-white rounded-full focus:outline-none bg-gradient-to-r from-green to-blue-500'
               onClick={() => handleClick()}>
               {team ? 'Great!Continue...' : 'Choose Your Team 🚀'}
            </button>
         </>
      </>
   )
}

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
   //check if the user has a team or not
   // check if the user is authenticated

   return {
      props: {
         a: 'a',
      },
   }
}
