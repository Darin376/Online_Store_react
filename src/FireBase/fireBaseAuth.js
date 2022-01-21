import { 
    GoogleAuthProvider,
    getAuth,
    signInWithPopup
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./fireBaseConfig"

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