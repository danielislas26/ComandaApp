import React, { useState,useEffect } from 'react';
import { View } from 'react-native';
import Input from './Input/InputField';
import { Notas } from './Notes/Container';
import { getItems } from '../api';


const ParentComponent = () => {
    const [sharedData, setSharedData] = useState('');
    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState([]);

    const handleInputChange = (newData) => {
        setSharedData(newData);
    };

    const handleIdSelect = (id) => {
        setSelectedId(id);
    };

    const fetchItems = async () => {
        const items = await getItems();
        setData(items);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <View>
            <Input onInputChange={handleInputChange} selectedId={selectedId} fetchItems={fetchItems}/>
            <Notas onIdSelect={handleIdSelect} datos={sharedData} datatofetch={data} fetchItems={fetchItems}/>
        
        </View>
    );
};

export {ParentComponent};