import { format } from 'date-fns';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';


const AvailableAppointments = ({dateSelected}) => {
   
    const [treatment, setTreatment] = useState(null);
    const date = format(dateSelected, 'PP');

    const {data:appointmentOptions=[]} = useQuery({
        queryKey:['appointmentOptions', date],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/appointmentOptions?date=${date}`)
            const data = await res.json();
            return data;
          },
        });
    
    return (
        <section className='mt-32'>
             <p className='text-center text-secondary font-bold mb-5'>Available Appointments on {format(dateSelected, 'PP')}.</p>
            <p className='text-center font-medium'>Please select a service</p>
            <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8'>
                {
                    appointmentOptions.map(option =><AppointmentOption
                    key={option._id}
                    appointmentOption={option}
                    setTreatment = {setTreatment}
                    ></AppointmentOption>)
                }
            </div>
            {  treatment &&
                <BookingModal
            treatment = {treatment}
            setTreatment = {setTreatment}
            dateSelected = {dateSelected}
            ></BookingModal>}
        </section>
    );
};

export default AvailableAppointments;