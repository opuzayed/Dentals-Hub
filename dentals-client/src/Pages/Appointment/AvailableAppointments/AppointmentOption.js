import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const AppointmentOption = ({ appointmentOption, setTreatment }) => {
  const { name, slots, price } = appointmentOption;
  const {user} = useContext(AuthContext);
  return (
    <div className="hero shadow-lg rounded-lg">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-2xl text-secondary font-bold">{name}</h1>
      <p>{slots.length>0 ? slots[0] : 'Try another day'}</p>
      <p> {slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>
      <p><small>Price: ${price}</small></p>
      {
        
        user?.uid ?
        <>
         <label disabled={slots.length === 0} htmlFor="booking-modal" onClick={() => setTreatment(appointmentOption)} className="btn mt-3 btn-primary bg-gradient-to-r from-primary to-secondary text-white">Book Appointment</label>
        </>
        :
      <>
        <Link to='/login'><button className="btn mt-3 btn-primary bg-gradient-to-r from-primary to-secondary text-white">Book Appointment</button></Link>
      </>

      }
    </div>
  </div>
</div>
  );
};

export default AppointmentOption;
