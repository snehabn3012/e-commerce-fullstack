import React, { useCallback, useEffect, useState } from "react";
import { useUserData } from "./../hooks/useAuth";

import Layout from "./Layout";
import ProductCard from "../ui/ProductCard";
import { getCatergories } from "../api/admin";
import { Button, Checkbox, Radio, RadioGroup } from "@chakra-ui/react";
import { prices } from '../utils/fixedPrices';
import { getFilteredProduct } from '../api/product';

function Shop() {
    const { token } = useUserData();

    const [filters, setFilters] = useState({
        filters: { category: [], price: [] }
    });

    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [priceFilter, setPriceFilter] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const [error, setError] = useState(false);
    const limit = 6;
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);

    const loadFilteredResults = (newFilters) => {
        // console.log(newFilters);
        getFilteredProduct(skip, limit, newFilters)
            .then((data) => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setFilteredResults(data.data);
                    setSize(data.size);
                    setSkip(0);
                }
            })
    }

    const loadMore = () => {
        let toSkip = skip + limit;
        getFilteredProduct(toSkip, limit, filters.filters)
            .then((data) => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setFilteredResults([...filteredResults, ...data.data]);
                    setSize(data.size);
                    setSkip(0);
                }
            })
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <Button onClick={loadMore}>Load More</Button>
            )
        )
    }


    const handleToggle = (categoryId) => () => {
        const currentCategoryIdPos = checked.indexOf(categoryId);
        const newCheckedCategoryId = [...checked];

        //if currently checked was not already in checked state > push
        // else pull/take off
        if (currentCategoryIdPos === -1) {
            newCheckedCategoryId.push(categoryId);
        } else {
            newCheckedCategoryId.splice(currentCategoryIdPos, 1)
        }
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId, 'category');
    }

    const handlePriceToggle = (val) => {
        // const val = event?.target?.value;
        setPriceFilter(val);
        handleFilters(val, 'price');
    }


    const loadCategories = useCallback(() => {
        getCatergories({ token })
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setCategories(data);
                }
            })
    }, [token])

    useEffect(() => {
        loadCategories();
        loadFilteredResults(skip, limit, filters.filters);
    }, [loadCategories]);


    const handleFilters = (selectedValues, filterBy = 'category') => {
        console.log("filters", filters);
        const newFilters = { ...filters };
        newFilters.filters[filterBy] = selectedValues;

        if (filterBy === 'price') {
            let priceValues = handlePrice(selectedValues);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(filters.filters);

        setFilters(newFilters);
    };

    const handlePrice = (value) => {
        const data = prices;
        let array = [];
        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    }

    return (
        <Layout>
            {error}
            <h2>Products</h2>
            <div className="flex gap-5">
                <div className="">
                    <p>Categories</p>
                    {categories.map((category, index) => (
                        <ul key={`category_check_${index}`}>
                            <Checkbox
                                onChange={handleToggle(category._id)}
                                value={checked.indexOf(category._id) === -1}
                            >
                                {category.name}
                            </Checkbox>
                        </ul>
                    ))}
                    <p>Prices</p>
                    <RadioGroup name="price" onChange={handlePriceToggle} value={priceFilter} >
                        {prices.map((price, index) => (
                            <Radio
                                key={`price_radio_${index}`}
                                value={price._id}
                                name={price.name}
                            >
                                {price.name}
                            </Radio>
                        ))}
                    </RadioGroup>
                </div>
                <div className="flex">
                    {filteredResults?.map((product, index) => (
                        <div key={`fp_${index}`} className="flex justify-center bg-gray-100 w-50 gap-5">
                            <ProductCard product={product} />
                        </div>
                    ))}
                    < hr />
                    {loadMoreButton()}

                </div>
            </div>
        </Layout >
    )
}

export default Shop;