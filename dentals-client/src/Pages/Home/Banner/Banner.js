import React from 'react';
import chair from '../../../assets/images/chair.png';
const Banner = () => {
    return (
        <div className="hero mt-5">
        <div className="hero-content bg-base-200 rounded-lg flex-col lg:flex-row-reverse">
          <img src={chair} className="w-1/2 rounded-lg shadow-2xl" alt='chair figure'/>
          <div>
            <h1 className="text-5xl font-bold">Box Office News!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white">Get Started</button>
          </div>
        </div>
      </div>
    );
};

export default Banner;