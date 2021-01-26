import { FunctionComponent } from 'react'
import useSWR from 'swr'
//TODO add on click on this head to head : redirect to fixture
const H2HMatch = ({
   match: { event_date, homeTeam, awayTeam, league, score },
}) => {
   return (
      <div className='my-2 border-2 border-gray-500 '>
         <div className='flex items-center justify-between p-2 bg-gray-500'>
            <span>{league.name}</span>
            <span>{new Date(event_date).toDateString()}</span>
         </div>
         <div className='flex items-center justify-around p-2'>
            <div className='flex items-center space-x-2'>
               <img
                  src={homeTeam.logo}
                  alt={homeTeam.team_name}
                  className='object-contain logo-small '
               />
               <span>{homeTeam.team_name}</span>
            </div>
            <span className='mx-3 text-lg'>
               {score.fulltime ? score.fulltime : 'upcoming'}
            </span>
            <div className='flex items-center space-x-2'>
               <span>{awayTeam.team_name}</span>
               <img
                  src={awayTeam.logo}
                  alt={awayTeam.team_name}
                  className='object-contain logo-small '
               />
            </div>
         </div>
      </div>
   )
}

const HeadToHead: FunctionComponent<{
   homeTeamId: Number
   awayTeamId: Number
}> = ({ homeTeamId, awayTeamId }) => {
   // const headToHead = useSelector(state => state.apiData.headToHead)
   // const dispatch = useDispatch()

   const { data } = useSWR(`fixtures/h2h/${homeTeamId}/${awayTeamId}`, {
      dedupingInterval: 2000000,
   })
   const headToHead = data?.api?.fixtures

   return headToHead ? (
      <div className='w-11/12 mx-auto my-1 text-white'>
         {headToHead.slice(Math.max(headToHead.length - 5, 1)).map(match => (
            <H2HMatch key={match.fixture_id} match={match} />
         ))}
      </div>
   ) : (
      <h1> loading....</h1>
   )
}

export default HeadToHead
