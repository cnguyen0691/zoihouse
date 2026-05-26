import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export const createUserIfNotExists = async (user) => {
  const userRef = doc(db, "users", user.uid);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      role: "user",
      createdAt: new Date(),
    });
  }
};