import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/config";

export async function getActivities() {
  const snapshot = await getDocs(collection(db, "activities"));

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data()
  }));
}

export async function getActivity(activityId) {
  const activityRef = doc(db, "activities", activityId);

  const snapshot = await getDoc(activityRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data()
  };
}

export async function createActivity(activityData) {
  const activityRef = await addDoc(
    collection(db, "activities"),
    {
      ...activityData,
      createdAt: serverTimestamp()
    }
  );

  return activityRef.id;
}