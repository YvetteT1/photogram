// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.apiKey,
//   authDomain: process.env.apiauthDomain,
//   projectId: process.env.apiprojectId,
//   storageBucket: process.env.apistorageBucket,
//   messagingSenderId: process.env.apimessagingSenderId,
//   appId: process.env.apiappId,
// };

const firebaseConfig = {
  apiKey: "AIzaSyChDwj7XR6VcEIOy6OQtsfklbBNtxuhlMg",
  authDomain: "photogram-79511.firebaseapp.com",
  projectId: "photogram-79511",
  storageBucket: "photogram-79511.appspot.com",
  messagingSenderId: "47783200611",
  appId: "1:47783200611:web:5fc693b6db25bb0400f556",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/** 대부분의 값을 저장하는 DB */
export const firestore = getFirestore(app);
/** 이미지만을 저장하기 위한 저장소 */
export const storage = getStorage(app);
/** 로그인을 관리하기 위한 도구 */
export const auth = getAuth(app);