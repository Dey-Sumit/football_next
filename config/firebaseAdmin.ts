import admin from 'firebase-admin'
import * as serviceAccount from '../secrets.fbAdmin.json'
// const service=require('../secrets.fbAdmin.json')
console.log({ serviceAccount })

export const verifyIdToken = token => {
   // check if the admin is not initialized
   if (!admin.apps.length) {
      admin.initializeApp({
         credential: admin.credential.cert(serviceAccount),
         databaseURL: 'https://hey-goal-default-rtdb.firebaseio.com',
      })
   }
   return admin
      .auth()
      .verifyIdToken(token)
      .catch(error => {
         throw error
      })
}
