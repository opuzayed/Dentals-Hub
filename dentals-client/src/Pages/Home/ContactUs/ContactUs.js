import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import appointment from '../../../assets/images/appointment.png';
import PrimaryButton from "../../../Components/PrimaryButton/PrimaryButton";
const ContactUs = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [contactFormError, setContactFormError] = useState('');

    const handleContactForm = (data) => console.log(data);

  return (
    <div
      className="hero rounded-lg"
      style={{backgroundImage:`url(${appointment})`}}
    >
      
      <div className="hero-content text-neutral-content">
        <div className="">
          <h1 className="mb-2 text-lg text-primary font-bold text-center">Contact Us</h1>
          <p className="mb-9 text-3xl text-center">
            Stay connected with us
          </p>
          <form onSubmit={handleSubmit(handleContactForm)}>
                        <div className="form-control w-full max-w-xs mb-5">
                            <input type="email" {...register("email", {
                                required: "Email is required"
                            })} className="input input-bordered w-full max-w-xs text-black" placeholder="Your Email" />
                            {errors.email && <p className='text-error'>{errors.email.message}</p>}
                        </div>
                    <div className="form-control w-full max-w-xs mb-5">
                        <input type="text" {...register("subject", {
                            required: "Subject is Required"
                        })} className="input input-bordered w-full max-w-xs text-black" placeholder="Your Subject" />
                        {errors.subject && <p className='text-error'>{errors.subject.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                    <textarea {...register("message")} className="textarea textarea-bordered text-black" placeholder="Your Message"></textarea>
                    </div>
                    <div className="mt-9 w-32 mx-auto"><PrimaryButton>Submit</PrimaryButton></div>
                    {contactFormError && <p className='text-error'>{contactFormError}</p>}
                </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
