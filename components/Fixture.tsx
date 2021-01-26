import { useRouter } from 'next/router'

const Fixture = ({
   fixture: { fixture_id, league, homeTeam, awayTeam, event_date, score },
}) => {
   const router = useRouter()

   const handleClick = () => router.push(`/fixtures/${fixture_id}`)
   const last = true
   return (
      <div
         key={fixture_id}
         className='flex p-3 m-3 border-2 border-gray-200 rounded-lg justify-evenly'
         onClick={handleClick}>
         <img
            src={league.logo}
            alt={league.name}
            className='object-contain logo-small'
         />
         <div className='flex items-center justify-evenly'>
            <img src={homeTeam.logo} alt='home' className='mr-2 logo-small' />{' '}
            vs
            <img src={awayTeam.logo} alt='away' className='ml-2 logo-small' />
         </div>
         <div>
            <p>{new Date(event_date).toDateString()}</p>
            <p>{score?.fulltime ? `score : ${score.fulltime}` : 'upcoming'}</p>
         </div>
      </div>
   )
}

export default Fixture
