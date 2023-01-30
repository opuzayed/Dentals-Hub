import { format } from "date-fns";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";


const BookingModal = ({treatment, dateSelected, setTreatment, refetch}) => {
    const {name: treatmentName, slots} = treatment;
    const date = format(dateSelected, 'PP');
    const {user} = useContext(AuthContext);

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const patientName = form.name.value;
        const email = form.email.value;
        const phoneNumber = form.phone.value;

        const booking = {
            appointmentDate : date,
            treatment : treatmentName,
            patientName,
            slot,
            email,
            phoneNumber
        }
        fetch('http://localhost:5000/bookings', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(booking)
      })
      .then(res => res.json())
      .then(data =>{
        console.log(data);
       if(data.acknowledged)
       {
        setTreatment(null);
        toast.success('Booking Confirmed Successfully');
        refetch();
       }
       else{
        toast.error(data.message);
       }
      })
    }

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle"/>
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold dark:text-black">
            {treatmentName}
          </h3>
            <form onSubmit={handleSubmit} className = "grid grid-cols-1 gap-3 mt-10 dark:text-black">
                <input type="text" value={date} disabled className="input input-bordered w-full" />
                <select name='slot' className="select select-bordered w-full">
                    {
                        slots.map((slot, i) => <option 
                        key={i}
                        value={slot}
                        >{slot}</option>)
                    }
                </select>
                    <input name='name' type="text" defaultValue={user?.displayName} disabled className="input input-bordered w-full" placeholder="Full Name" />
                    <input name='email' type="email" defaultValue={user?.email} disabled className="input input-bordered w-full" placeholder="Email"/>
                    <input name='phone' type="text" className="input input-bordered w-full" placeholder='Phone Number'/>
                    <input type="submit" className="btn btn-accent w-full" value="Submit" />
            </form>
            </div>
      </div>
    </>
  );
};

export default BookingModal;
