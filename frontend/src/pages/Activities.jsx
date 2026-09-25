import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getActivities
} from "../services/activityService";

function Activities() {

  const [activities, setActivities] =
    useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    async function loadActivities() {

      const data =
        await getActivities();

      setActivities(data);

    }

    loadActivities();

  }, []);

  return (

    <div>

      <h1>
        Activities
      </h1>

      {activities.length === 0 ? (

        <p>
          No activities available.
        </p>

      ) : (

        activities.map(
          (activity) => (

            <div
              key={activity.id}
              className="activity-card"
            >

              <h2>
                {activity.title}
              </h2>

              <p>
                {activity.description}
              </p>

              <button
                onClick={() =>
                  navigate(
                    `/activities/${activity.id}`
                  )
                }
              >
                Start Activity
              </button>

            </div>

          )
        )

      )}

    </div>

  );

}

export default Activities;