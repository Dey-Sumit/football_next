import { useRouter } from 'next/router'
import Search from '../components/Search'
import firebase from 'firebase/app'
import { useAuth } from '../context/authContext'
const Settings = () => {
   const { push } = useRouter()
   const { signOut } = useAuth()

   const handleLogOut = async () => {
      await signOut()
      push('/auth')
   }

   const handleSaveChanges = () => {}

   return (
      <div className='flex flex-col items-center p-10 space-y-6 font-serif text-white'>
         <h4 className='text-3xl font-bold tracking-wide'>
            System & Settings{' '}
         </h4>

         <p className='text-xl '>Logged in as sumax333@gmail.com</p>
         <img
            src='https://media.api-sports.io/football/teams/547.png'
            alt=''
            className=' logo-medium'
         />
         <div className='w-3/4'>
            <Search title='Change Team' />
         </div>

         <p className='text-xl'>API Requests 69 </p>

         <div className='space-x-4'>
            <button
               onClick={handleSaveChanges}
               className='px-4 py-2 text-lg border-2 rounded-lg border-green focus:outline-none'>
               Save Changes
            </button>
            <button
               onClick={handleLogOut}
               className='px-4 py-2 text-lg text-red-500 border-2 border-red-500 rounded-lg focus:outline-none'>
               Log Out
            </button>
         </div>
      </div>
   )
}
export default Settings
