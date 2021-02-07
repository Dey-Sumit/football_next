import { GetServerSidePropsContext } from 'next'
import { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import { auth } from '../config/firebase'
export default function Auth() {
   const [isLogin, setIsLogin] = useState(true)
   //TODO font-serif globally | search better font
   return (
      <div className='h-screen p-2 font-serif md:px-12 md:py-20 xl:px-40 xl:py-24'>
         <div className='grid h-full gap-3 overflow-hidden border-2 rounded-lg lg:border-yellow-700 xl:border-yellow-100 md:grid-cols-8'>
            <div className='hidden p-4 md:col-span-5 gradientImage md:block'>
               <h4 className='my-2 text-2xl font-bold text-white'>
                  Oh My Goal
               </h4>
               <h1 className='my-2 text-3xl font-extrabold text-white'>
                  Lorem ipsum dolor
                  <br /> sit amet consectetur.
               </h1>
            </div>

            <div className='px-6 pt-6 md:col-span-3'>
               <h2 className='my-2 text-xl font-semibold text-white'>
                  Join Over 2 Millions Fans around the globe on Oh My Goal
               </h2>
               <p className='my-2 text-gray-400'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Rerum consequatur similique, facere nulla tempore nesciunt
               </p>
               {!isLogin ? <Login /> : <Register />}
               {!isLogin ? (
                  <p className='my-3 text-center text-white'>
                     Already a member?{' '}
                     <span
                        className='cursor-pointer text-green'
                        onClick={() => setIsLogin(isLogin => !isLogin)}>
                        Login
                     </span>
                  </p>
               ) : (
                  <p className='my-3 text-center text-white'>
                     Don't have an account yet?{' '}
                     <span
                        className='cursor-pointer text-green'
                        onClick={() => setIsLogin(isLogin => !isLogin)}>
                        Register
                     </span>
                  </p>
               )}
            </div>
         </div>
      </div>
   )
}

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
   auth.onAuthStateChanged(user => {
      if (user) {
         console.log(user)
         console.log('Logged in')
      } else {
         console.log(user)
         console.log('not logged in')
      }
   })

   return {
      props: {
         a: 'a',
      },
   }
}
