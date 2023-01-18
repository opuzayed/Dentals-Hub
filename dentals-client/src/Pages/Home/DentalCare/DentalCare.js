import React from "react";
import treatment from '../../../assets/images/treatment.png';
import PrimaryButton from "../../../Components/PrimaryButton/PrimaryButton";
const DentalCare = () => {
  return (
    <div className="hero mt-5">
  <div className="hero-content flex-col lg:flex-row">
    <div className='md:w-1/2'>
    <img src={treatment} className="rounded-lg shadow-2xl w-[322px] h-[406px]  md:mx-56" alt="#"/>
    </div>
    <div className='md:w-1/2'>
      <h1 className="text-5xl font-bold ">Exceptional Dental <br /> Care, on Your Terms</h1>
      <p className="py-6">Learn how to keep your mouth healthy and happy all day long. Don't let poor oral health ruin your beautiful smile. </p>
      <PrimaryButton>Get Started</PrimaryButton>
    </div>
  </div>
</div>
  );
};

export default DentalCare;
