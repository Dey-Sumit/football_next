import { FunctionComponent } from 'react'
import { team } from '../types'
import Team from './Team'

const TeamsRow: FunctionComponent<{ country: string; teams: team[] }> = ({
   country,
   teams,
}) => {
   return (
      <div>
         <h4 className='my-4 text-2xl font-semibold text-center text-green'>
            {country}
         </h4>
         <div className='grid px-5 gap-7 lg:grid-cols-4 sm:grid-cols-2'>
            {teams.map(team => (
               <Team key={team.team_id} team={team} />
            ))}
         </div>
      </div>
   )
}
export default TeamsRow
