import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCGcYvJa8yaj5l-roUSdhjIogNy2QlQLoU",
  authDomain: "rn-uber-eats-clone-578d6.firebaseapp.com",
  projectId: "rn-uber-eats-clone-578d6",
  storageBucket: "rn-uber-eats-clone-578d6.appspot.com",
  messagingSenderId: "84796175387",
  appId: "1:84796175387:web:7bb9327282d386a438b4be"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

export default firebase;