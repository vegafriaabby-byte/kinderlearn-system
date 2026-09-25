import {
  getPendingActivityAnswers,
  markActivityAsSynced
} from "./offlineDB";

import {
  submitActivityOnline
} from "../services/submissionService";

export async function syncPendingActivities() {

  if (!navigator.onLine) {
    return;
  }

  const pending =
    await getPendingActivityAnswers();

  if (pending.length === 0) {
    return;
  }

  console.log(
    `Found ${pending.length} pending activities.`
  );

  for (const item of pending) {

    try {

      await submitActivityOnline({
        studentId: item.studentId,
        activityId: item.activityId,
        answers: item.answers,
        score: item.score,
        totalItems: item.totalItems
      });

      await markActivityAsSynced(
        item.localId
      );

      console.log(
        `Activity ${item.activityId} synchronized.`
      );

    } catch (error) {

      console.error(
        "Synchronization failed:",
        error
      );

      break;
    }
  }
}