import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth } from "../lib/firebase";

import { createUserIfNotExists } from "./users";

const provider = new GoogleAuthProvider();

export const loginGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    await createUserIfNotExists(result.user);

    return result.user;
  } catch (error) {
    console.error(error);
  }
};

export const logoutUser = async () => {
  await signOut(auth);
};