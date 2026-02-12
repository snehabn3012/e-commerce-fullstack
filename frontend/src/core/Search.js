import React, { useEffect, useState } from "react";
import { Button, Input, Select } from "@chakra-ui/react";
import { getCategories } from "../api/admin";
import { listProduct } from "../api/product";
import ProductCard from "../ui/ProductCard";

function Search() {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    })

    const { categories, category, search, results, searched } = data;

    const loadCategories = () => {
        getCategories().then(_data => {
            if (_data?.error) {
                //
            } else {
                setData({ ...data, categories: _data })
            }
        })
    }
    useEffect(() => {
        loadCategories();
    }, []);

    const searchData = () => {
        console.log(search, category);
        if (search) {
            listProduct({ search: search || undefined, category: category })
                .then(response => {
                    if (response?.error) {
                        //
                        console.log("error", response?.error);
                    } else {
                        setData({ ...data, results: response, searched: true });

                    }
                })
        }
    }

    const searchSubmit = (e) => {
        e.preventDefault();
        searchData();
    }

    const handleChange = (name) => (event) => {
        console.log("event", event.target.value);
        setData({ ...data, [name]: event.target.value, searched: false });
    }

    const searchForm = () => {
        return (
            <form onSubmit={searchSubmit} onClick={searchSubmit}>
                <div className="flex gap-5 w-50">
                    <Input
                        type="search"
                        onChange={handleChange('search')}
                        placeholder="Search Products"
                    />
                    {/* <Select onChange={handleChange('category')}>
                        <option value="all">All Categories</option>
                        {
                            categories?.map((category, index) => (
                                <option
                                    key={`c_${index}`}
                                    value={category._id}
                                >
                                    {category.name}
                                </option>
                            ))
                        }
                    </Select> */}
                    <Button>Search</Button>
                </div>
            </form>
        )
    }

    const searchMessage = (searched, results) => {
        if (searched) {
            if (results.length > 0) {
                return (
                    <div>`Found {results.length} products</div>
                )
            } else {
                return (
                    <div>`No Products Found!</div>
                )
            }
        }

    }

    return (
        <div className="flex-row">
            {searchForm()}
            {searchMessage(searched, results)}
            {results?.map((product) => (
                <div key={product._id}>
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    )
}

export default Search;