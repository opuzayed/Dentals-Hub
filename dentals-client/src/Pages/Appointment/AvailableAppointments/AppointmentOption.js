import React from "react";

const AppointmentOption = ({ appointmentOption, setTreatment }) => {
  const { name, slots } = appointmentOption;
  return (
    <div className="hero shadow-lg rounded-lg">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-2xl text-secondary font-bold">{name}</h1>
      <p>{slots.length>0 ? slots[0] : 'Try another day'}</p>
      <p> {slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>
      <label htmlFor="booking-modal" onClick={() => setTreatment(appointmentOption)} className="btn mt-3 btn-primary bg-gradient-to-r from-primary to-secondary text-white">Book Appointment</label>
    </div>
  </div>
</div>
  );
};

export default AppointmentOption;
