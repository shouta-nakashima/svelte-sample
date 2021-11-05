import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import Cookies from 'js-cookie'
import {userId} from '../store'

export const LoginWithGoogle = ()=> {
  const auth = getAuth();
  const provider = new GoogleAuthProvider()

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      userId.set(result.user.uid)
      Cookies.set('uid',result.user.uid)
      document.location.reload()
      // ...
    }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

export const logout = () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    Cookies.remove('uid')
    document.location.reload()
  }).catch((error) => {
    // An error happened.
    alert('ログアウト出来ません')
  });

}