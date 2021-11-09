import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
}

//initializing the firebase
firebase.initializeApp(config)

//initializing the firestore(database), authentication
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }
