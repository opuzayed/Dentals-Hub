import React from "react";
import { DayPicker } from 'react-day-picker';
import chair from '../../../assets/images/chair.png';
import bgchair from '../../../assets/images/bg.png';
const AppointmentBanner = ({dateSelected,setDateSelected}) => {
    
  return (
    <header className="mt-5">
      <div className="hero bg-no-repeat bg-cover bg-center rounded-lg"  style={{backgroundImage: `url(${bgchair})`}}>
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={chair}
            className="sm:w-full md:w-1/2 rounded-lg shadow-2xl" alt='dentist-patient-chair'
          />
          <div>
            <DayPicker 
            mode="single"
            selected={dateSelected}
            onSelect={setDateSelected}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppointmentBanner;
