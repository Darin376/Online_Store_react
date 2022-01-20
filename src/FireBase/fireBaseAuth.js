import { 
    GoogleAuthProvider,
    getAuth,
    signInWithPopup
} from "firebase/auth";
import { initializeApp } from "firebase/app";
 export const firebaseConfig = {
  apiKey: "AIzaSyAml3mGu2gBEU0hHRSYq75e755Y_VXJ6cc",
  authDomain: "shop-a636c.firebaseapp.com",
  projectId: "shop-a636c",
  storageBucket: "shop-a636c.appspot.com",
  messagingSenderId: "607649131995",
  appId: "1:607649131995:web:c312644238b40ae6314bfe",
  measurementId: "G-7B2KF7PVDM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const provider = new GoogleAuthProvider();

export const  signIn = async () => {
    return signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        return user;
    }).catch((error) => {
        throw error;
    });
}
// import { 
//     GoogleAuthProvider,
//     getAuth,
//     signInWithPopup
// } from "firebase/auth";
// import {app} from './FireBaseConfig';


// const provider = new GoogleAuthProvider();
// export const auth = getAuth();


// export const signIn = () => {
//     return signInWithPopup(auth, provider)
//     .then((result) => {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         // The signed-in user info.
//         const user = result.user;
//         return user;
//     }).catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         throw error;
//     });
// }