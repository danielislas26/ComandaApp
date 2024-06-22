import axios from 'axios';

const API_URL = 'http://192.168.1.192:8686/cuentas';

export const getItems = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error(`Error fetching items:`, error);
        throw error;
    }
};

export const addItems = async (item) => {
    try {
        const response = await axios.post(API_URL, item);
        return response.data;
    } catch (error) {
        console.error(`Error adding item:`, error);
        throw error;
    } 
};

export const updateItem = async (id, newCuenta) => {
    try {
        const url = `${API_URL}/${id}`;
        console.log('URL:', url);
        console.log('Update Data:', newCuenta);

        const response = await axios.patch(url,{ newCuenta });
        return response.data;
    } catch (error) {
        console.error(`Error updating item:`, error );
        throw error;
    }
};

export const deleteItem = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting item`, error);
        throw error;
    }
};


export const updateCuenta = async (id, newCuenta, fetchItems) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`,{ cuentas: newCuenta });
        await fetchItems();
        return response.data;
    } catch (error) {
        console.error('Error updating cuenta:',error);
        throw error;
    }
};

