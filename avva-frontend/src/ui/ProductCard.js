import React from 'react';

import ProductCardImage from './ProductCardImage';
const ProductCard = ({ product }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <ProductCardImage product={product} url="product" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.name}</div>
                <p className="text-gray-700 text-base">
                    {product.description}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    ${product.price}
                </span>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add to Cart
                </button>
            </div>

        </div >
    );
};

export default ProductCard;
