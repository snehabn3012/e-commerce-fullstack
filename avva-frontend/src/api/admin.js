import { API } from '../utils/config';

export const createCategory = (userId, token, category) => {

    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log('err:', err);
        });
}

export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log('err:', err);
    });
}

export const getCatergories = ({ token }) => {
    return fetch(`${API}/category/all`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log('err:', err);
    });
}