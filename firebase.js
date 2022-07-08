
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";


const firebaseConfig = {
  apiKey: "AIzaSyCIEwNIM1M4htz9_ZfiE5P36g4FvhkkVtw",
  authDomain: "viste-y-rueda-shop.firebaseapp.com",
  projectId: "viste-y-rueda-shop",
  storageBucket: "viste-y-rueda-shop.appspot.com",
  messagingSenderId: "13342229448",
  appId: "1:13342229448:web:c8adc229d0d5e47cb7f6fd",
  measurementId: "G-0NYQZZ900V"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const uploadFile = async (file) => {
  const storageRef = firebase.storage().ref().child(`images/${file.name}`)
  await storageRef.put(file)
  return storageRef
}

const getImgUrl = async (path) => {
  if (!path) {
    path = 'images/placeholder-min.jpg'
  }
  return await firebase.storage().ref(path).getDownloadURL()
}

export {
  uploadFile,
  getImgUrl
}