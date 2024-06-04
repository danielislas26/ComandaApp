import React, { useState,useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Input from './Input/InputField';
import { Notas } from './Notes/Container';
import { getItems, addItems } from '../api';


const ParentComponent = () => {
    const [sharedData, setSharedData] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    const handleInputChange = (newData) => {
        
        setSharedData(newData);
    };

    const handleIdSelect = (id) => {
        console.log('Selected ID:',id)
        setSelectedId(id);
    };

    return (
        <View>
            <Input onInputChange={handleInputChange} selectedId={selectedId} />
            <Notas onIdSelect={handleIdSelect} datos={sharedData}  />
        </View>
    );
};

export {ParentComponent};