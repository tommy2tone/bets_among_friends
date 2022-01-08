import React, { useState, useEffect } from "react";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { DateTime } from 'luxon'
import { makeStyles } from '@mui/styles';
import { Link, useParams } from "react-router-dom";
import { useFetchEvent  } from "../../hooks/fetch-event";
import {useAuth } from '../../hooks/useAuth';
import User from '../user/user';
import { TextField, Button } from "@mui/material";
import { placeBet } from '../../services/event-services';
import {NotificationManager} from 'react-notifications';



const useStyles = makeStyles( theme => ({
    dateTime:{
        fontSize: '18px',
        marginRight: '3px',
        marginTop: '10px',
        color: theme.colors.mainAccentColor,
    },
    bets:{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        margin:'5px 0 0 0',
    }
}));


export default function Event(){

    const { authData } = useAuth();
    const { id } = useParams();
    const classes = useStyles();
    const [ data, loading, error] = useFetchEvent(authData.token, id);
    const [event, setEvent] = useState(null);
    const [ eventTime, setEventTime ] = useState(null);
    const [ score1, setScore1 ] = useState(null);
    const [ score2, setScore2 ] = useState(null);


    useEffect(()=> {       
        setEvent(data);
        if(data?.time){
            const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
            setEventTime(DateTime.fromFormat(data.time, format));
            }
    }, [data])

    const sendBet = async () => {
        const bet = await placeBet(authData.token, {score1, score2, 'event':event.id});
        if(bet){
            if(bet.new){
                event.bets.push(bet.result)
            }else{
                const myBetIndex = event.bets.findIndex(el => el.user.id === bet.result.user.id);
                event.bets[myBetIndex] = bet.result;
            }
            NotificationManager.success(bet.message)
            setScore1('');
            setScore2('');
        }
    }

    if (error) return <h1>Error</h1>
    if (loading) return <h1>Loading......</h1>

    return (
        <React.Fragment>
            
            {event && eventTime &&
                <div>
                    <Link to={`/details/${event.group}`}>Back</Link> 
                    <h3>{event.team1} VS {event.team2}</h3>
                    { event.score1 >= 0 && event.score2 >= 0 && 
                    <h2>{event.score1} : {event.score2}</h2>
                    }

                    <h2>
                        <CalendarTodayIcon className={classes.dateTime}/>{eventTime.toSQLDate()} 
                        &nbsp;
                        <AccessTimeIcon className={classes.dateTime}/>{eventTime.toFormat('HH:mm')}
                    </h2>
                    <hr/>
                    <br/>
                    { event && event.bets && event.bets.map(bet => {
                        return <div key={bet.id} className={classes.bets}>
                            <User user={bet.user}/> 
                            <h4>{bet.score1} : {bet.score2}</h4>
                            <h4>PTS</h4>
                            </div>
                    })}
                    <hr/>
                    <br/>
                    <TextField label="Score 1" variant="standard" type="number" 
                    onChange = { e => setScore1(e.target.value)}
                    />
                    :
                    <TextField label="Score 2" variant="standard" type="number" 
                    onChange = { e => setScore2(e.target.value)}
                    />
                    <br/>
                    <br/>
                    <Button variant='contained' color='primary'
                    onClick={() => sendBet()} disabled={!score1 || !score2}>
                        Place Bet
                    </Button>
                </div>
            }
          
        </React.Fragment>
    )
}