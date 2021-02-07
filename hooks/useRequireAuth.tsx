import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../context/authContext'
export const useRequireAuth = () => {
   const auth = useAuth()
   const router = useRouter()
   useEffect(() => {
      console.log(auth)

      if (!auth.user && !auth.loading) {
         router.push('/auth')
      }
   }, [auth, router])

   return auth
}
