import React from 'react';
import quote from '../../../assets/icons/quote.svg';
import people1 from '../../../assets/images/people1.png';
import people2 from '../../../assets/images/people2.png';
import people3 from '../../../assets/images/people3.png';
import Review from './Review';


const Testimonial = () => {

    const reviews = [
        {
            _id: 1, 
            name: 'Rahim',
            img: people1,
            review: 'Great friendly service and so caring. Excellent treatment and would not hesitate to recommend ????',
            location: 'Uttara'
        },
        {
            _id: 2, 
            name: 'Lubana',
            img: people2,
            review: 'I cant thank Dr Alexandra Musgrove enough.She is very professional, understanding, caring and a delight to visit.',
            location: 'Banani'
        },
        {
            _id: 3, 
            name: 'Muna',
            img: people3,
            review: 'Easy to book online. We usually see Ushi as she always gives good tips on how to improve your dental health',
            location: 'Dhanmondi'
        },
    ]

    return (
        <section className='my-16'>
            <div className='flex justify-between'>
                <div>
                    <h4 className="text-xl text-primary font-bold">Testimonial</h4>
                    <h2 className="text-4xl">What Our Patients Says</h2>
                </div>
                <figure>
                    <img className='w-24 lg:w-48' src={quote} alt="" />
                </figure>
            </div>
            <div className='grid gap-6 mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    reviews.map(review =><Review
                        key={review._id}
                        review={review}
                    >
                    </Review>)
                }
            </div>
        </section>
    );
};

export default Testimonial;