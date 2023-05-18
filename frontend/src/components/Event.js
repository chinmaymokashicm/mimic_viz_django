import React from 'react';
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';

const eventTypes = {
    transfer: {
        title: 'Transfer',
        content: (event) => (
            <>
                <Typography variant="body1">Care Unit: {event.careunit}</Typography>
                {/* <Typography variant="body1">Intime: {event.intime}</Typography>
                <Typography variant="body1">Outtime: {event.outtime}</Typography> */}
            </>
        ),
        color: '#fcba03',
    },
    admission: {
        title: 'Admission',
        content: (event) => (
            <>
                {/* <Typography variant="body1">Admission Time: {event.admittime}</Typography>
                <Typography variant="body1">Discharge Time: {event.dischtime}</Typography> */}
                <Typography variant="body1">Admission Type: {event.admission_type}</Typography>
            </>
        ),
        color: '#03fcec',
    },
    procedureevent: {
        title: 'Procedure',
        content: (event) => (
            <>
                {/* <Typography variant="body1">Start Time: {event.starttime}</Typography>
                <Typography variant="body1">End Time: {event.endtime}</Typography> */}
            </>
        ),
        color: '#a103fc',
    },
};

const Event = ({ event_json }) => {
    const eventType = eventTypes[event_json.event];
  
    const fromTime = event_json.starttime || event_json.intime || event_json.admittime;
    const toTime = event_json.endtime || event_json.outtime || event_json.dischtime;
  
    const fromDate = moment(fromTime);
    const toDate = moment(toTime);
    const durationHours = toDate.diff(fromDate, 'hours'); // Duration in hours
    const durationMinutes = toDate.diff(fromDate, 'minutes'); // Duration in minutes
  
    return (
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content" id="panel-header">
          <Typography variant="subtitle1">{eventType.title}</Typography>
          <Box sx={{ ml: 'auto' }}>
            <Typography variant="subtitle1">
              From: {fromDate.format('YYYY-MM-DD HH:mm:ss')} - To: {toDate.format('YYYY-MM-DD HH:mm:ss')}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: eventType.color }}>
          <div>{eventType.content(event_json)}</div>
          <div>
            <p>Duration: {durationHours} hours ({durationMinutes} minutes)</p>
          </div>
        </AccordionDetails>
      </Accordion>
    );
  };
  

export default Event;
