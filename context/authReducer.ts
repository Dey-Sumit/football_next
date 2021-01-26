export const AUTH_SUCCESS = 'AUTH_SUCCESS'

//FIX any
export default (state: any, { type, payload }) => {
   switch (type) {
      case AUTH_SUCCESS:
         return { ...state, user: payload }

      default:
         return state
   }
}
