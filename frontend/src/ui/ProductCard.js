import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { addItem, removeItem, updateItem } from '../utils/cartHelpers';
import ProductCardImage from './ProductCardImage';
import { Input } from '@chakra-ui/react';

const ProductCard = ({ product, showAddToCartButton = true,
    showRemoveProductButton = false, cartUpdate = false }) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);


    const addToCart = (e) => {
        addItem(product, () => {
            setRedirect(true);
        });
    }

    const removeFromCart = (productId) => () => {
        removeItem(productId);
    }

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Navigate to="/cart" />
        }
    }

    const handleChange = (productId) => (event) => {
        const val = event.target.value;
        setCount(val < 1 ? 1 : val);
        if (val >= 1) {
            updateItem(productId, val);
        }
    }



    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <Link to={`/product/${product._id} `}>
                <ProductCardImage product={product} url="product" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{product.name}</div>
                    <p className="text-gray-700 text-base">
                        {product.description?.substring(0, 100) || product.description}
                    </p>
                </div>
            </Link>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    ${product.price}
                </span>
                {showAddToCartButton && <button onClick={addToCart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add to Cart
                </button>
                }
                {cartUpdate && (
                    <div>
                        <Input type='number' value={count} onChange={handleChange(product._id)} />
                    </div>
                )}
                {showRemoveProductButton && <button onClick={removeFromCart(product._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Remove Item
                </button>
                }
                {shouldRedirect(redirect)}
            </div>
        </div>
    );
};

export default ProductCard;
