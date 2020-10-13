import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AdminContext } from '../contexts/AdminContext';
import Loading from './Loading';

export default function Post() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const { isAdmin, loading } = useContext(AdminContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('price', price);

        const files = document.querySelector('#files').files;

        let i = 0;
        while(i < files.length) {
            formData.append('files', files[i]);
            i++;
        }

        const fetchProduct = async () => {
            try {
                const response = await fetch('http://localhost:5000/products', {
                    method: 'POST',
                    body: formData
                })

                const data = await response.json();

                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchProduct();
    }

    if (loading) {
        return (
            <Loading/>
        )
    }

    if (!loading && !isAdmin) {
        return (
            <Redirect to="/"/>
        )
    } else if (!loading && isAdmin) {
        return (
            <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" value={name} required onChange={(e) => setName(e.target.value)}/>
    
                    <label htmlFor="price">Price</label>
                    <input id="price" type="number" value={price} required onChange={(e) => setPrice(e.target.value)}/>
    
                    <label htmlFor="files">Images</label>
                    <input id="files" type="file" accept="image/png, image/jpeg" multiple required/>
    
                    <button type="submit">Submit</button>
                </form>
            </div>
        )   
    }
}