import React from "react";
import { useNavigate } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { DateTime } from 'luxon'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles( theme => ({
    dateTime:{
        fontSize: '18px',
        marginRight: '3px',
        marginTop: '10px',
        color: theme.colors.mainAccentColor,
    },
    memberContainer: {
        display: 'grid',
        gridTemplateColumns: '100px auto'
    }
}));


export default function EventList({events}){

    const classes = useStyles();
    const navigate = useNavigate();

    const openEvent =  eventId => {
        navigate(`/event/${eventId}`);
    }

    return (
        <React.Fragment>
        <h3>Events:</h3>
                {events && events.map(event => {
                    const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
                    const eventTime = DateTime.fromFormat(event.time, format);

                    return <div key={event.id} onClick={() => openEvent(event.id) }>
                        <p>{event.team1} VS {event.team2}
                        &nbsp; : &nbsp;
                        <CalendarTodayIcon className={classes.dateTime}/>{eventTime.toSQLDate()} 
                        &nbsp;
                        <AccessTimeIcon className={classes.dateTime}/>{eventTime.toFormat('HH:mm')}
                        </p>
                    </div>
                })}
        </React.Fragment>
    )
}