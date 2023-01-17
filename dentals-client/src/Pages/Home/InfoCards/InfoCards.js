import React from 'react';
import clock from '../../../assets/icons/clock.svg';
import marker from '../../../assets/icons/marker.svg';
import phone from '../../../assets/icons/phone.svg';
import InfoCard from './InfoCard';

const InfoCards = () => {
    const dentalInfos = [
        {
            id : 1,
            name : 'Opening Hours',
            description : 'Open 9:00am to 6:00pm everyday',
            icon : clock,
            bgClass : 'bg-gradient-to-r from-primary to-secondary'
        },
        {
            id : 2,
            name : 'Our Location',
            description : 'Uttara, Dhaka',
            icon : marker,
            bgClass : 'bg-accent'
        },
        {
            id : 3,
            name : 'Contact-Us',
            description : '+8801681310294',
            icon : phone,
            bgClass : 'bg-gradient-to-r from-primary to-secondary'
        }
    ]
    return (
        <div className='grid gap-6 mt-5 md:grid-cols-2 lg:grid-cols-3'>
            {
               dentalInfos.map(dentalInfo => <InfoCard
               key={dentalInfo.id}
               dentalInfo={dentalInfo}
               >
               </InfoCard>) 
            }
        </div>
    );
};

export default InfoCards;