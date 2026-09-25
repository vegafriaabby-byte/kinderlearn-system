import {
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import {
  doc,
  getDoc
} from "firebase/firestore";

import { auth, db } from "../firebase/config";

export async function loginUser(email, password) {
  const result = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = result.user;

  const userRef = doc(db, "users", user.uid);

  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    throw new Error("User profile not found.");
  }

  return {
    uid: user.uid,
    ...userSnapshot.data()
  };
}

export async function logoutUser() {
  await signOut(auth);
}