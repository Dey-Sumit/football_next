import { GetServerSideProps } from 'next'
import { useEffect } from 'react'
import FixtureDetails from '../components/FixtureDetails'
import Fixtures from '../components/Fixtures'
import { useAuth } from '../context/authContext'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { auth as firebaseAuth } from '../config/firebaseClient'

const index = () => {
   const { user } = useRequireAuth()

   if (!user) return null

   return (
      <div className='text-white'>
         {`You are logged in as ${user?.email}`}
         <>
            <div className='md:px-40'>
               <div className='grid gap-8 p-4 md:grid-cols-12'>
                  <div className='md:col-span-5 '>
                     <h5 className='text-center'>Fixtures</h5>
                     {/* <Fixtures /> */}
                  </div>
                  <div className='md:col-span-7 '>
                     <h5 className='text-center'>Last Match Details</h5>
                     {/* <FixtureDetails /> */}
                  </div>
               </div>
            </div>
            {/* <Navbar /> */}
         </>
      </div>
   )
}

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//    const user = useAuth()
//    console.log({ user })

//    if (!user) {
//       res.writeHead(307, { Location: '/auth' })
//    }
//    return {
//       props: {},
//    }
// }

//! on auth state change does not work in server side

export default index
