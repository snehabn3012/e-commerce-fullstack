import React from "react";
import { API } from '../utils/config';

function ProductCardImage({ product, url }) {
    return (
        <div className="mb-3">
            <img src={`${API}/products/photo/${product._id}`} alt={product.name}
                className="max-h-full max-w-full"
            />
        </div>
    )
}

export default ProductCardImage;