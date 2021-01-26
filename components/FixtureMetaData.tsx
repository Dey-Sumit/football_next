const FixtureMetaData = ({
   fixtureDetails: {
      league,
      venue,
      event_date,
      homeTeam,
      goalsHomeTeam,
      awayTeam,
      goalsAwayTeam,
   },
}) => {
   return (
      <div className='p-2 '>
         <div className='flex items-center justify-between mb-2'>
            <img src={league?.logo} alt='' className='logo-small' />
            <p>{venue}</p>
            <p>{new Date(event_date).toDateString()}</p>
         </div>

         <div className='flex items-center justify-between '>
            <img
               src={homeTeam?.logo}
               alt=''
               className='p-2 bg-gray-900 rounded-md logo-medium'
            />
            <div className='mx-2'>
               {goalsHomeTeam} - {goalsAwayTeam}
            </div>
            <img
               src={awayTeam?.logo}
               alt=''
               className='p-2 bg-gray-900 rounded-md logo-medium'
            />
         </div>
      </div>
   )
}

export default FixtureMetaData
