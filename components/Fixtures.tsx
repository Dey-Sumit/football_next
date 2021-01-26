import useSWR from 'swr'
import Fixture from './Fixture'

const Fixtures = () => {
   const { data: lastFixturesData } = useSWR(`/fixtures/team/${547}/last/3`, {
      dedupingInterval: 2000,
   })
   const { data: nextFixturesData } = useSWR(`/fixtures/team/${547}/next/5`, {
      dedupingInterval: 2000,
   })
   const nextFixtures = nextFixturesData?.api?.fixtures
   const lastFixtures = lastFixturesData?.api?.fixtures

   console.log({ nextFixtures, lastFixtures })

   return (
      <>
         {lastFixtures
            ? [...lastFixtures]
                 .reverse()
                 .map(fixture => (
                    <Fixture key={fixture.fixture_id} fixture={fixture} />
                 ))
            : ''}
         {nextFixtures
            ? nextFixtures.map(fixture => (
                 <Fixture key={fixture.fixture_id} fixture={fixture} />
              ))
            : ''}
      </>
   )
}

export default Fixtures
