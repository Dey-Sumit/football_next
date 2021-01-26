import {
   createContext,
   useContext,
   useEffect,
   useReducer,
   useState,
} from 'react'
import { auth, auth as firebaseAuth, db } from '../config/firebase'
// import authReducer, { AUTH_SUCCESS } from './authReducer'

const useAuthProvider = () => {
   // get user from local storage
   const [user, setUser] = useState(null)
   const [loading, setLoading] = useState(true)
   const signIn = async ({ email, password }) => {
      try {
         setLoading(true)
         const res = await firebaseAuth.signInWithEmailAndPassword(
            email,
            password
         )
         setUser(res.user)
         await getUserAdditionalData(res)
         setLoading(false)
         return res.user
      } catch (error) {
         console.log({ error: error.message })
         throw error.message
      }
   }
   const signOut = async () => {
      await auth.signOut()
      setUser(null)
   }
   const createUser = async (user: any) => {
      try {
         await db.collection('users').doc(user.uid).set(user)
         setUser(user)
      } catch (error) {
         console.log(error)
      }
   }
   const signUp = async ({ username, email, password }) => {
      try {
         const res = await auth.createUserWithEmailAndPassword(email, password)
         // return the user(response)

         await createUser({ uid: res.user.uid, email, username })

         return res
      } catch (error) {
         console.log(error)
      }
   }

   const getUserAdditionalData = async (user: any) => {
      try {
         setLoading(true)
         const res = await db.collection('users').doc(user.uid).get()
         setUser(res.data())
         setLoading(false)
      } catch (error) {
         console.log({ error })

         throw error.message
      }
   }

   return { user, loading, signUp, signOut, signIn, getUserAdditionalData }
}

const AuthContext = createContext({ user: {} })
// const AuthDispatchContext = createContext(null)

// from props de-structure the children
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   //    const auth = useAuthProvider()

   // const [auth, defaultDispatch] = useReducer(authReducer, { user: {} })

   // const dispatch = (type: string, payload?: any) =>
   //    defaultDispatch({ type, payload })

   const auth = useAuthProvider()

   const handleAuthStateChanged = async (user: any) => {
      if (user) {
         try {
            await auth.getUserAdditionalData(user)

            // dispatch(AUTH_SUCCESS, res)
         } catch (error) {
            console.log({ error: error.message })
         }
      }
   }

   useEffect(() => {
      const unSub = firebaseAuth.onAuthStateChanged(handleAuthStateChanged)

      return () => unSub()
   }, [])

   return (
      // <AuthDispatchContext.Provider value={dispatch}>
      <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
      // </AuthDispatchContext.Provider>
   )
}

//TODO FIX ALL ANY
export const useAuth: any = () => {
   return useContext(AuthContext)
}
// export const useAuthDispatch: any = () => {
//    return useContext(AuthDispatchContext)
// }
