
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDownloadURL, getStorage,ref, StorageError, uploadBytes} from 'firebase/storage';
import { v4} from 'uuid';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA13-HvDsUw_VyF4XnUM7OsNhfN0TPN3fs",
  authDomain: "bucket-ecommerce.firebaseapp.com",
  projectId: "bucket-ecommerce",
  storageBucket: "bucket-ecommerce.appspot.com",
  messagingSenderId: "357866658399",
  appId: "1:357866658399:web:f32c7f2dec1df9eba359ea",
  measurementId: "G-T3BWBPEVPE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file) {
  const storageRef = ref(storage,v4());
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url
  
}
