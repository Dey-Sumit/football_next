import { BiUserCircle } from 'react-icons/bi'
import { IoMdLock } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'

export default function Login() {
   return (
      <div className='mt-8'>
         <form className='flex flex-col space-y-2'>
            <div className='relative flex items-center py-1 '>
               <MdEmail
                  className='absolute mr-2 text-white'
                  size={20}
                  style={{ left: '0.5rem' }}
               />

               <input
                  type='email'
                  placeholder='Email'
                  className='w-full px-8 py-2 text-white bg-transparent border-2 border-gray-500 rounded-lg focus:outline-none focus:border-green'
               />
            </div>

            <div className='relative flex items-center py-1 '>
               <IoMdLock
                  className='absolute mr-2 text-white'
                  size={20}
                  style={{ left: '0.5rem' }}
               />

               <input
                  type='password'
                  placeholder='Password'
                  className='w-full px-8 py-2 text-white bg-transparent border-2 border-gray-500 rounded-lg focus:outline-none focus:border-green'
               />
            </div>

            {/* //TODO make separate class for input ; it's repetitive */}
            {/* //TODO border-green on focus on input; better UI/UX */}

            <button
               type='submit'
               className='p-2 text-base font-medium text-white rounded-lg bg-green'>
               Login
            </button>
         </form>

         {/* line */}
         <p className='my-4 text-center border-t-2 leading-1 '>
            <span className='px-3 text-lg bg-dark text-green'>
               or continue with
            </span>
         </p>

         <button
            className='w-full p-2 text-base font-medium text-white bg-gray-600 rounded-lg'
            onClick={() => {}}>
            Google
         </button>
      </div>
   )
}
