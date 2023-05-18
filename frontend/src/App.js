import { Box, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import Timeline from "./components/Timeline"
import PatientInfo from './components/PatientInfo';
import Stats from "./components/Stats";
import axios from 'axios';

function App() {
  const [subjectIds, setSubjectIds] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');


  useEffect(() => {
    const fetchSubjectIds = async () => {
      try {
        let url = 'http://localhost:8000/api/unique_subject_ids/'
        const response = await axios.get(url);
        setSubjectIds(response.data);
      } catch (error) {
        console.error('Error fetching subject IDs:', error);
        setSubjectIds([]);
      }
    };

    fetchSubjectIds();
  }, []);


  const handlePatientChange = (patientId) => {
    setSelectedPatient(patientId);
  };


  return (
    <Box display="flex" height="100vh">
      <Box width="50%">
        <PatientInfo
          selectedPatient={selectedPatient}
          handlePatientChange={handlePatientChange}
          subjectIds={subjectIds}
        />
        <Paper id="stats" style={{ backgroundColor: '#03fcec', height: '80%' }}>
          {<Stats selectedPatient={selectedPatient} />}
        </Paper>
      </Box>
      <Box width="50%">
        <Paper id="timeline" style={{ backgroundColor: '#a103fc', height: '100%' }}>
          <Timeline 
          selectedPatient={selectedPatient}
          subjectIds={subjectIds} 
        />
        </Paper>
      </Box>
    </Box>
  );
}

export default App;
