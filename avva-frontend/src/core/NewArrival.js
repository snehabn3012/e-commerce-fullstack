import React from 'react';
import ProductCard from "../ui/ProductCard";

const NewArrivals = ({ products }) => {

    return (
        <section className="py-12 my-10 bg-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">New Arrivals</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewArrivals;
