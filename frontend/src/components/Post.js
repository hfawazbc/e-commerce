import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Loading from './Loading';

export default function Post() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('other');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    const { user, findingUser } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('title', title);
        formData.append('category', category);
        formData.append('description', description);
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

    let page;
    
    if (findingUser === false && user === true) {
        page = (
            <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" value={title} required onChange={(e) => setTitle(e.target.value)}/>

                    <label htmlFor="categories">Category</label>
                    <select name="categories" id="categories" value={category} required onChange={(e) => setCategory(e.target.value)}>
                        <option value="accessories">Accessories</option>
                        <option value="appliances">Appliances</option>
                        <option value="books">Books</option>
                        <option value="clothing">Clothing</option>
                        <option value="electronics">Electronics</option>
                        <option value="games">Games</option>
                        <option value="sports">Sports</option>
                        <option value="toys">Toys</option>
                        <option value="other">Other</option>
                    </select>
                    
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" cols="30" rows="10" value={description} required onChange={(e) => setDescription(e.target.value)}></textarea>

                    <label htmlFor="price">Price</label>
                    <input id="price" type="number" value={price} required onChange={(e) => setPrice(e.target.value)}/>

                    <label htmlFor="files">Images</label>
                    <input id="files" type="file" accept="image/png, image/jpeg" multiple required/>

                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    } 
    
    if (findingUser === false && user === false) {
        page = (
            <Redirect to="/"/>
        )
    }

    if (findingUser === true && user === false) {
        page = (
            <Loading/>
        )
    }

    return (
        <div>
            { page }
        </div>
    )
}