import { API } from '../utils/config';
import { isAuthenticated } from "../auth";

const authData = isAuthenticated();
const userId = authData?.user._id;
const token = authData?.token;

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

export const getCatergories = () => {
    return fetch(`${API}/category/all`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
        },
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log('err:', err);
    });
}

export const listOrders = () => {
    return fetch(`${API}/order/list/${userId}`, {
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

export const getStatusValues = () => {
    return fetch(`${API}/order/status-values/${userId}`, {
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

export const updateOrderStatus = (orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status, orderId })
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log('err:', err);
    });
}