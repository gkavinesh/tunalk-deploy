import React, { useState, useEffect } from 'react';
import Preloader from '../../components/preloadersub/preloader'; // Ensure this is the correct path to the Preloader component

const Faq = () => {
    const [faq, setFaq] = useState([
        {
            question: 'How to track my orders and status of payment?',
            answer: 'Once signed in, go to your profile icon and click on orders. In the orders tab, you can view the status of the order and payment.',
            open: false
        },
        {
            question: 'What are the payment methods available ?',
            answer: 'Bank transfer and Cash on Delivery are default payments. Card Payments will be coming online soon.',
            open: false
        },
        {
            question: 'Can I cancel my order?',
            answer: 'Yes, you can contact us through our contact details provided here. Make sure the status of the order is not "Out for delivery".',
            open: false
        },
        {
            question: 'How can I reach support if my delivery is not on time?',
            answer: 'You can contact the dispatch team via contact details - 077-529-1291',
            open: false
        },
        {
            question: 'Is every product displayed in the products page in stock?',
            answer: 'Yes, every product displayed in the products page is in stock, if its not available then it wont be listed but you contact for further information at - 077-529-1291',
            open: false
        }
    ]);

    const [loading, setLoading] = useState(true); // State for loading

    useEffect(() => {
        // Simulate a delay for loading
        const timer = setTimeout(() => {
            setLoading(false); // Set loading to false after 6 seconds
        }, 3000);

        // Cleanup timer on component unmount
        return () => clearTimeout(timer);
    }, []);

    const toggleFaq = (index) => {
        setFaq(faq.map((item, i) => {
            if (i === index) {
                item.open = !item.open;
            } else {
                item.open = false;
            }

            return item;
        }));
    };

    // Render preloader if loading
    if (loading) {
        return <Preloader />;
    }

    return (
        <section className="py-10 bg-white sm:py-16 lg:py-24 ">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex justify-center items-center">
                    <h2 className="text-teal-500 text-7xl font-semibold -mt-8">FAQ</h2>
                </div>

                <div className="max-w-8xl mx-auto mt-8 space-y-4 md:mt-16">
                    {faq.map((item, index) => (
                        <div key={index} className="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50">
                            <button type="button" className="flex items-center justify-between w-full px-4 py-5 sm:p-6" onClick={() => toggleFaq(index)}>
                                <span className="flex text-lg font-semibold text-black"> {item.question} </span>

                                <svg className={`w-6 h-6 text-gray-400 ${item.open ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div className={`${item.open ? 'block' : 'hidden'} px-4 pb-5 sm:px-6 sm:pb-6`}>
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-center text-gray-600 text-base mt-9">Didn’t find the answer you are looking for? <a href="#footer" title="" className="font-medium text-teal-400 transition-all duration-200 hover:text-teal-400 focus:text-teal-400 hover:underline">Contact our support</a></p>
            </div>
        </section>
    );
};

export default Faq;
