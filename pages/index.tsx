import { GetServerSideProps } from 'next'
import FixtureDetails from '../components/FixtureDetails'
import Fixtures from '../components/Fixtures'
import { useAuth } from '../context/authContext'

const index = () => {
   const { user, loading, signOut } = useAuth()
   console.log(loading)

   return (
      <div className='text-white'>
         {!loading
            ? user
               ? `You are logged in as ${user?.email}`
               : 'Not logged in'
            : 'loading...'}
         <button onClick={() => signOut()}>SignOut</button>
         <>
            <div className='md:px-40'>
               <div className='grid gap-8 p-4 md:grid-cols-12'>
                  <div className='md:col-span-5 '>
                     <h5 className='text-center'>Fixtures</h5>
                     <Fixtures />
                  </div>
                  <div className='md:col-span-7 '>
                     <h5 className='text-center'>Last Match Details</h5>
                     <FixtureDetails />
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

export default index
