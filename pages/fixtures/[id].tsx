import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import FixtureMetaData from '../../components/FixtureMetaData'
import HeadToHead from '../../components/HeadToHead'
import Prediction from '../../components/Prediction'
import Stats from '../../components/Stats'
// import { useParams } from 'react-router-dom';
// import HeadToHead from '../../components/headtoHead/Head2Head';

// import LineUps from '../../components/lineUps/LineUps';
// import Prediction from '../../components/prediction/Prediction';
// import Stats from '../../components/stats/Stats';
// import './fixtureDetails.scss'

// import { useDispatch, useSelector } from 'react-redux'
// import { get_fixture_details } from '../../redux/actions/team.action'
// import FixtureMetaData from '../../components/fixtureMetaData/FixtureMetaData';
// import SkeletonCard from '../../components/skeletons/SkeletonCard';
// import Navbar from '../../components/navbar/Navbar';
// 605107

const FixtureDetails = () => {
   const router = useRouter()
   const id = router.query.id

   const { data } = useSWR(`fixtures/id/${id}`, {
      dedupingInterval: 2000000,
   })
   //    const data: any = {}
   console.log(data)
   const fixtureDetails = data?.api?.fixtures[0]

   const [activeComponent, setActiveComponent] = useState('h2h')

   return (
      <div className='pt-8 md:px-48'>
         <div className='py-8 mb-5 md:px-44 boxShadow'>
            {fixtureDetails && (
               <FixtureMetaData fixtureDetails={fixtureDetails} />
            )}
            {/* nested navbar */}
            <div className='flex justify-around p-2 my-1 text-white bg-gray-700 rounded-md'>
               <div
                  className={
                     activeComponent === 'h2h'
                        ? 'text-green active'
                        : 'cursor-pointer '
                  }
                  onClick={() => setActiveComponent('h2h')}>
                  h2h
               </div>
               {fixtureDetails?.statusShort === 'NS' ||
               fixtureDetails?.statusShort === 'TBD' ? (
                  <div
                     className={
                        activeComponent === 'prediction'
                           ? 'cursor-pointer text-green active'
                           : 'cursor-pointer '
                     }
                     onClick={() => setActiveComponent('prediction')}>
                     Prediction
                  </div>
               ) : (
                  <>
                     <div
                        className={
                           activeComponent === 'stats'
                              ? 'cursor-pointer text-green active'
                              : 'cursor-pointer '
                        }
                        onClick={() => setActiveComponent('stats')}>
                        Stats
                     </div>
                     <div
                        className={
                           activeComponent === 'lineups'
                              ? 'cursor-pointer text-green active'
                              : 'cursor-pointer text-green'
                        }
                        onClick={() => setActiveComponent('lineups')}>
                        Lineups
                     </div>
                  </>
               )}
            </div>

            {activeComponent === 'h2h' && (
               <HeadToHead
                  homeTeamId={fixtureDetails?.homeTeam?.team_id}
                  awayTeamId={fixtureDetails?.awayTeam?.team_id}
               />
            )}
            {activeComponent === 'prediction' && <Prediction fixture_id={id} />}

            {activeComponent === 'stats' && (
               <Stats stats={fixtureDetails.statistics} />
            )}
            {/* {activeComponent === 'lineups' && <LineUps />} */}
         </div>
      </div>
   )
}
export default FixtureDetails
