import { API } from '../utils/config';

export const getProducts = (sortBy) => {
    // return fetch(`${API}/products?sortBy=${sortBy}&order=desc`, {
    return fetch(`${API}/products`, {
        method: 'GET',
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log('err:', err);
    });
}