import { format } from "date-fns";
import React from "react";


const BookingModal = ({treatment, dateSelected}) => {
    const {name, slots} = treatment;
    const date = format(dateSelected, 'PP');

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const patientName = form.name.value;
        const email = form.email.value;
        const phoneNumber = form.phone.value;

        const booking = {
            appointmentDate : date,
            treatment : name,
            patientName,
            slot,
            email,
            phoneNumber
        }
        console.log(booking);
        
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
            {name}
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
                    <input name='name' type="text" className="input input-bordered w-full" placeholder="Full Name" />
                    <input name='email' type="email" className="input input-bordered w-full" placeholder="Email"/>
                    <input name='phone' type="text" className="input input-bordered w-full" placeholder='Phone Number'/>
                    <input type="submit" className="btn btn-accent w-full" value="Submit" />
            </form>
            </div>
      </div>
    </>
  );
};

export default BookingModal;
