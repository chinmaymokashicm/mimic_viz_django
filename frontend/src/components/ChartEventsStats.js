import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChartEventsStats = ({ subjectId }) => {
  const [statsData, setStatsData] = useState([]);

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const url = `http://localhost:8000/api/admissions/${subjectId}/icu/chartevents/`;
        const response = await axios.get(url);
        setStatsData(response.data);
      } catch (error) {
        console.error('Error fetching chart events:', error);
        setStatsData([]);
      }
    };

    fetchStatsData();
  }, [subjectId]);

  return (
    <div>
      <h3>Chart Events Stats</h3>
      {/* Render the stats data */}
      {/* You can display the relevant stats information */}
      {statsData.map((event) => (
        <div key={event.id}>
          {/* Render the chart event stats */}
        </div>
      ))}
    </div>
  );
};

export default ChartEventsStats;
