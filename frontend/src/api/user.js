import { API } from '../utils/config';
import { isAuthenticated } from "../auth";

const authData = isAuthenticated();
const userId = authData?.user?._id;
const token = authData?.token;

const headers = {
    Accept: 'application/json',
    "Content-Type": 'application/json',
    Authorization: `Bearer ${token}`
};

export const getUser = () => {
    return fetch(`${API}/user/${userId}`, {
        method: 'GET',
        headers
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log('err:', err);
    });
}

export const update = (user) => {
    return fetch(`${API}/user/${userId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateUser = (user, next) => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("jwt")) {
            let auth = JSON.parse(localStorage.getItem("jwt"));
            auth.user = user;
            localStorage.setItem("jwt", JSON.stringify(auth));
            next();
        }
    }
};

export const getPurchaseHistory = () => {
    return fetch(`${API}/orders/by/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
