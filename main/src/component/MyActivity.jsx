import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function MyActivity() {
  const [activities, setActivities] = useState([]);
  const [cookies] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const accessToken = cookies.access_token;
        const {data,status} = await axios.get(
          "https://www.strava.com/api/v3/athlete/activities",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (status !== 401) {         
          setActivities(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchActivities();
  }, [cookies.access_token]);

  return (
    <div>
      <h2>Your Strava Activities</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <strong>{activity.name}</strong> - {activity.distance} meters
          </li>
        ))}
      </ul>
    </div>
  );
}
