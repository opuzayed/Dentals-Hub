import React from 'react';
import fluoride from '../../../../assets/images/fluoride.png';
import cavity from '../../../../assets/images/cavity.png'
import whitening from '../../../../assets/images/whitening.png'
import Service from './Service';

const Services = () => {

    const servicesData = [
        {
            id: 1,
            name: 'Fluoride Treatment',
            description: 'Fluoride therapy is the delivery of fluoride to the teeth topically or systemically, which is designed to prevent tooth decay (dental caries) which results in cavities.',
            img: fluoride
        },
        {
            id: 2,
            name: 'Cavity Filling',
            description: 'A filling is used to treat a small hole, or cavity, in a tooth. To repair a cavity, a dentist removes the decayed tooth tissue and then fills the space with a filling material.',
            img: cavity
        },
        {
            id: 3,
            name: 'Teeth Whitening',
            description: 'Tooth whitening is any process that lightens the color of a tooth. Whitening may be accomplished by physical removal of the stain or a chemical reaction to lighten the tooth color.',
            img: whitening
        },
    ]

    return (
        <div className='mt-16'>
            <div className='text-center'>
                <h3 className='text-xl font-bold text-primary uppercase'>Our Services</h3>
                <h2 className='text-3xl'>Services We Provide</h2>
            </div>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {
                    servicesData.map(service => <Service
                        key={service.id}
                        service={service}
                    ></Service>)
                }
            </div>
        </div>
    );
};

export default Services;