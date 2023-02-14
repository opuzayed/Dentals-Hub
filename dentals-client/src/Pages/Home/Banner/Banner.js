import React from 'react';
import chair from '../../../assets/images/chair.png';
import bgchair from '../../../assets/images/bg.png';
import PrimaryButton from '../../../Components/PrimaryButton/PrimaryButton';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className="hero bg-no-repeat bg-cover bg-center rounded-lg mt-5" style={{backgroundImage: `url(${bgchair})`}}>
        <div className="hero-content rounded-lg flex-col lg:flex-row-reverse">
          <img src={chair} className="sm:w-full lg:w-1/2 rounded-lg shadow-2xl" alt='chair figure'/>
          <div>
            <h1 className="text-5xl font-bold">YOUR NEW SMILE STARTS <br /> Here</h1>
            <p className="py-6">Dental implants are artificial tooth root similar to a metal screw placed into the jawbone to hold artificial tooth or teeth. They are a treatment option for individuals who have lost tooth or teeth due to decay, gum disease or injury.</p>
            <Link to='/appointment'><PrimaryButton>Get Started</PrimaryButton></Link>
          </div>
        </div>
      </div>
    );
};

export default Banner;