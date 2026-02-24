import React, { useEffect, useState } from "react";
import { getProducts } from '../api/product';

import Layout from "./Layout";
import ProductCard from "../ui/ProductCard";
import Search from './Search';
import Banner from './Banner';
import ProductList from './ProductList';

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
            {/* <Search /> */}
            <Banner />
            {productsByArrival.length > 0 && <ProductList products={productsByArrival} header="New Arrivals" />}
            <ProductList products={productsBySell} header="Best sellers" />
        </Layout>
    )
}

export default Home