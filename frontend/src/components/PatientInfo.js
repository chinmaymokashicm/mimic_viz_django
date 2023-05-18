import React, { useState, useEffect } from 'react';
import { Paper, Select, MenuItem, Typography, Box } from '@mui/material';
import axios from 'axios';

const PatientInfo = ({ selectedPatient, handlePatientChange, subjectIds }) => {
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        let url = `http://localhost:8000/api/patients/${selectedPatient}/`
        const response = await axios.get(url);
        setPatientData(response.data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
        setPatientData(null);
      }
    };
    if (selectedPatient){
        fetchPatientData();
    }
  }, [selectedPatient]);


return (
    <Paper id="patient_info" sx={{ backgroundColor: '#fcba03', height: '20%', padding: '16px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Patient Information</Typography>
        <Select value={selectedPatient} onChange={(event) => handlePatientChange(event.target.value)} sx={{ minWidth: '120px' }}>
          {subjectIds.map((subjectId) => (
            <MenuItem key={subjectId} value={subjectId}>
              {subjectId}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box mt={2}>
        {selectedPatient && patientData && patientData.length > 0 ? (
          <>
            {patientData.map((patient) => {
              if (patient.subject_id === selectedPatient) {
                return (
                  <React.Fragment key={patient.subject_id}>
                    <Typography variant="body1">Gender: {patient.gender}</Typography>
                    <Typography variant="body1">Age: {patient.anchor_age}</Typography>
                    <Typography variant="body1">Year: {patient.anchor_year}</Typography>
                    <Typography variant="body1">Year Group: {patient.anchor_year_group}</Typography>
                  </React.Fragment>
                );
              }
              return null;
            })}
          </>
        ) : (
          <Typography variant="body1">Loading patient data...</Typography>
        )}
      </Box>
    </Paper>
  );
};

export default PatientInfo;
