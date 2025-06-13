import React from 'react';
import { Button } from 'react-bootstrap';
import { FaCalendarPlus } from 'react-icons/fa';

const CalendarIntegration = ({ demande }) => {
    const openCalendar = () => {
        const startDate = new Date(demande.dateSoumission).toISOString().split('T')[0];
        window.open(`https://calendar.google.com/calendar/u/0/r/day/${startDate.replace(/-/g, '')}`, '_blank');
    };

    return (
        <Button variant="outline-primary" onClick={openCalendar}>
            <FaCalendarPlus className="me-2" />
            Voir Calendrier
        </Button>
    );
};

export default CalendarIntegration;