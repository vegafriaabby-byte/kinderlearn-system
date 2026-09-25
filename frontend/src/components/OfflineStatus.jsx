import { useEffect, useState } from "react";

function OfflineStatus() {

  const [online, setOnline] =
    useState(navigator.onLine);

  useEffect(() => {

    function handleOnline() {
      setOnline(true);
    }

    function handleOffline() {
      setOnline(false);
    }

    window.addEventListener(
      "online",
      handleOnline
    );

    window.addEventListener(
      "offline",
      handleOffline
    );

    return () => {

      window.removeEventListener(
        "online",
        handleOnline
      );

      window.removeEventListener(
        "offline",
        handleOffline
      );

    };

  }, []);

  return (
    <div
      className={
        online
          ? "online-status"
          : "offline-status"
      }
    >
      {online
        ? "🟢 Online"
        : "🔴 Offline - Answers will be saved"}
    </div>
  );
}

export default OfflineStatus;