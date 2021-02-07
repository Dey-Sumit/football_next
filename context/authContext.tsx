import {
   createContext,
   useContext,
   useEffect,
   useReducer,
   useState,
} from 'react'

import firebase from 'firebase/app'
import 'firebase/auth'

import { db, auth } from '../config/firebaseClient'

interface IUser {
   uid: string
   email: string
   username: string
   team: null
}

interface IContext {
   user: IUser
   loading: boolean
   isAuthenticated: boolean
   signUp: Function
   signIn: Function
   signOut: Function
   updateProfile: Function
   error: {} | null
}

const AuthContext = createContext<IContext | null>(null)

const useAuthProvider = () => {
   // get user from local storage
   const [user, setUser] = useState(null) // change to profile
   const [isAuthenticated, setIsAuthenticated] = useState(false)
   const [loading, setLoading] = useState(true)
   //TODO handle error
   const [error, setError] = useState(null)

   const signIn = async ({ email, password }) => {
      try {
         setLoading(true)
         const res = await auth.signInWithEmailAndPassword(email, password)
         setIsAuthenticated(true)
         await getUserAdditionalData(res)
         setLoading(false)
         return res.user
      } catch (error) {
         console.log({ error: error.message })
         throw error.message
      }
   }
   const signOut = () => {
      setUser(null)
      setIsAuthenticated(false)
      return auth.signOut()
   }

   const createProfile = async (user: IUser) => {
      try {
         setUser(user)
         return await db.collection('profiles').doc(user.uid).set(user)
      } catch (error) {
         console.log({ error })
         return { error }
      }
   }
   const signUp = async ({ username, email, password }) => {
      try {
         const res = await auth.createUserWithEmailAndPassword(email, password)
         setIsAuthenticated(true)
         return createProfile({
            uid: res.user.uid,
            email,
            username,
            team: null,
         })
      } catch (error) {
         console.log({ error })
         return { error }
      }
   }

   const getUserAdditionalData = async (uid: string) => {
      try {
         setLoading(true)
         const res = await db.collection('profiles').doc(uid).get()
         if (res.data()) setUser(res.data())
         setLoading(false)
      } catch (error) {
         setLoading(false)
         console.log({ error })
         throw error.message
      }
   }
   const handleAuthStateChanged = (user: firebase.User) => {
      if (user) {
         setIsAuthenticated(true)
         try {
            getUserAdditionalData(user.uid)
         } catch (error) {
            throw error.message
         }
      } else {
         setIsAuthenticated(false)
      }
      setLoading(false)
   }
   //change any
   const updateProfile = async (team: any) => {
      try {
         await db.collection('profiles').doc(user.uid).update({
            team,
         })
         setUser({ ...user, team })
         // const doc = await db.collection('profiles').doc(user.uid).get()
         // console.log(doc.data())

         // dispatch(UPDATE_PROFILE, doc.data())
      } catch (error) {
         console.error(error)
      }
   }
   useEffect(() => {
      const unSub = auth.onAuthStateChanged(handleAuthStateChanged)

      return () => unSub()
   }, [])

   //subscribe to changes on document
   useEffect(() => {
      if (isAuthenticated) {
         // Subscribe to user document on mount
         const unsubscribe = db
            .collection('profiles')
            .doc(user.uid)
            .onSnapshot(doc => setUser(doc.data()))
         return () => unsubscribe()
      }
   }, [])

   return {
      user,
      loading,
      isAuthenticated,
      error,
      signUp,
      signOut,
      signIn,
      updateProfile,
   }
}

// interface State {
//    uid: string
//    team: any
//    email: string
// }
// interface Action {
//    type: string
//    payload: any
// }

// const reducer = (state: State, { type, payload }: Action) => {
//    switch (type) {
//       case UPDATE_PROFILE:
//          return {
//             ...state,
//             team: payload,
//          }
//       case AUTH_SUCCESS:
//          return {
//             ...state,
//             ...payload,
//          }

//       default:
//          throw new Error(`Unknown action type"${type}`)
//    }
// }
// const AuthDispatchContext = createContext(null)

// from props de-structure the children

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const auth = useAuthProvider()

   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

//TODO FIX ALL ANY
export const useAuth = () => {
   return useContext(AuthContext)
}
// export const useAuthDispatch: any = () => {
//    return useContext(AuthDispatchContext)
// }
