import React from 'react';
import { Link } from 'react-router-dom';

// import BannerImg from '';

const Banner = () => {
    return (
        <div className='bg-banner relative bg-cover bg-center h-[500px]'>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Banner Content */}
            <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center text-white px-6 sm:px-12">
                <h1 className="text-4xl sm:text-6xl font-bold mb-4">
                    Discover the Healthy Products
                </h1>
                <p className="text-lg sm:text-xl mb-6">
                    Explore our exclusive range of products with special offers and discounts.
                </p>
                <Link
                    to="/shop"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300">
                    Shop Now
                </Link>
            </div>
        </div >
    );
};

export default Banner;
