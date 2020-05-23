import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCV9TPQkpavrblyO7wwLUJBMdnJj1hE8C8",
  authDomain: "weathercast-1a7d9.firebaseapp.com",
  databaseURL: "https://weathercast-1a7d9.firebaseio.com",
  projectId: "weathercast-1a7d9",
  storageBucket: "weathercast-1a7d9.appspot.com",
  messagingSenderId: "329108222113",
  appId: "1:329108222113:web:324c324fb0499082b1c0e0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
