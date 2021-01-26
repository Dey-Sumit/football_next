import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
// import 'firebase/storage'

export const firebaseConfig = {
   apiKey: 'AIzaSyDNHGALaZu1rIxt4tF7n5V6QdjKN0RNJhU',
   authDomain: 'hey-goal.firebaseapp.com',
   projectId: 'hey-goal',
   storageBucket: 'hey-goal.appspot.com',
   messagingSenderId: '651781531463',
   appId: '1:651781531463:web:38618c4181d9d6bf9b0e62',
}

if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig)
}

const app = firebase.app()
const db = firebase.firestore()
const auth = firebase.auth()
const now = firebase.firestore.Timestamp.now()

export { auth, db, now }
console.log(app.name ? 'Firebase Activated' : 'Firebase is not working')
