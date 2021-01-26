import loadConfig from 'next/dist/next-server/server/config'
import useSWR from 'swr'
import FixtureMetaData from './FixtureMetaData'
import Stats from './Stats'

const FixtureDetails = () => {
   const fixture_id = 215662
   const { data } = useSWR(`fixtures/id/${fixture_id}`, {
      dedupingInterval: 2000,
   })
   const fixtureDetails = data?.api?.fixtures[0]
   console.log({ fixtureDetails })

   return fixtureDetails ? (
      <div className='rounded-lg boxShadow'>
         <FixtureMetaData fixtureDetails={fixtureDetails} />
         {fixtureDetails?.statistics && (
            <Stats stats={fixtureDetails.statistics} />
         )}
      </div>
   ) : (
      <h1>Loading...</h1>
   )
}

export default FixtureDetails
