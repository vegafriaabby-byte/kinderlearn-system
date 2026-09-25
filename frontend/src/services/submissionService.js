import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/config";

export async function submitActivityOnline(data) {

  const submission = {

    studentId: data.studentId,

    activityId: data.activityId,

    answers: data.answers,

    score: data.score,

    totalItems: data.totalItems,

    submittedAt: serverTimestamp(),

    submissionMethod: "online"

  };

  const result = await addDoc(
    collection(db, "submissions"),
    submission
  );

  return result.id;
}