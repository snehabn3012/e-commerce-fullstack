import React, { memo, useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';

import { getProduct } from '../api/product';

import Layout from "./Layout";
import ProductDetailsCard from "../ui/ProductDetailsCard";
import RelatedProducts from "./RelatedProducts";

function Product(props) {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const isInitialMount = useRef(true); // Track initial mount

    const loadProduct = (productId) => {
        getProduct(productId)
            .then((res) => {
                if (res.error) {
                    throw res.error;
                } else {
                    setProduct(res);
                }
            })
            .catch((err) => {
                setError(err)
            })
    }

    const { productId } = useParams();

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false; // Set to false after the first call
        } else {
            console.log("calling API");
            if (productId) {
                loadProduct(productId)
            }
        }
    }, [productId]);

    return (
        <Layout>
            Product Page
            <div className="flex gap-5">
                <ProductDetailsCard product={product} />
            </div>
            {productId && <RelatedProducts productId={productId} />}
        </Layout>
    )
}

export default memo(Product);