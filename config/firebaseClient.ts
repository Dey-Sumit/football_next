import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
   apiKey: 'AIzaSyDNHGALaZu1rIxt4tF7n5V6QdjKN0RNJhU',
   authDomain: 'hey-goal.firebaseapp.com',
   projectId: 'hey-goal',
   databaseURL: 'https://hey-goal-default-rtdb.firebaseio.com',
   storageBucket: 'hey-goal.appspot.com',
   messagingSenderId: '651781531463',
   appId: '1:651781531463:web:38618c4181d9d6bf9b0e62',
}
// export default function firebaseClient() {
//    console.log('form client', firebase.apps.length)

// }
if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig)
}

const app = firebase.app()
const db = firebase.firestore()
const auth = firebase.auth()
const now = firebase.firestore.Timestamp.now()

export { auth, db, now }
console.log(app.name ? 'Firebase Activated' : 'Firebase is not working')
