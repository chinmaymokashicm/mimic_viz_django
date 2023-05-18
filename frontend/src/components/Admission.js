import Event from './Event';
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material"

const Admission = ({ index, hadm_id, events }) => {
    return (
        <div>
            <Accordion>
                <AccordionSummary>
                    {/* <h4>Admission ID: {hadm_id}</h4> */}
                    <h4>Admission Number {index}: {hadm_id}</h4>
                </AccordionSummary>
                <AccordionDetails>
                    {events.map((event, index) => (
                        <Event key={index} event_json={event} />
                    ))}
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default Admission;
