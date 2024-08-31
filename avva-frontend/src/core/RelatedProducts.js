import React, { memo, useCallback, useEffect, useState, useRef } from "react";
import { listRelatedProducts } from '../api/product';

import ProductCard from "../ui/ProductCard";

function RelatedProducts({ productId }) {
    const [products, setProducts] = useState([]);
    const isInitialMount = useRef(true); // Track initial mount

    const loadProducts = useCallback(() => {
        listRelatedProducts(productId).then(
            (data) => {
                if (data?.products) {
                    setProducts(data.products);
                }
            })
    }, [productId])

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false; // Set to false after the first call
        } else if (productId) {
            loadProducts();

        }
    }, [productId, loadProducts]);

    return (
        <div>
            <p>Related Products</p>
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    )
}

export default memo(RelatedProducts);
