import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { MdEmail, MdLock } from 'react-icons/md'
// import { useAuthDispatch, useAuthState } from '../context/authContext'
import Input from './Input'
// import { AUTH_SUCCESS } from '../context/authReducer'
// import { auth } from '../config/firebase'
import { useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import { useAuth } from '../context/authContext'
import 'firebase/auth'
import firebase from 'firebase/app'
// import firebaseClient from '../config/firebaseClient'

export default function Login() {
   const { signIn } = useAuth()

   // firebaseClient() // ?needed ?  :( check it

   const { push } = useRouter()

   const [loading, setLoading] = useState(false)

   const { register, errors, handleSubmit } = useForm({
      mode: 'onBlur',
   })
   // !send to an action creator

   //TODO solve type any!
   const handleClick = async (data: any) => {
      try {
         setLoading(true)
         await signIn(data)
         push('/')
      } catch (error) {
         alert(error.message)
         console.log({ error })
      } finally {
         setLoading(false)
      }
   }

   return (
      <div className='mt-8'>
         <form
            className='flex flex-col space-y-2'
            onSubmit={handleSubmit(handleClick)}>
            <Input
               register={register({
                  required: { value: true, message: 'Email is Required' },
                  pattern: {
                     value: /\S+@\S+\.\S+/,
                     message: 'Email is not valid',
                  },
               })}
               Icon={MdEmail}
               type='email'
               name='email'
               placeholder='Email'
               error={errors.email}
            />
            <Input
               register={register({
                  required: { value: true, message: 'Password is Required' },
                  minLength: {
                     value: 6,
                     message: 'Password Length must be at least 6',
                  },
               })}
               Icon={MdLock}
               name='password'
               placeholder='Password'
               type='password'
               error={errors.password}
            />

            {!loading ? (
               <button
                  type='submit'
                  className='p-2 text-base font-medium text-white rounded-lg bg-green'>
                  Login
               </button>
            ) : (
               <button
                  type='submit'
                  className='flex items-center justify-center p-2 text-base font-medium text-white rounded-lg bg-green'>
                  <BiLoaderAlt className='mr-2 animate-spin' /> Processing
               </button>
            )}
         </form>

         {/*//TODO line */}
         <p className='my-4 text-center text-gray-400'>or continue with</p>

         <button
            className='w-full p-2 text-base font-medium text-white bg-gray-600 rounded-lg'
            onClick={() => {}}>
            Google
         </button>
      </div>
   )
}
