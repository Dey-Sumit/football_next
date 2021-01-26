import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiLoaderAlt, BiUserCircle } from 'react-icons/bi'
import { MdEmail, MdLock } from 'react-icons/md'
import { auth, db } from '../config/firebase'
import { AUTH_SUCCESS } from '../context/authReducer'
import Input from './Input'

export default function Register() {
   const { register, errors, handleSubmit } = useForm({
      mode: 'onBlur',
   })
   const [loading, setLoading] = useState(false)
   // const dispatch = useAuthDispatch()

   const router = useRouter()
   //TODO solve type any!
   const handleClick = async (data: any) => {
      try {
         setLoading(true)
         await signUp(data)
         router.push('/')
      } catch (error) {
         console.log({ error })
      } finally {
         setLoading(false)
      }
   }

   const createUser = async (user: any) => {
      try {
         console.log(user)

         await db.collection('users').doc(user.uid).set(user)
      } catch (error) {
         console.log({ error })
         throw error.message
      }
   }

   const signUp = async ({ username, email, password }) => {
      try {
         const res = await auth.createUserWithEmailAndPassword(email, password)
         // return the user(response)

         await createUser({ uid: res.user.uid, email, username })
         console.log(res.user)

         // dispatch(AUTH_SUCCESS, res.user)
      } catch (error) {
         console.log({ error })
         throw error.message
      }
   }
   return (
      <div className='mt-5'>
         <form
            className='flex flex-col gap-y-1'
            onSubmit={handleSubmit(handleClick)}>
            <Input
               register={register({
                  required: { value: true, message: 'Username is Required' },
               })}
               Icon={BiUserCircle}
               type='text'
               placeholder='Username'
               name='username'
               error={errors.username}
            />
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
                  Register
               </button>
            ) : (
               <button
                  type='submit'
                  className='flex items-center justify-center p-2 text-base font-medium text-white rounded-lg bg-green'>
                  <BiLoaderAlt className='mr-2 animate-spin' /> Processing
               </button>
            )}
         </form>
         {/* line */}
         <p className='my-4 text-center text-gray-400'>or continue with</p>

         <button
            className='w-full p-2 text-base font-medium text-white bg-gray-600 rounded-lg'
            onClick={() => {}}>
            Google
         </button>
      </div>
   )
}

{
   /* 
            <div>
               <div className='relative flex items-center py-1 '>
                  <MdEmail
                     className='absolute mr-2 text-white'
                     size={20}
                     style={{ left: '0.5rem' }}
                  />

                  <input
                     ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })}
                     className='w-full px-8 py-2 text-white bg-transparent border-2 border-gray-500 rounded-lg focus:outline-none focus:border-green'
                  />
               </div>
               {errors.email && errors.email.type === 'required' && (
                  <span className='text-red-600'>Email is required</span>
               )}
               {errors.email?.type === 'pattern' && (
                  <span className='text-red-600'>Enter a valid email</span>
               )}
            </div> */
}
