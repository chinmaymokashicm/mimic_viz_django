import React, { useState } from 'react';
import DRGCodesStats from './DRGCodesStats';
import ChartEventsStats from './ChartEventsStats';

const Stats = ({ selectedPatient }) => {
  const [selectedChart, setSelectedChart] = useState('');

  const handleChartChange = (event) => {
    setSelectedChart(event.target.value);
  };

  return (
    <div>
      <h2>Stats</h2>
      {/* Dropdown to select the chart */}
      <select value={selectedChart} onChange={handleChartChange}>
        <option value="">Select a Chart</option>
        <option value="drgcodes">DRG Codes</option>
        <option value="chartevents">Chart Events</option>
      </select>
      {/* Render the selected chart stats component */}
      {selectedChart === 'drgcodes' && <DRGCodesStats subjectId={selectedPatient} />}
      {selectedChart === 'chartevents' && <ChartEventsStats subjectId={selectedPatient} />}
    </div>
  );
};

export default Stats;
