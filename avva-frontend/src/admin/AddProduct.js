import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button, Input, Select, Textarea } from '@chakra-ui/react'

import { useUserData } from "./../hooks/useAuth";
import Layout from "../core/Layout";
import { createProduct, getCatergories } from '../api/admin';

function AddProduct() {
    const { user, token } = useUserData();
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const formData = useRef(new FormData());

    const initialValues = {
        name: '',
        description: '',
        photo: '',
        price: '',
        quantity: '',
        category: '',
        shipping: '',
        error: '',
        formData: ''
    }
    const [values, setValues] = useState({
        ...initialValues,
        createdProduct: '',
        redirectToProfile: false,
    });

    const {
        name,
        description,
        price,
        photo,
        category,
        shipping,
        quantity,
        error,
        createdProduct,
        redirectToProfile,

    } = values;

    const loadCategories = () => {
        getCatergories({ token })
            .then((data) => {
                setCategories(data)
            })
    }

    useEffect(() => {
        loadCategories()
    }, []);

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: '' });
        setIsLoading(true);
        console.log("formData", formData.current);

        // make API Call
        createProduct(user._id, token, formData.current)
            .then((data) => {
                setIsLoading(false);
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else if (data.result) {
                    setValues({
                        name: '',
                        description: '',
                        photo: '',
                        price: '',
                        quantity: '',
                        category: '',
                        shipping: '',
                        loading: false,
                        error: '',
                        formData: new FormData(),
                        createdProduct: data.result.name
                    })
                }
            })
    }

    const handleChange = (name) => (event) => {
        const data = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.current.set(name, data);
        setValues({ ...values, [name]: data });
    }

    const showSuccess = () => {
        return (
            <div style={{ display: createdProduct ? '' : 'none' }}>
                <h2>{`${createdProduct} is created!`}</h2>
            </div>
        )
    }

    const showError = () => {
        return (
            <div style={{ display: error ? '' : 'none' }}>
                <h2>{error}</h2>
            </div>
        )
    }

    const goBack = () => (
        <div>
            <Link to="/admin/dashboard">Back to Admin Dashboard</Link>
        </div>
    )

    const newProductForm = () => (
        <form className="p-10 text-lg" onSubmit={clickSubmit}>
            <div>
                <label className="">Upload Photo</label>
                <input type="file"
                    className="btn bg-slate-200 p-2" name="photo"
                    onChange={handleChange('photo')}
                    value={undefined}
                    accept="image/*" />

            </div>

            <div className="py-2">
                <label className="font-bold">Name</label>
                <Input type="text" className="" onChange={handleChange('name')} value={name} />
            </div>

            <div className="py-2">
                <label className="font-bold">Description</label>
                <Textarea type="text" className="" onChange={handleChange('description')} value={description} />
            </div>

            <div className="py-2">
                <label className="font-bold">Price</label>
                <Input type="number" className="" onChange={handleChange('price')} value={price} />
            </div>

            <div className="py-2">
                <label className="font-bold">Category</label>
                <Select
                    className=""
                    onChange={handleChange('category')}
                    value={category}
                >
                    <option>Please Select</option>
                    {categories?.map((category, index) => (
                        <option key={`${category}_index`} value={category._id}>{category.name}</option>
                    ))}
                </Select>
            </div>

            <div className="py-2">
                <label className="font-bold">Quantity</label>
                <Input type="text" className="" onChange={handleChange('quantity')} value={quantity} />
            </div>

            <div className="py-2">
                <label className="font-bold">Shipping ?</label>
                <Select
                    className=""
                    onChange={handleChange('shipping')}
                    value={shipping}
                >
                    <option>Please Select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </Select>
            </div>

            <Button disabled={!isLoading} className="btn" type="submit">Create Product</Button>
        </form>
    )

    return (
        <Layout>
            {goBack()}
            {isLoading ? "Loading......" : null}
            {showSuccess()}
            {showError()}
            {newProductForm()}
        </Layout>
    )
}

export default AddProduct;