import axios from 'axios';

const API_URL = 'http://192.168.1.192:8686/cuentas';

export const getItems = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const addItems = async (item) => {
    try {
        const response = await axios.post(API_URL, item);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteItem = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};


