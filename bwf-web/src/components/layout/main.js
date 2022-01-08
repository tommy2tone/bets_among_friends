import React from 'react'; 
import { Route, Routes} from 'react-router-dom';
import GroupList from '../group/group-list';
import GroupDetails from '../group/group-details';
import {useAuth } from '../../hooks/useAuth';
import  Register  from '../user/register';
import Account from '../user/account';
import Event from '../events/event';
import EventForm from '../events/event-form';



function Main() {

  const { authData } = useAuth();
 
  return (
    <div className="main">
        <Routes>
            <Route exact path="/" element={<GroupList/>}/>
            <Route path="/details/:id" element={<GroupDetails/> }/>
            <Route path="/event/:id" element={<Event/> }/>
            <Route path="/event-form" element={<EventForm/> }/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/account" element={<Account/>}/>


        </Routes>
    </div>
  );
}

export default Main;
