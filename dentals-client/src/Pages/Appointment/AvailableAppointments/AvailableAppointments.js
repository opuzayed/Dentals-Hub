import { format } from 'date-fns';
import React from 'react';

const AvailableAppointments = ({dateSelected}) => {
    return (
        <section className='mt-32'>
            <p className='text-center text-secondary font-bold'>Available Appointments on {format(dateSelected, 'PP')}.</p>
        </section>
    );
};

export default AvailableAppointments;