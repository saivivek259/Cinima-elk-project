import { initializeApp } from 'firebase/app'

import { getAuth } from 'firebase/auth'

import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {

    apiKey: "AIzaSyCWtjm5s9Eov2O53mgI08B0mIaozaO4zvQ",

    authDomain: "fir-react-505a0.firebaseapp.com",

    projectId: "fir-react-505a0",

    storageBucket: "fir-react-505a0.appspot.com",

    messagingSenderId: "143692281564",

    appId: "1:143692281564:web:77f91c9f2679be5ba0a619"

  };


const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const db = getFirestore(app)
