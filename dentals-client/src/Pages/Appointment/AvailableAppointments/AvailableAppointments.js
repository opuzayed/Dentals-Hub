import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import AppointmentOption from './AppointmentOption';



const AvailableAppointments = ({dateSelected}) => {
    const [appointmentOptions, setAppointmentOptions] = useState([]);
    useEffect(()=>{
        fetch('appointmentOptions.json')
        .then(res => res.json())
        .then(data =>setAppointmentOptions(data))
    },[]);
    
    return (
        <section className='mt-32'>
             <p className='text-center text-secondary font-bold mb-5'>Available Appointments on {format(dateSelected, 'PP')}.</p>
            <p className='text-center font-medium'>Please select a service</p>
            <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8'>
                {
                    appointmentOptions.map(option =><AppointmentOption
                    key={option._id}
                    appointmentOption={option}
                    ></AppointmentOption>)
                }
            </div>
        </section>
    );
};

export default AvailableAppointments;