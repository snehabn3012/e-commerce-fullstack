import { API } from '../utils/config';
import queryString from 'query-string';

export const getProducts = (sortBy = "createdAt") => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc`, {
    // return fetch(`${API}/products`, {
        method: 'GET',
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log('err:', err);
    });
}

export const getFilteredProduct = (skip, limit, filters = {}) => {
    const data = { limit, skip, filters };
    return fetch(`${API}/products/by/search`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log('err:', err);
    });
}

export const listProduct = (params) => {
    const query = queryString.stringify(params);
    console.log("query", query);
    return fetch(`${API}/products/search?${query}`, {
        method: 'GET',
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log('err:', err);
    });
}

export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET',
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log('err:', err);
    });
}

export const listRelatedProducts = (productId) => {
    return fetch(`${API}/products/related/${productId}`, {
        method: 'GET',
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log('err:', err);
    });
}