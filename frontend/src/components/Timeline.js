import { useState, useEffect } from 'react';
import Admission from './Admission';
import axios from 'axios';

const Timeline = ({ subjectIds, selectedPatient }) => {
    const [eventsData, setEventsData] = useState([])
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                console.log("Getting events")
                let url = `http://localhost:8000/api/events/${selectedPatient}/`
                const response = await axios.get(url);
                setEventsData(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
                setEventsData([]);
            }
        };

        if (subjectIds.length > 0 && selectedPatient) {
            fetchEvents();
        }
    }, [selectedPatient]);

    return (
        <div style={{ maxHeight: '100%', overflow: 'auto' }}>
            <h2>Timeline</h2>
            {eventsData.length > 0 && (eventsData.map((item) => {
                const { hadm_ids, hadm, subject_id } = item;
                return hadm_ids.map((hadmId, index) => {
                    const events = hadm[hadmId];

                    return (
                        <div key={hadmId}>
                            {<Admission index={index + 1} hadm_id={hadmId} events={events} />}
                        </div>
                    );
                });
            }))}
        </div>
    );
};

export default Timeline;
