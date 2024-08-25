import React, { useEffect, useState } from "react";
import { getProducts } from '../api/product';

import Layout from "./Layout";
import ProductCard from "../ui/ProductCard";
function Home() {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);

    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then((res) => {
            if (res.error) {
                setError(res.error)
            } else {
                setProductsBySell(res.data);
            }
        })
    }
    const loadProductsByArrival = () => {
        getProducts('createdAt').then((res) => {
            if (res.error) {
                setError(res.error)
            } else {
                setProductsByArrival(res.data);
            }
        })
    }
    useEffect(() => {
        loadProductsBySell();
        loadProductsByArrival();
    }, []);

    return (
        <Layout
            title="Home Page"
            description="E commerce"
        >

            <h1>New arrivals</h1>
            <div className="flex gap-2">
                {productsBySell?.map((product, index) => (
                    <div key={`sellp_${index}`} className="flex justify-center bg-gray-100 w-50">
                        <ProductCard product={product} />
                    </div>
                ))}

            </div>
            <h1>Best sellers</h1>
            <div>
                {productsByArrival?.map((products, index) => (
                    <div key={`sellA_${index}`} className="border-solid border-y-cyan-950">
                        {products.name}
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default Home