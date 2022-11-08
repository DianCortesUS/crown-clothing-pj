import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB4NDfwp8Yjn47vVr4BzNaZPbPcjXFupIE",
    authDomain: "crwn-clothing-db-82a8e.firebaseapp.com",
    projectId: "crwn-clothing-db-82a8e",
    storageBucket: "crwn-clothing-db-82a8e.appspot.com",
    messagingSenderId: "989908041803",
    appId: "1:989908041803:web:85812996151df7d1f24dce"
  };

  const app = initializeApp(firebaseConfig);

  const provider  = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)
  export const db = getFirestore()

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
    
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists())

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createAuthUserWithEmailAndPassword(auth, email, password)
  }