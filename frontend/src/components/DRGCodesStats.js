import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip);

const DRGCodesStats = ({ subjectId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:8000/api/admissions/${subjectId}/hosp/drgcodes/`;
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching DRG codes:', error);
        setData([]);
      }
    };

    fetchData();
  }, [subjectId]);

  const getChartData = () => {
    const counts = {};

    data.forEach((drg) => {
      const { drg_code } = drg;
      if (counts[drg_code]) {
        counts[drg_code]++;
      } else {
        counts[drg_code] = 1;
      }
    });

    const sortedData = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .reduce(
        (acc, [drg_code, count]) => {
          acc.labels.push(drg_code);
          acc.data.push(count);
          return acc;
        },
        { labels: [], data: [] }
      );

    return sortedData;
  };

  const chartData = getChartData();

  const chartOptions = {
    indexAxis: 'y', // Set the chart to be vertical
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ height: '100%', overflowY: 'auto' }}> {/* Make the component scrollable */}
      <h3>DRG Codes Statistics</h3>
      <div style={{ height: 'calc(100% - 24px)' }}>
        {data.length > 0 ? (
          <Bar
            data={{
              labels: chartData.labels,
              datasets: [
                {
                  label: 'Count',
                  data: chartData.data,
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                },
              ],
            }}
            options={chartOptions}
          />
        ) : (
          <p>Loading DRG codes data...</p>
        )}
      </div>
    </div>
  );
};

export default DRGCodesStats;
