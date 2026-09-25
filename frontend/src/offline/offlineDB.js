import { openDB } from "idb";

const DB_NAME = "kinderlearn-offline";
const DB_VERSION = 1;

export async function getOfflineDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {

      if (!db.objectStoreNames.contains("activityAnswers")) {

        const store = db.createObjectStore(
          "activityAnswers",
          {
            keyPath: "localId",
            autoIncrement: true
          }
        );

        store.createIndex(
          "syncStatus",
          "syncStatus"
        );

        store.createIndex(
          "studentId",
          "studentId"
        );

        store.createIndex(
          "activityId",
          "activityId"
        );
      }

    }
  });
}

export async function saveOfflineActivityAnswer(data) {

  const db = await getOfflineDB();

  await db.add("activityAnswers", {
    ...data,

    syncStatus: "pending",

    savedAt: new Date().toISOString()
  });

}

export async function getPendingActivityAnswers() {

  const db = await getOfflineDB();

  const transaction = db.transaction(
    "activityAnswers",
    "readonly"
  );

  const store = transaction.objectStore(
    "activityAnswers"
  );

  const index = store.index("syncStatus");

  return index.getAll("pending");
}

export async function markActivityAsSynced(localId) {

  const db = await getOfflineDB();

  const transaction = db.transaction(
    "activityAnswers",
    "readwrite"
  );

  const store = transaction.objectStore(
    "activityAnswers"
  );

  const item = await store.get(localId);

  if (!item) {
    return;
  }

  item.syncStatus = "synced";

  await store.put(item);
}

