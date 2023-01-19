import React from "react";
import { useState } from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvailableAppointments from "../AvailableAppointments/AvailableAppointments";


const Appointment = () => {
    const [dateSelected, setDateSelected] = useState(new Date());
    
    return (
        <div>
           <AppointmentBanner dateSelected={dateSelected} setDateSelected={setDateSelected}></AppointmentBanner>
           <AvailableAppointments dateSelected={dateSelected}></AvailableAppointments> 
        </div>
    );
};

export default Appointment;