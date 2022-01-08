import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { CssTextField } from '../layout/elements';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';



export default function EventForm(){

    const location = useLocation();
    const group = location.state.group;
    const [ team1, setTeam1 ] = useState();
    const [ team2, setTeam2 ] = useState();
    const [time, setTime] = useState(new Date());


    const handleSubmit = async e => {
        e.preventDefault();
        console.log(team1, team2, time);
    }

    return (
        <div>
        <h1>New Event for group {group.name}</h1>
        <form onSubmit={handleSubmit}>
            <CssTextField label='Team 1' onChange={e => setTeam1(e.target.value)}/>
            &nbsp;
            &nbsp;

            <CssTextField label='Team 2' onChange={e => setTeam2(e.target.value)}/>
            <br/>
            <br/>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Date and Time of event"
                    value={time}
                    onChange={(newValue) => {
                    setTime(newValue);
                    }}
                />
            </LocalizationProvider> 
            <br/>
            <br/>
            <Button variant="contained" color="primary" type="submit">Create Event</Button>
        </form>
        </div>
    )
}