import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, provider } from "../firebase";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google: ", error.message);
    throw new Error(error.message);
  }
};

export const reloadUser = async () => {
  if (auth.currentUser) {
    await auth.currentUser.reload();
    return auth.currentUser;
  }
  return null;
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out: ", error.message);
    throw new Error(error.message);
  }
};

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
