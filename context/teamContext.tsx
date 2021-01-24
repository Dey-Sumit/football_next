// import axios from 'axios'
import {
   createContext,
   Dispatch,
   useContext,
   useEffect,
   useReducer,
} from 'react'
import { team } from '../types'
import { SET_MY_TEAM } from './actionTypes'

interface Action {
   type: string
   payload: any
}

interface State {
   team: undefined | team
}

const StateContext = createContext<State>({ team: null })

const DispatchContext = createContext(null)

const reducer = (state: State, { type, payload }: Action) => {
   switch (type) {
      case SET_MY_TEAM:
         return {
            ...state,
            team: payload,
         }

      default:
         throw new Error(`Unknown action type"${type}`)
   }
}

// from props de-structure the children
export const TeamProvider = ({ children }: { children: React.ReactNode }) => {
   const [state, defaultDispatch] = useReducer(reducer, { team: null })

   const dispatch = (type: string, payload?: any) =>
      defaultDispatch({ type, payload })
   return (
      <DispatchContext.Provider value={dispatch}>
         <StateContext.Provider value={state}>{children}</StateContext.Provider>
      </DispatchContext.Provider>
   )
}

// return dispatch function: ((type: string, payload?: any) => {})
export const useTeamDispatch = (): ((type: string, payload?: any) => {}) =>
   useContext(DispatchContext)
export const useTeamState = () => useContext(StateContext)
