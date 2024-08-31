import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { addItem } from '../utils/cartHelpers';
import ProductCardImage from './ProductCardImage';

function ProductDetails({ product }) {
    const [redirect, setRedirect] = useState(false);

    const addToCart = (e) => {
        addItem(product, () => {
            setRedirect(true);
        });
    }

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Navigate to="/cart" />
        }
    }
    return (
        <div>
            <div className="container mx-auto p-6">
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <div className="flex flex-col md:flex-row">
                        {/* Product Image */}
                        <div className="md:w-1/2">
                            <ProductCardImage product={product} url="product" />
                        </div>
                        {/* Product Details */}
                        <div className="md:w-1/2 md:pl-6 mt-4 md:mt-0">
                            <h2 className="text-3xl font-semibold mb-2">{product.name}</h2>
                            <p className="text-lg font-bold text-green-600 mb-4">${product.price}</p>
                            <p className="text-gray-700 mb-4">{product.description}</p>
                            <div className="mt-4">
                                <button onClick={addToCart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {/* category: {product.category.name} */}
            </div>
            {shouldRedirect(redirect)}
        </div>
    )
}

export default ProductDetails;