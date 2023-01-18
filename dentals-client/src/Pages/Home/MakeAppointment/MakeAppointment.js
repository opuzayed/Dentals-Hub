import React from 'react';
import doctorSmall from '../../../assets/images/doctor-small.png'
import appointment from '../../../assets/images/appointment.png'
import PrimaryButton from '../../../Components/PrimaryButton/PrimaryButton';

const MakeAppointment = () => {
    return (
        <section className='mt-32'
        style={{
            background: `url(${appointment})`
        }}
            >
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={doctorSmall} alt="" className="-mt-32 hidden md:block lg:w-1/2 rounded-lg" />
                    <div>
                        <h4 className='text-lg text-primary font-bold'>Appointment</h4>
                        <h1 className=" text-white text-4xl font-bold">Make an appointment Today</h1>
                        <p className="text-white py-6">Have you ever looked in the mirror and noticed problems with your smile? Do you have a variety of issues that you feel like are beyond repair? They are not! You can transform your smile with dental veneers. Contact our office today to schedule your consultation and learn more. Call us or book a new patient appointment today. </p>
                        <PrimaryButton>Appointment</PrimaryButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeAppointment;