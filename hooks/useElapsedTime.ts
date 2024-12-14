import { useState, useEffect } from "react";
import { differenceInSeconds } from "date-fns";

// Custom hook to track elapsed time
export const useElapsedTime = (dateStarted: string | null) => {
  const [elapsedTime, setElapsedTime] = useState<string>("");

  useEffect(() => {
    if (dateStarted) {
      const interval = setInterval(() => {
        const startTime = new Date(dateStarted);
        const currentTime = new Date();
        const elapsedSeconds = differenceInSeconds(currentTime, startTime);

        // Calculate hours, minutes, and seconds
        const hours = Math.floor(elapsedSeconds / 3600);
        const minutes = Math.floor((elapsedSeconds % 3600) / 60);
        const seconds = elapsedSeconds % 60;

        // Conditionally render hours if it's 1 or more
        if (hours > 0) {
          setElapsedTime(
            `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
              2,
              "0"
            )}:${String(seconds).padStart(2, "0")}`
          );
        } else {
          setElapsedTime(
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
              2,
              "0"
            )}`
          );
        }
      }, 1000); // Update every second

      return () => clearInterval(interval); // Clean up the interval on component unmount
    }
  }, [dateStarted]);

  return elapsedTime;
};
